from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
from app.models.orm.outreach import OutreachModel
from app.services.scraper import scrape
from app.services.extractor import extract_intel
from app.services.matcher import match
from app.services.generator import generate_email
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class OutreachFlows:
    
    @staticmethod
    @retry_on_db_fail()
    async def company_analysis_flow(db: Session, url: str, user_profile: dict, user_id: str = "default_user_001") -> OutreachModel:
        """
        Robust Flow:
        1. Scrape Company
        2. Extract Data (tech stack + hiring signals)
        3. Match Skills against User Profile
        4. Store Initial Analysis
        """
        logger.info(f"Starting robust analysis flow for {url}")
        
        # 1. Scrape
        scraped_data = await scrape(url)
        
        # 2. Extract
        intel = extract_intel(scraped_data)
        
        # 3. Match
        match_result = match(intel, user_profile)
        
        # 4. Store
        new_analysis = OutreachModel(
            company_url=url,
            user_id=user_id,
            company_name=intel.company_name or "Unknown",
            match_score=match_result.match_score,
            selection_probability=match_result.selection_probability,
            full_result=intel.model_dump(),
            status="draft",
            created_at=datetime.utcnow()
        )
        
        db.add(new_analysis)
        db.flush() # Ensure ID is populated
        
        return new_analysis

    @staticmethod
    @retry_on_db_fail()
    async def email_generation_flow(db: Session, analysis_id: int, user_profile: dict, user_id: str = "default_user_001") -> OutreachModel:
        """
        Generates personalized email using LLM for an existing analysis.
        """
        analysis = db.query(OutreachModel).filter(OutreachModel.id == analysis_id, OutreachModel.user_id == user_id).first()
        if not analysis:
            raise ValueError("Analysis record not found")
        
        # Generate email
        email_content = await generate_email(analysis.full_result, user_profile, {"match_score": analysis.match_score})
        
        analysis.email_subject = email_content.get("subject")
        analysis.email_body = email_content.get("body")
        
        return analysis

    @staticmethod
    @retry_on_db_fail(max_retries=3)
    def email_send_flow(db: Session, email_id: int, user_id: str = "default_user_001") -> bool:
        """
        Finalizes an analysis and marks as 'sent'.
        (In a real app, this would trigger actual SMTP sending)
        """
        analysis = db.query(OutreachModel).filter(OutreachModel.id == email_id, OutreachModel.user_id == user_id).first()
        if not analysis:
            return False
            
        analysis.status = "sent"
        analysis.sent_at = datetime.utcnow()
        return True
