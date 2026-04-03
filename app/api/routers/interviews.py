from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.intelligence_flows import IntelligenceFlows
from app.models.orm.interview import InterviewModel
from app.core.auth import get_current_user
from typing import List

router = APIRouter(prefix="/interviews", tags=["Interviews"])

@router.get("/pipeline", response_model=List[dict])
async def get_pipeline(db: Session = Depends(get_db)):
    """Fetches full interview pipeline from Postgres."""
    user_id = get_current_user()
    results = db.query(InterviewModel).filter(InterviewModel.user_id == user_id).order_by(InterviewModel.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "company_name": r.company_name,
            "role": r.role_title,
            "stage": r.stage,
            "win_probability": r.win_probability,
            "next_event_date": r.next_event_date.isoformat() if r.next_event_date else None,
            "compensation": r.target_compensation,
            "created_at": r.created_at.isoformat() if r.created_at else None
        } for r in results
    ]

@router.post("/pipeline")
async def create_pipeline_entity(data: dict, db: Session = Depends(get_db)):
    """Creates or updates an interview entity in the pipeline."""
    try:
        data['user_id'] = get_current_user()
        return IntelligenceFlows.interview_pipeline_flow(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{id}/stage")
async def update_pipeline_stage(id: str, stage: str, db: Session = Depends(get_db)):
    """Specialized endpoint for Kanban stage drag-and-drop updates."""
    user_id = get_current_user()
    interview = db.query(InterviewModel).filter(InterviewModel.id == id, InterviewModel.user_id == user_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    interview.stage = stage
    db.flush()
    return interview
