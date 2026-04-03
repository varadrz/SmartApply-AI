import asyncio
from datetime import datetime
from app.models.tracker import (
    Opportunity, ScanRequest, ScanSummary, TrackerUserProfile, Priority
)
from app.services.scrapers.devfolio import scrape_devfolio
from app.services.scrapers.unstop import scrape_unstop
from app.services.scrapers.mlh import scrape_mlh
from app.services.scrapers.startups import scrape_yc_startups, scrape_community_hiring
from app.services.classifier import classify_and_score
from app.services.database import upsert_opportunity
import aiosqlite
from app.services.database import DB_URL
from app.services.calendar import sync_to_calendar
from app.services.alerts import generate_scan_alerts
from app.core.config import get_settings

settings = get_settings()

def _default_profile() -> TrackerUserProfile:
    return TrackerUserProfile(
        skills=settings.tracker_default_skills,
        roles=settings.tracker_default_roles,
        experience_years=0,
    )

SCRAPER_MAP = {
    "devfolio":  lambda profile: scrape_devfolio(),
    "unstop":    lambda profile: scrape_unstop(),
    "mlh":       lambda profile: scrape_mlh(),
    "yc":        lambda profile: scrape_yc_startups(profile.roles),
    "community": lambda profile: scrape_community_hiring(),
}

async def update_calendar_event_id(opp_id: int, event_id: str):
    import aiosqlite
    async with aiosqlite.connect(DB_URL) as db:
        await db.execute(
            "UPDATE opportunities SET calendar_event_id=?, status='calendar' WHERE id=?",
            (event_id, opp_id)
        )
        await db.commit()

async def run_scan(request: ScanRequest) -> ScanSummary:
    profile = request.profile or _default_profile()
    sources = request.sources or list(SCRAPER_MAP.keys())

    print(f"\n[scan] Starting scan — sources: {sources}")
    loop = asyncio.get_event_loop()
    
    # Run scrapers in executor if they are synchronous
    raw_batches = await asyncio.gather(*[
        loop.run_in_executor(None, SCRAPER_MAP[s], profile)
        for s in sources if s in SCRAPER_MAP
    ])
    
    raw: list[Opportunity] = [opp for batch in raw_batches for opp in batch]
    print(f"[scan] Raw total: {len(raw)}")

    scored = [classify_and_score(opp, profile) for opp in raw]

    new_opps: list[Opportunity] = []
    for opp in scored:
        saved_opp, is_new = await upsert_opportunity(opp)
        if is_new:
            new_opps.append(saved_opp)

    print(f"[scan] New this scan: {len(new_opps)}")

    cal_synced = 0
    if not request.dry_run and settings.google_calendar_enabled:
        for opp in new_opps:
            if (
                opp.priority_score >= settings.min_priority_for_calendar
                and opp.deadline
                and opp.id
            ):
                event_id = sync_to_calendar(opp)
                if event_id:
                    await update_calendar_event_id(opp.id, event_id)
                    opp.calendar_event_id = event_id
                    cal_synced += 1

    alerts = generate_scan_alerts(new_opps, min_priority=Priority.medium)
    high_priority = sum(1 for o in new_opps if o.priority == Priority.high)

    print(f"[scan] Done — {len(new_opps)} new, {cal_synced} synced to calendar, {len(alerts)} alerts")

    return ScanSummary(
        total_found=len(scored),
        new_this_scan=len(new_opps),
        high_priority=high_priority,
        calendar_synced=cal_synced,
        alerts=alerts,
        opportunities=sorted(new_opps, key=lambda o: o.priority_score, reverse=True),
    )
