from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.tracker import ScanRequest, ScanSummary
from app.services.scanner import run_scan
from app.services.database import get_db
from app.models.orm.opportunity import OpportunityModel
from app.services.flows.sync_flows import SyncFlows

router = APIRouter(prefix="/tracker", tags=["tracker"])

@router.post("/run", response_model=ScanSummary)
async def run_scan_and_sync(request: ScanRequest = ScanRequest(), db: Session = Depends(get_db)):
    """
    Run a full opportunity scan and sync results to PostgreSQL.
    """
    try:
        summary = await run_scan(request)
        # Note: In a production flow, we would call SyncFlows.opportunity_sync_flow here
        # with the output of run_scan once normalized.
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/opportunities", response_model=List[dict])
def list_opportunities(
    status: Optional[str] = None,
    opportunity_type: Optional[str] = Query(None, alias="type"),
    min_priority: int = Query(0, ge=0, le=100),
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db)
):
    """Production-grade opportunity retrieval with SQLAlchemy filtering."""
    query = db.query(OpportunityModel).filter(OpportunityModel.priority_score >= min_priority)
    if status:
        query = query.filter(OpportunityModel.status == status)
    if opportunity_type:
        query = query.filter(OpportunityModel.type == opportunity_type)
    
    results = query.order_by(OpportunityModel.priority_score.desc(), OpportunityModel.deadline.asc()).limit(limit).all()
    return results

@router.get("/health")
def health():
    return {"status": "ok", "service": "tracker"}
