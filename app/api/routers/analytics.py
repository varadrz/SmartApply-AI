from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.models.orm.outreach import OutreachModel
from sqlalchemy import func

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/overview")
def get_analytics_overview(db: Session = Depends(get_db)):
    """
    Returns high-level metrics for the dashboard and analytics page.
    """
    total_companies = db.query(OutreachModel).count()
    sent_emails = db.query(OutreachModel).filter(OutreachModel.status == 'sent').count()
    replies = db.query(OutreachModel).filter(OutreachModel.status == 'replied').count()
    
    # Calculate average match score
    avg_match = db.query(func.avg(OutreachModel.match_score)).scalar() or 0
    
    return {
        "total_tracked": total_companies,
        "total_sent": sent_emails,
        "replied": replies,
        "match_rate": round(float(avg_match), 1) if avg_match else 0,
        "trend": [
            {"date": "2023-10-01", "value": 55},
            {"date": "2023-10-07", "value": 58},
            {"date": "2023-10-14", "value": 62},
            {"date": "2023-10-21", "value": 68},
            {"date": "Today", "value": 78}
        ]
    }
