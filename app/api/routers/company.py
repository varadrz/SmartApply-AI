from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.outreach_flows import OutreachFlows
from app.models.orm.outreach import OutreachModel
from app.models.outreach import UserProfile
from app.core.config import get_settings
from app.core.auth import get_current_user
from typing import List

router = APIRouter(prefix="/companies", tags=["companies"])
settings = get_settings()

@router.post("/analyze")
async def run_analysis(url: str, db: Session = Depends(get_db)):
    """
    Triggers the robust analysis flow:
    Scrape -> Extract -> Match -> Store in Postgres
    """
    try:
        user_id = get_current_user()
        # Using default profile from settings for now
        user_profile = UserProfile(
            name=settings.outreach_user_name,
            role=settings.outreach_user_role,
            skills=settings.outreach_user_skills,
            projects=[]
        )
        analysis = await OutreachFlows.company_analysis_flow(db, url, user_profile, user_id=user_id)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/{id}")
async def get_outreach_detail(id: int, db: Session = Depends(get_db)):
    """Get full details of a specific analysis."""
    user_id = get_current_user()
    result = db.query(OutreachModel).filter(OutreachModel.id == id, OutreachModel.user_id == user_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return result

# We will handle /companies (plural) as the root of this router
@router.get("", response_model=List[dict])
async def get_outreach_list(limit: int = Query(50, ge=1), db: Session = Depends(get_db)):
    """List all previously analyzed companies from Postgres."""
    user_id = get_current_user()
    results = db.query(OutreachModel).filter(OutreachModel.user_id == user_id).order_by(OutreachModel.created_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id, 
            "company_name": r.company_name, 
            "match_score": r.match_score, 
            "status": r.status,
            "created_at": r.created_at
        } for r in results
    ]

@router.get("/health")
async def health():
    return {"status": "ok", "service": "outreach"}
