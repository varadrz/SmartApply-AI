from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.sync_flows import SyncFlows
from app.models.orm.calendar import CalendarEventModel
from app.core.auth import get_current_user
from typing import List

router = APIRouter(prefix="/calendar", tags=["Calendar"])

@router.get("/events", response_model=List[dict])
async def get_events(db: Session = Depends(get_db)):
    """Fetches all events from Postgres."""
    user_id = get_current_user()
    results = db.query(CalendarEventModel).filter(CalendarEventModel.user_id == user_id).all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "start": r.start_time.isoformat() if r.start_time else None,
            "end": r.end_time.isoformat() if r.end_time else None,
            "type": r.event_type,
            "description": r.description,
            "external_link": r.external_link
        } for r in results
    ]

@router.post("/event")
async def create_event(data: dict, db: Session = Depends(get_db)):
    """Creates a persistent calendar event or prep session."""
    try:
        data['user_id'] = get_current_user()
        return SyncFlows.calendar_sync_flow(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
