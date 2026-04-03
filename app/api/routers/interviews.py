from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.intelligence_flows import IntelligenceFlows
from app.models.orm.interview import InterviewModel
from typing import List

router = APIRouter(prefix="/interviews", tags=["Interviews"])

@router.get("/pipeline", response_model=List[dict])
async def get_pipeline(db: Session = Depends(get_db)):
    """Fetches full interview pipeline from Postgres."""
    results = db.query(InterviewModel).order_by(InterviewModel.created_at.desc()).all()
    return results

@router.post("/pipeline")
async def create_pipeline_entity(data: dict, db: Session = Depends(get_db)):
    """Creates or updates an interview entity in the pipeline."""
    try:
        return IntelligenceFlows.interview_pipeline_flow(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{id}/stage")
async def update_pipeline_stage(id: str, stage: str, db: Session = Depends(get_db)):
    """Specialized endpoint for Kanban stage drag-and-drop updates."""
    interview = db.query(InterviewModel).filter(InterviewModel.id == id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    interview.stage = stage
    db.flush()
    return interview
