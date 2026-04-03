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
from app.core.config import get_settings

# Import ALL ORM Models here to ensure Base.metadata is fully populated for init_db()
from app.models.orm.outreach import OutreachModel
from app.models.orm.opportunity import OpportunityModel
from app.models.orm.calendar import CalendarEventModel
from app.models.orm.interview import InterviewModel
from app.models.orm.portfolio import PortfolioItemModel
from app.models.orm.user import UserModel
from app.services.database import SessionLocal

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
    
    # Seed default user
    db = SessionLocal()
    try:
        default_user = db.query(UserModel).filter(UserModel.id == "default_user_001").first()
        if not default_user:
            new_user = UserModel(
                id="default_user_001",
                email="you@local.dev",
                full_name="Local Developer"
            )
            db.add(new_user)
            db.commit()
            print("[lifespan] Created default_user_001")
    finally:
        db.close()

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
    title="SmartApply AI",
    description="Unified suite for automated opportunity tracking and cold outreach.",
    version="1.0.0",
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
from app.api.routers.company import router as company_router
from app.api.routers.opportunities import router as opportunities_router
from app.api.routers.email import router as email_router
from app.api.routers.analytics import router as analytics_router
from app.api.routers.calendar import router as calendar_router
from app.api.routers.interviews import router as interviews_router
from app.api.routers.portfolio import router as portfolio_router
from app.api.routers.resume import router as resume_router
from app.api.routers.market import router as market_router

app.include_router(company_router, prefix="/api/v1")
app.include_router(opportunities_router, prefix="/api/v1")
app.include_router(email_router, prefix="/api/v1")
app.include_router(analytics_router, prefix="/api/v1")
app.include_router(calendar_router, prefix="/api/v1")
app.include_router(interviews_router, prefix="/api/v1")
app.include_router(portfolio_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")
app.include_router(market_router, prefix="/api/v1")

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
