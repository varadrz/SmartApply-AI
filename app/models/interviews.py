from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class InterviewStage(str, Enum):
    SCREENING = "screening"
    TECHNICAL = "technical"
    ONSITE = "onsite"
    OFFER = "offer"
    REJECTED = "rejected"

class PipelineEntityBase(BaseModel):
    company_name: str
    role_title: str
    target_compensation: Optional[str] = None
    stage: InterviewStage
    win_probability: int = 0
    next_event_date: Optional[datetime] = None

class PipelineEntityCreate(PipelineEntityBase):
    outreach_id: Optional[str] = None

class PipelineEntityResponse(PipelineEntityBase):
    id: str
    created_at: datetime
