from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.resume_flows import ResumeFlows
from app.core.config import get_settings

router = APIRouter(prefix="/resume", tags=["Resume Optimizer"])
settings = get_settings()

@router.post("/optimize")
async def optimize_resume(job_description: str, resume_id: str, db: Session = Depends(get_db)):
    """
    Triggers the robust resume analysis flow:
    JD Keyword Extraction -> Match Score -> AI Suggestions
    """
    try:
        return await ResumeFlows.resume_analysis_flow(db, job_description, resume_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
def upload_resume(title: str, description: str, tech_stack: list, db: Session = Depends(get_db)):
    """Persists a resume artifact into the portfolio/asset vault."""
    return ResumeFlows.resume_upload_flow(db, title, description, tech_stack)
