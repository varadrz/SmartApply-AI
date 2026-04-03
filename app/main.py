from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.database import init_db
from app.services.scanner import run_scan
from app.models.tracker import ScanRequest
from app.api.routers.outreach import router as outreach_router
from app.api.routers.tracker import router as tracker_router
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
    # 1. Init DB
    await init_db()

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

@app.get("/", tags=["root"])
async def root():
    return {
        "message": "Welcome to the Opportunity & Outreach API",
        "docs": "/docs",
        "features": ["/outreach", "/tracker"],
    }
