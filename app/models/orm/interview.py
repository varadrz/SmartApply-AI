from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from datetime import datetime
from app.models.base import Base

class InterviewModel(Base):
    __tablename__ = "interviews"

    id = Column(String, primary_key=True, index=True) # UUID
    user_id = Column(String, ForeignKey("users.id"), default="default_user_001", index=True)
    company_name = Column(String, nullable=False)
    role_title = Column(String, nullable=False)
    target_compensation = Column(String, nullable=True)
    stage = Column(String) # screening, technical, onsite, offer, rejected
    win_probability = Column(Integer, default=0)
    next_event_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Optional FK to outreach if it started there
    outreach_id = Column(Integer, ForeignKey("outreach.id"), nullable=True)
