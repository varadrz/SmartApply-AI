from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.flows.sync_flows import SyncFlows
from app.models.orm.calendar import CalendarEventModel
from typing import List

router = APIRouter(prefix="/calendar", tags=["Calendar"])

@router.get("/events", response_model=List[dict])
async def get_events(db: Session = Depends(get_db)):
    """Fetches all events from Postgres."""
    return db.query(CalendarEventModel).all()

@router.post("/events")
async def create_event(data: dict, db: Session = Depends(get_db)):
    """Creates a persistent calendar event or prep session."""
    try:
        return SyncFlows.calendar_sync_flow(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
