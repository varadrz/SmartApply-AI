from pydantic import BaseModel
from typing import List, Optional

class CaseStudyBase(BaseModel):
    title: str
    description: str
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    is_flagship: bool = False

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyResponse(CaseStudyBase):
    id: str
