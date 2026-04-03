from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
from app.models.orm.portfolio import PortfolioItemModel # Using portfolio item as a placeholder for resume assets
import logging
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)

class ResumeFlows:

    @staticmethod
    @retry_on_db_fail()
    def resume_upload_flow(db: Session, title: str, description: str, tech_stack: list) -> PortfolioItemModel:
        """
        Robust Flow:
        1. Store resume metadata/artifact in portfolio vault
        """
        logger.info(f"Executing resume_upload_flow for {title}")
        
        new_resume = PortfolioItemModel(
            id=str(uuid.uuid4()),
            title=title,
            description=description,
            tech_stack=tech_stack,
            created_at=datetime.utcnow()
        )
        db.add(new_resume)
        db.flush()
        
        return new_resume

    @staticmethod
    @retry_on_db_fail()
    async def resume_analysis_flow(db: Session, job_description: str, resume_id: str) -> dict:
        """
        Compares JD against a stored resume and generates suggestions.
        """
        logger.info(f"Executing resume_analysis_flow for resume {resume_id}")
        
        # Mocking LLM keyword extraction for JD
        suggestions = [
            {"original": "Managed servers", "suggested": "Architected distributed K8s clusters", "impact": "High"}
        ]
        
        return {
            "status": "complete", 
            "match_score": 75,
            "suggestions": suggestions
        }
