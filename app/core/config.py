from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional
import os

class Settings(BaseSettings):
    # API Settings
    app_name: str = "Opportunity Intelligence & Outreach Suite"
    debug: bool = False
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./data.db"
    
    # Opportunity Tracker Settings
    scan_interval_hours: int = 6
    tracker_sources: List[str] = ["devfolio", "unstop", "mlh", "startups"]
    google_calendar_enabled: bool = True
    google_token_file: str = "token.json"
    google_credentials_file: str = "credentials.json"
    calendar_id: str = "primary"
    deadline_alert_days: int = 3
    min_priority_for_calendar: int = 40
    
    # Cold Outreach Settings
    ollama_model: str = "llama3"
    ollama_base_url: str = "http://localhost:11434"
    
    # Default User Profile (for Tracker)
    tracker_default_skills: List[str] = ["Python", "FastAPI", "React", "SQL"]
    tracker_default_roles: List[str] = ["Software Engineer", "Backend Developer", "Intern"]
    
    # Default User Profile (for Outreach)
    outreach_user_name: str = "Varad"
    outreach_user_role: str = "Software Engineer"
    outreach_user_skills: List[str] = ["Python", "Machine Learning", "AI Architecture"]
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

_settings: Optional[Settings] = None

def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings
