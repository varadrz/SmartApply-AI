from sqlalchemy import Column, Integer, String, Text, JSON, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.models.base import Base

class PortfolioItemModel(Base):
    __tablename__ = "portfolio_items"

    id = Column(String, primary_key=True, index=True) # UUID
    user_id = Column(String, ForeignKey("users.id"), default="default_user_001", index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(JSON) # List[str]
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    is_flagship = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
