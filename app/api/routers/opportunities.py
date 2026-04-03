from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.tracker import ScanRequest, ScanSummary
from app.services.scanner import run_scan
from app.services.database import get_db
from app.models.orm.opportunity import OpportunityModel
from app.services.flows.sync_flows import SyncFlows

from app.core.auth import get_current_user

router = APIRouter(prefix="/opportunities", tags=["opportunities"])

@router.get("", response_model=List[dict])
def list_opportunities(
    status: Optional[str] = None,
    opportunity_type: Optional[str] = Query(None, alias="type"),
    priority: Optional[str] = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db)
):
    """Production-grade opportunity retrieval with SQLAlchemy filtering."""
    user_id = get_current_user()
    query = db.query(OpportunityModel).filter(OpportunityModel.user_id == user_id)
    if status:
        query = query.filter(OpportunityModel.status == status)
    if opportunity_type:
        query = query.filter(OpportunityModel.type == opportunity_type)
    if priority:
        query = query.filter(OpportunityModel.priority == priority)
    
    results = query.order_by(OpportunityModel.deadline.asc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "company_name": r.company,
            "source": r.source,
            "url": r.url,
            "type": r.type,
            "priority": r.priority,
            "status": r.status,
            "deadline": r.deadline.isoformat() if r.deadline else None,
            "priority_score": r.skill_match_score,
            "description": r.full_json.get('description', '') if r.full_json else ''
        } for r in results
    ]

@router.post("/scan", response_model=ScanSummary)
async def run_scan_and_sync(request: ScanRequest = ScanRequest(), db: Session = Depends(get_db)):
    """
    Run a full opportunity scan and sync results to PostgreSQL.
    """
    try:
        summary = await run_scan(request)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
def health():
    return {"status": "ok", "service": "tracker"}
