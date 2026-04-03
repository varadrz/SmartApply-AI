from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class OpportunityType(str, Enum):
    hackathon   = "hackathon"
    competition = "competition"
    hiring_drive = "hiring_drive"
    internship  = "internship"
    ppo         = "ppo"
    startup_role = "startup_role"
    unknown     = "unknown"

class Priority(str, Enum):
    high   = "High"
    medium = "Medium"
    low    = "Low"

class Status(str, Enum):
    new      = "new"
    saved    = "saved"
    applied  = "applied"
    ignored  = "ignored"
    calendar = "calendar"

# ── User Profile for Tracker ──────────────────────────────────────────────────

class TrackerUserProfile(BaseModel):
    skills: List[str]
    roles: List[str]
    experience_years: int = 0

# ── Core Opportunity Model ────────────────────────────────────────────────────

class Opportunity(BaseModel):
    id: Optional[int] = None
    title: str
    source: str
    url: str
    description: str = ""
    type: OpportunityType = OpportunityType.unknown
    company: str = ""
    company_type: str = ""
    domain: str = ""
    deadline: Optional[datetime] = None
    event_start: Optional[datetime] = None
    days_until_deadline: Optional[int] = None
    priority_score: int = 0
    priority: Priority = Priority.low
    skill_match_score: int = 0
    matched_skills: List[str] = []
    selection_value: str = ""
    prize: str = ""
    eligibility: str = ""
    hiring_potential: bool = False
    tags: List[str] = []
    status: Status = Status.new
    calendar_event_id: Optional[str] = None
    first_seen: datetime = datetime.utcnow()
    fingerprint: str = ""

class ScanRequest(BaseModel):
    profile: Optional[TrackerUserProfile] = None
    sources: List[str] = []
    dry_run: bool = False

class ScanSummary(BaseModel):
    total_found: int
    new_this_scan: int
    high_priority: int
    calendar_synced: int
    alerts: List[str]
    opportunities: List[Opportunity]
