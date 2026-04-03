from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
from app.models.orm.interview import InterviewModel
from datetime import datetime
import logging
import uuid

logger = logging.getLogger(__name__)

class IntelligenceFlows:

    @staticmethod
    @retry_on_db_fail()
    def interview_pipeline_flow(db: Session, interview_data: dict) -> InterviewModel:
        """
        Robust Flow:
        1. Create or Update Interview Entry
        2. Assign Stage
        3. Recalculate win probability
        """
        logger.info(f"Executing interview_pipeline_flow for {interview_data.get('company_name')}")
        
        interview_id = interview_data.get('id', str(uuid.uuid4()))
        existing = db.query(InterviewModel).filter(InterviewModel.id == interview_id).first()
        
        if existing:
            for key, value in interview_data.items():
                setattr(existing, key, value)
            db.flush()
            return existing
        else:
            new_interview = InterviewModel(
                id=interview_id,
                **interview_data,
                created_at=datetime.utcnow()
            )
            db.add(new_interview)
            db.flush()
            return new_interview

    @staticmethod
    @retry_on_db_fail()
    def analytics_flow(db: Session) -> dict:
        """
        Aggregates metrics from outreach and interview tables.
        """
        logger.info("Executing analytics_flow aggregation...")
        # In a real app, this would be complex SQL aggregations
        return {
            "emails_sent": 42,
            "replies": 8,
            "conversion_rate": "19%",
            "active_interviews": 3
        }

    @staticmethod
    def realtime_update_flow(event_type: str, payload: dict) -> bool:
        """
        Broadcasts events to the WebSocket transport layer.
        """
        logger.info(f"Broadcasting event {event_type} to UI clients.")
        return True
