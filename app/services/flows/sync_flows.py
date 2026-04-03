from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
from app.models.orm.opportunity import OpportunityModel
from app.models.orm.calendar import CalendarEventModel
from datetime import datetime
import logging
import uuid

logger = logging.getLogger(__name__)

class SyncFlows:

    @staticmethod
    @retry_on_db_fail()
    def opportunity_sync_flow(db: Session, scraped_opportunities: list) -> int:
        """
        Robust Flow:
        1. Deduplicate & Upsert opportunities
        2. Score based on internal metrics
        """
        logger.info(f"Executing opportunity_sync_flow for {len(scraped_opportunities)} items")
        
        new_count = 0
        for item in scraped_opportunities:
            # Check for existing fingerprint
            existing = db.query(OpportunityModel).filter(OpportunityModel.fingerprint == item['fingerprint']).first()
            if not existing:
                new_opp = OpportunityModel(
                    **item,
                    created_at=datetime.utcnow()
                )
                db.add(new_opp)
                new_count += 1
        
        db.flush()
        return new_count

    @staticmethod
    @retry_on_db_fail()
    def calendar_sync_flow(db: Session, event_data: dict) -> CalendarEventModel:
        """
        Performs local storage of calendar events and prep sessions.
        """
        logger.info(f"Executing calendar_sync_flow for {event_data.get('title')}")
        
        new_event = CalendarEventModel(
            id=str(uuid.uuid4()),
            title=event_data['title'],
            description=event_data.get('description'),
            start_time=event_data['start_time'],
            end_time=event_data['end_time'],
            event_type=event_data.get('event_type', 'interview'),
            created_at=datetime.utcnow()
        )
        db.add(new_event)
        db.flush()
        
        return new_event
