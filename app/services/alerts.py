from datetime import datetime
from app.models.tracker import Opportunity, Priority
from app.services.database import DB_URL
import aiosqlite
from app.core.config import get_settings

settings = get_settings()

def format_alert(opp: Opportunity, reason: str = "new") -> str:
    emoji = {"High": "🔴", "Medium": "🟡", "Low": "⚪"}.get(opp.priority.value, "")
    days  = f"{opp.days_until_deadline}d left" if opp.days_until_deadline is not None else "no deadline"
    company = f" @ {opp.company}" if opp.company else ""

    if reason == "deadline":
        return (
            f"⏰ Deadline approaching: {opp.title}{company}\n"
            f"   {emoji} {opp.priority.value} priority · {days} · {opp.url}"
        )
    if reason == "hiring":
        return (
            f"💼 Hiring opportunity: {opp.title}{company}\n"
            f"   {emoji} Match: {opp.selection_value} · {days} · {opp.url}"
        )
    return (
        f"✨ New opportunity: {opp.title}{company}\n"
        f"   Type: {opp.type.value.replace('_', ' ')} · {emoji} {opp.priority.value} · {days}\n"
        f"   {opp.url}"
    )

def generate_scan_alerts(
    new_opps: list[Opportunity],
    min_priority: Priority = Priority.medium,
) -> list[str]:
    alerts = []
    priority_order = {Priority.high: 0, Priority.medium: 1, Priority.low: 2}
    min_level = priority_order[min_priority]

    for opp in sorted(new_opps, key=lambda o: o.priority_score, reverse=True):
        if priority_order.get(opp.priority, 2) > min_level:
            continue

        reason = "new"
        if opp.hiring_potential:
            reason = "hiring"
        # Using a default or settings for deadline_alert_days if available
        deadline_days = getattr(settings, "deadline_alert_days", 3)
        if opp.days_until_deadline is not None and opp.days_until_deadline <= deadline_days:
            reason = "deadline"

        alerts.append(format_alert(opp, reason))

    return alerts

async def get_deadline_alerts_from_db(within_days: int = 3) -> list[dict]:
    """Re-implemented from tracker's database.py logic."""
    async with aiosqlite.connect(DB_URL) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT title, url, deadline, days_until_deadline, priority, type, company
               FROM opportunities
               WHERE days_until_deadline <= ? AND days_until_deadline >= 0
                 AND status NOT IN ('ignored', 'applied')
                 AND priority IN ('High', 'Medium')
               ORDER BY days_until_deadline ASC""",
            (within_days,)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]

async def get_deadline_alert_messages() -> list[str]:
    deadline_days = getattr(settings, "deadline_alert_days", 3)
    rows = await get_deadline_alerts_from_db(deadline_days)
    messages = []
    for r in rows:
        days = r.get("days_until_deadline", "?")
        prio = r.get("priority", "")
        emoji = {"High": "🔴", "Medium": "🟡"}.get(prio, "🟡")
        messages.append(
            f"⏰ {emoji} Deadline in {days}d: {r['title']}\n"
            f"   {r.get('type', '')} · {r.get('url', '')}"
        )
    return messages
