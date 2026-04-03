from sqlalchemy import Column, String, DateTime, Integer, Text, JSON
from datetime import datetime
from app.models.base import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # default_user_001
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    
    # Advanced Profile Fields
    linkedin_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    leetcode_url = Column(String, nullable=True)
    resume_path = Column(String, nullable=True)
    short_bio = Column(Text, nullable=True)
    current_year = Column(Integer, nullable=True)
    expected_graduation_year = Column(Integer, nullable=True)
    parsed_skills = Column(JSON, nullable=True) # Derived from intelligence services
    
    created_at = Column(DateTime, default=datetime.utcnow)
