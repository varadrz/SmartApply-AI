from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.models.base import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # default_user_001
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
