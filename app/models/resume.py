from pydantic import BaseModel
from typing import List

class OptimizeRequest(BaseModel):
    job_description: str
    base_resume_text: str

class AISuggestion(BaseModel):
    original_text: str
    suggested_text: str
    reasoning: str
    impact: str

class OptimizeResponse(BaseModel):
    match_score: int
    suggestions: List[AISuggestion]
    missing_keywords: List[str]
