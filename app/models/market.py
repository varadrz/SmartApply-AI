from pydantic import BaseModel
from typing import List

class TrendData(BaseModel):
    month: str
    average_salary: int

class TechVelocity(BaseModel):
    keyword: str
    growth_percentage: float
    volume: int

class MarketIntelResponse(BaseModel):
    compensation_trends: List[TrendData]
    tech_velocity: List[TechVelocity]
    startup_time_to_hire: int
    enterprise_time_to_hire: int
