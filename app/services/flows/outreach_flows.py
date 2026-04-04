from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
from app.services.generator import generate_email
from app.models.outreach import CompanyIntel, UserProfile, MatchResult
from app.models.orm.outreach import OutreachModel
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
        db.commit()
        db.refresh(new_analysis)
        
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
        
        # 1. Re-instantiate Pydantic models for the generator
        intel = CompanyIntel(**analysis.full_result)
        
        # 2. Re-instantiate UserProfile
        profile_obj = UserProfile(
            name=user_profile.get("name", "John Doe"),
            role=user_profile.get("role", "Software Engineer"),
            skills=user_profile.get("skills", []),
            projects=user_profile.get("projects", []),
            experience_years=user_profile.get("experience_years", 2)
        )
        
        # 3. Create a MatchResult for the logic context
        # full_result usually contains the detailed matching info from the scanner
        match_obj = MatchResult(
            match_score=analysis.match_score,
            selection_probability=analysis.selection_probability or "Good",
            matched_skills=analysis.full_result.get("matched_skills", []),
            matched_projects=analysis.full_result.get("matched_projects", []),
            unmatched_requirements=analysis.full_result.get("unmatched_requirements", []),
            reasoning=analysis.full_result.get("reasoning", "Strong overall match.")
        )
        
        # Generate email
        email_content = await generate_email(intel, profile_obj, match_obj)
        
        analysis.email_subject = email_content.subject
        analysis.email_body = email_content.body
        
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
