from pydantic import BaseModel, HttpUrl
from typing import Optional, List

class OnboardingRequest(BaseModel):
    full_name: str
    email: str
    linkedin_url: Optional[HttpUrl] = None
    github_url: Optional[HttpUrl] = None
    leetcode_url: Optional[HttpUrl] = None
    short_bio: Optional[str] = None
    current_year: Optional[int] = None
    expected_graduation_year: Optional[int] = None
    manual_skills: Optional[List[str]] = []
    education_history: Optional[List[dict]] = []
