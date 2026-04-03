from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Float
from datetime import datetime
from app.models.base import Base

class OpportunityModel(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    fingerprint = Column(String, unique=True, index=True)
    title = Column(String, nullable=False)
    source = Column(String) # devfolio, unstop, etc
    url = Column(String)
    type = Column(String) # scholarship, hackathon, etc
    company = Column(String)
    deadline = Column(DateTime)
    days_until_deadline = Column(Integer)
    priority_score = Column(Integer, index=True)
    priority = Column(String) # High, Medium, Low
    skill_match_score = Column(Integer)
    selection_value = Column(String)
    hiring_potential = Column(Integer)
    status = Column(String, default="new") # new, applied, hidden
    calendar_event_id = Column(String, nullable=True)
    full_json = Column(JSON)
    first_seen = Column(DateTime, default=datetime.utcnow)
