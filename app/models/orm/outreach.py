from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base

class OutreachModel(Base):
    __tablename__ = "outreach"

    id = Column(Integer, primary_key=True, index=True)
    company_url = Column(String, nullable=False)
    company_name = Column(String)
    match_score = Column(Integer)
    selection_probability = Column(String)
    email_subject = Column(String)
    email_body = Column(Text)
    status = Column(String, default="draft") # draft, sent, replied
    full_result = Column(JSON) # Store full metadata if needed
    created_at = Column(DateTime, default=datetime.utcnow)
    sent_at = Column(DateTime, nullable=True)

    # Relationships (if any)
    # interviews = relationship("InterviewModel", back_populates="outreach")
