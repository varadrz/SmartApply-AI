import os
from datetime import datetime, timedelta
from app.models.tracker import Opportunity, Priority
from app.core.config import get_settings

settings = get_settings()

def _get_service():
    try:
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
    except ImportError:
        raise RuntimeError("Google API libraries not installed. Run: pip install google-api-python-client google-auth-oauthlib")

    SCOPES = ["https://www.googleapis.com/auth/calendar"]
    creds = None
    token_path = settings.google_token_file
    creds_path = settings.google_credentials_file

    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(creds_path):
                raise FileNotFoundError(f"Google credentials not found at {creds_path}.")
            flow = InstalledAppFlow.from_client_secrets_file(creds_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    return build("calendar", "v3", credentials=creds)

def _priority_emoji(priority: Priority) -> str:
    return {"High": "🔴", "Medium": "🟡", "Low": "⚪"}.get(priority.value, "")

def _make_deadline_event(opp: Opportunity) -> dict:
    deadline = opp.deadline
    emoji = _priority_emoji(opp.priority)

    return {
        "summary": f"{emoji} DEADLINE: {opp.title}",
        "description": (
            f"Type: {opp.type.value.replace('_', ' ').title()}\n"
            f"Priority: {opp.priority.value} ({opp.priority_score}/100)\n"
            f"Selection value: {opp.selection_value}\n"
            f"Company: {opp.company or 'N/A'}\n"
            f"Prize/Reward: {opp.prize or 'N/A'}\n\n"
            f"Link: {opp.url}\n\n"
            f"{opp.description}"
        ),
        "start": {"date": deadline.strftime("%Y-%m-%d")},
        "end":   {"date": deadline.strftime("%Y-%m-%d")},
        "colorId": "11" if opp.priority == Priority.high else "5",
        "reminders": {
            "useDefault": False,
            "overrides": [
                {"method": "popup",  "minutes": 60},
                {"method": "email",  "minutes": 24 * 60},
            ],
        },
    }

def _make_prep_event(opp: Opportunity, prep_days: int = 5) -> dict:
    prep_date = opp.deadline - timedelta(days=prep_days)
    if prep_date <= datetime.utcnow():
        prep_date = datetime.utcnow() + timedelta(days=1)

    return {
        "summary": f"📋 Prep: {opp.title}",
        "description": (
            f"Preparation reminder — deadline in {prep_days} days.\n\n"
            f"Link: {opp.url}"
        ),
        "start": {"date": prep_date.strftime("%Y-%m-%d")},
        "end":   {"date": prep_date.strftime("%Y-%m-%d")},
        "colorId": "2",
        "reminders": {
            "useDefault": False,
            "overrides": [{"method": "popup", "minutes": 9 * 60}],
        },
    }

def sync_to_calendar(opp: Opportunity) -> str | None:
    if not settings.google_calendar_enabled:
        return None
    if not opp.deadline:
        return None
    if opp.deadline <= datetime.utcnow():
        return None

    try:
        service = _get_service()
        cal_id = settings.calendar_id

        deadline_event = service.events().insert(
            calendarId=cal_id,
            body=_make_deadline_event(opp),
        ).execute()
        event_id = deadline_event["id"]

        prep_days = 2 if (opp.days_until_deadline or 99) <= 5 else 5
        if (opp.days_until_deadline or 0) > 2:
            service.events().insert(
                calendarId=cal_id,
                body=_make_prep_event(opp, prep_days),
            ).execute()

        return event_id

    except Exception as e:
        print(f"[calendar] error for '{opp.title}': {e}")
        return None

def check_calendar_available() -> bool:
    try:
        _get_service()
        return True
    except Exception:
        return False
