from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.outreach_flows import OutreachFlows
from app.models.orm.outreach import OutreachModel
from app.core.config import get_settings
from typing import List

router = APIRouter(prefix="/outreach", tags=["outreach"])
settings = get_settings()

@router.post("/run")
async def run_analysis(url: str, db: Session = Depends(get_db)):
    """
    Triggers the robust analysis flow:
    Scrape -> Extract -> Match -> Store in Postgres
    """
    try:
        # Using default profile from settings for now
        user_profile = {
            "name": settings.outreach_user_name,
            "role": settings.outreach_user_role,
            "skills": settings.outreach_user_skills
        }
        analysis = await OutreachFlows.company_analysis_flow(db, url, user_profile)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/{id}/generate-email")
async def generate_email(id: int, db: Session = Depends(get_db)):
    """
    Generates an AI email body for an existing analysis.
    """
    try:
        user_profile = {
            "name": settings.outreach_user_name,
            "role": settings.outreach_user_role,
            "skills": settings.outreach_user_skills
        }
        return await OutreachFlows.email_generation_flow(db, id, user_profile)
    except ValueError as v:
        raise HTTPException(status_code=404, detail=str(v))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[dict])
async def get_outreach_list(limit: int = Query(50, ge=1), db: Session = Depends(get_db)):
    """List all previously analyzed companies from Postgres."""
    results = db.query(OutreachModel).order_by(OutreachModel.created_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id, 
            "company_name": r.company_name, 
            "match_score": r.match_score, 
            "status": r.status,
            "created_at": r.created_at
        } for r in results
    ]

@router.get("/{id}")
async def get_outreach_detail(id: int, db: Session = Depends(get_db)):
    """Get full details of a specific analysis."""
    result = db.query(OutreachModel).filter(OutreachModel.id == id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return result

@router.post("/{id}/send")
def send_outreach(id: int, db: Session = Depends(get_db)):
    """Mark an analysis as sent."""
    success = OutreachFlows.email_send_flow(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return {"status": "marked_as_sent"}

@router.get("/health")
async def health():
    return {"status": "ok", "service": "outreach"}
