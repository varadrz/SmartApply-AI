from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.models.tracker import ScanRequest, ScanSummary, Status
from app.services.scanner import run_scan
from app.services.database import DB_URL
import aiosqlite
from app.services.timeline import generate_timeline, render_timeline_text
from app.services.alerts import get_deadline_alert_messages
from app.services.calendar import check_calendar_available

router = APIRouter(prefix="/tracker", tags=["tracker"])

@router.post("/run", response_model=ScanSummary)
async def run(request: ScanRequest = ScanRequest()):
    """
    Run a full opportunity scan (Devfolio, Unstop, MLH, Startups).
    """
    try:
        return await run_scan(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/opportunities")
async def list_opps(
    status: Optional[str] = None,
    type: Optional[str] = None,
    min_priority: int = Query(0, ge=0, le=100),
    limit: int = Query(50, le=200),
):
    async with aiosqlite.connect(DB_URL.replace("sqlite+aiosqlite:///", "")) as db:
        db.row_factory = aiosqlite.Row
        clauses = ["priority_score >= ?"]
        params = [min_priority]
        if status:
            clauses.append("status = ?")
            params.append(status)
        if type:
            clauses.append("type = ?")
            params.append(type)
        where = " AND ".join(clauses)
        async with db.execute(f"SELECT * FROM opportunities WHERE {where} ORDER BY priority_score DESC, deadline ASC LIMIT ?", (*params, limit)) as cursor:
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]

@router.get("/timeline")
async def timeline(
    min_priority: int = Query(0, ge=0, le=100),
    format: str = Query("json", regex="^(json|text)$"),
):
    # This would need a helper to fetch and hydrate Opportunity models
    # Simplified here for brevity, assuming list_opps logic
    pass

@router.get("/alerts")
async def alerts():
    messages = await get_deadline_alert_messages()
    return {"count": len(messages), "alerts": messages}

@router.get("/health")
async def health():
    calendar_ok = check_calendar_available()
    return {
        "status": "ok",
        "calendar": "connected" if calendar_ok else "not configured",
    }


