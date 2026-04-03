from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# ── User Profile ────────────────────────────────────────────────────────────────

class UserProfile(BaseModel):
    """Your skills and projects — used for matching."""
    name: str
    role: str
    skills: List[str]           # e.g. ["Python", "FastAPI", "React", "PostgreSQL"]
    projects: List[dict]        # [{name, description, tech_stack: []}]
    experience_years: int = 0
    extra_context: str = ""     # anything extra to inject into the email prompt

# ── Outreach Models ─────────────────────────────────────────────────────────────

class PipelineRequest(BaseModel):
    company_url: str
    profile: UserProfile
    use_playwright: bool = False

class ScrapedCompany(BaseModel):
    url: str
    company_name: str
    raw_text: str
    page_title: str = ""
    careers_url: Optional[str] = None

class CompanyIntel(BaseModel):
    company_name: str
    tech_stack: List[str]
    hiring_signals: List[str]
    company_type: str
    domain: str
    summary: str

class MatchResult(BaseModel):
    match_score: int
    matched_skills: List[str]
    matched_projects: List[dict]
    unmatched_requirements: List[str]
    selection_probability: str
    reasoning: str

class GeneratedEmail(BaseModel):
    subject: str
    body: str
    word_count: int

class PipelineResult(BaseModel):
    id: Optional[int] = None
    company_url: str
    company_intel: CompanyIntel
    match: MatchResult
    email: GeneratedEmail
    status: str = "draft"
    created_at: datetime = datetime.utcnow()
