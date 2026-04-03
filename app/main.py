from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.database import init_db, get_db
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi import Depends, HTTPException
import time
from app.services.scanner import run_scan
from app.models.tracker import ScanRequest
from app.api.routers.outreach import router as outreach_router
from app.api.routers.tracker import router as tracker_router
from app.api.routers.calendar import router as calendar_router
from app.api.routers.interviews import router as interviews_router
from app.api.routers.portfolio import router as portfolio_router
from app.api.routers.resume import router as resume_router
from app.api.routers.market import router as market_router
from app.core.config import get_settings

settings = get_settings()
scheduler = AsyncIOScheduler()

async def _scheduled_scan():
    print("[scheduler] Running periodic opportunity scan...")
    try:
        summary = await run_scan(ScanRequest())
        print(f"[scheduler] Scan complete — {summary.new_this_scan} new, {summary.high_priority} high priority")
    except Exception as e:
        print(f"[scheduler] Scan failed: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Init DB (Sync via SQLAlchemy/Alembic prep)
    init_db()

    # 2. Setup Scheduler for Opportunity Tracker
    scheduler.add_job(
        _scheduled_scan,
        trigger="interval",
        hours=settings.scan_interval_hours,
        id="opportunity_scan",
        replace_existing=True,
    )
    scheduler.start()
    print(f"APScheduler started: scanning every {settings.scan_interval_hours}h")

    yield

    # 3. Shutdown
    scheduler.shutdown()

app = FastAPI(
    title=settings.app_name,
    description="Unified suite for automated opportunity tracking and cold outreach.",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000", 
        "http://localhost:3000",
        "http://127.0.0.1:3001",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(outreach_router)
app.include_router(tracker_router)
app.include_router(calendar_router)
app.include_router(interviews_router)
app.include_router(portfolio_router)
app.include_router(resume_router)
app.include_router(market_router)

@app.get("/health/db", tags=["health"])
def health_check_db(db: Session = Depends(get_db)):
    try:
        start_time = time.time()
        result = db.execute(text("SELECT 1")).scalar()
        latency_ms = (time.time() - start_time) * 1000
        
        if latency_ms < 200:
            status = "healthy"
        else:
            status = "degraded"
            
        return {"status": status, "query_success": True, "latency_ms": round(latency_ms, 2)}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database unhealthy: {str(e)}")

@app.get("/", tags=["root"])
async def root():
    return {
        "message": "Welcome to the Obsidian AI Core API",
        "docs": "/docs",
        "features": ["/outreach", "/tracker", "/calendar", "/interviews", "/portfolio", "/resume", "/market"],
    }
