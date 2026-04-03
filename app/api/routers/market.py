from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.models.orm.market import MarketTrendModel, TechVelocityModel
from typing import List

router = APIRouter(prefix="/market", tags=["Market Intel"])

@router.get("/trends", response_model=List[dict])
async def get_market_trends(db: Session = Depends(get_db)):
    """Fetches high-velocity market trends from Postgres."""
    return db.query(MarketTrendModel).order_by(MarketTrendModel.created_at.desc()).all()

@router.get("/velocity", response_model=List[dict])
async def get_tech_velocity(db: Session = Depends(get_db)):
    """Fetches skill velocity data for the market dashboard."""
    return db.query(TechVelocityModel).order_by(TechVelocityModel.growth_percentage.desc()).all()

@router.get("/health")
def health():
    return {"status": "ok", "service": "market"}
