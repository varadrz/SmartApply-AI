from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.models.base import Base

class MarketTrendModel(Base):
    __tablename__ = "market_trends"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, nullable=False) # e.g. "Oct 2023"
    average_salary = Column(Integer)
    role_category = Column(String) # e.g. "Senior Backend"
    created_at = Column(DateTime, default=datetime.utcnow)

class TechVelocityModel(Base):
    __tablename__ = "tech_velocity"

    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String, nullable=False) # e.g. "Golang"
    growth_percentage = Column(Float)
    volume = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
