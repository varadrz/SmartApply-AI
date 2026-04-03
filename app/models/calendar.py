from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CalendarEventBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    event_type: str  # "interview", "deep_work", "deadline"
    external_link: Optional[str] = None
    attendees: Optional[List[str]] = []

class CalendarEventCreate(CalendarEventBase):
    pass

class CalendarEventResponse(CalendarEventBase):
    id: str
    created_at: datetime
