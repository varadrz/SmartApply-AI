from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.outreach_flows import OutreachFlows
from app.models.orm.outreach import OutreachModel
from app.core.config import get_settings
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/email", tags=["email"])
settings = get_settings()

class GenerateEmailRequest(BaseModel):
    company_id: int

class SendEmailRequest(BaseModel):
    email_id: int

@router.post("/generate")
async def generate_email(req: GenerateEmailRequest, db: Session = Depends(get_db)):
    """
    Generates an AI email body for an existing analysis.
    """
    try:
        user_profile = {
            "name": settings.outreach_user_name,
            "role": settings.outreach_user_role,
            "skills": settings.outreach_user_skills
        }
        return await OutreachFlows.email_generation_flow(db, req.company_id, user_profile)
    except ValueError as v:
        raise HTTPException(status_code=404, detail=str(v))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/send")
def send_email(req: SendEmailRequest, db: Session = Depends(get_db)):
    """Mark an analysis as sent."""
    success = OutreachFlows.email_send_flow(db, req.email_id)
    if not success:
        raise HTTPException(status_code=404, detail="Email/Analysis not found")
    return {"status": "sent", "id": req.email_id}

@router.get("s", response_model=List[dict])
def get_email_history(limit: int = Query(50, ge=1), db: Session = Depends(get_db)):
    """List all sent emails."""
    results = db.query(OutreachModel).filter(OutreachModel.status == 'sent').order_by(OutreachModel.sent_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "company_name": r.company_name,
            "subject": r.email_subject,
            "body": r.email_body,
            "sent_at": r.sent_at,
            "status": r.status
        } for r in results
    ]

@router.post("/followup")
async def send_followup(req: SendEmailRequest, db: Session = Depends(get_db)):
    """
    Logic for sending a follow-up. 
    For now, we'll mark it as 'replied' or similar to simulate progress.
    """
    result = db.query(OutreachModel).filter(OutreachModel.id == req.email_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Original email not found")
    
    # In a real app, this would trigger a new LLM flow for follow-up
    result.status = "followed_up"
    db.commit()
    return {"status": "followed_up", "id": req.email_id}
