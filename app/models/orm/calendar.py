from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.models.base import Base

class CalendarEventModel(Base):
    __tablename__ = "calendar_events"

    id = Column(String, primary_key=True, index=True) # ID from external source or UUID
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    event_type = Column(String) # interview, deep_work, deadline
    created_at = Column(DateTime, default=datetime.utcnow)
    external_link = Column(String, nullable=True)
