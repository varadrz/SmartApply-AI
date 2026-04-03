import aiosqlite
import json
import hashlib
from datetime import datetime
from app.core.config import get_settings
from app.models.outreach import PipelineResult
from app.models.tracker import Opportunity, Status

settings = get_settings()
DB_URL = settings.database_url.replace("sqlite+aiosqlite:///", "")

async def init_db():
    """Create all tables on startup."""
    async with aiosqlite.connect(DB_URL) as db:
        # 1. Outreach Tables
        await db.execute("""
            CREATE TABLE IF NOT EXISTS outreach (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                company_url TEXT NOT NULL,
                company_name TEXT,
                match_score INTEGER,
                selection_probability TEXT,
                email_subject TEXT,
                email_body  TEXT,
                status      TEXT DEFAULT 'draft',
                full_result TEXT,
                created_at  TEXT
            )
        """)
        
        # 2. Opportunities Tables
        await db.execute("""
            CREATE TABLE IF NOT EXISTS opportunities (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                fingerprint         TEXT UNIQUE,
                title               TEXT,
                source              TEXT,
                url                 TEXT,
                type                TEXT,
                company             TEXT,
                deadline            TEXT,
                days_until_deadline INTEGER,
                priority_score      INTEGER,
                priority            TEXT,
                skill_match_score   INTEGER,
                selection_value     TEXT,
                hiring_potential    INTEGER,
                status              TEXT DEFAULT 'new',
                calendar_event_id   TEXT,
                full_json           TEXT,
                first_seen          TEXT
            )
        """)
        await db.execute(
            "CREATE INDEX IF NOT EXISTS idx_priority ON opportunities(priority_score DESC)"
        )
        await db.execute(
            "CREATE INDEX IF NOT EXISTS idx_deadline ON opportunities(deadline)"
        )
        await db.commit()
    print(f"Database initialized at {DB_URL}")

def make_fingerprint(title: str, source: str, url: str) -> str:
    raw = f"{title.lower().strip()}|{source}|{url}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]

# --- Outreach Persistence ---
async def save_outreach(result: PipelineResult) -> int:
    async with aiosqlite.connect(DB_URL) as db:
        cursor = await db.execute(
            """INSERT INTO outreach (company_url, company_name, match_score, selection_probability, email_subject, email_body, status, full_result, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (result.company_url, result.company_intel.company_name, result.match.match_score, result.match.selection_probability, result.email.subject, result.email.body, result.status, result.model_dump_json(), result.created_at.isoformat())
        )
        await db.commit()
        return cursor.lastrowid

async def list_outreach(limit: int = 50) -> list[dict]:
    async with aiosqlite.connect(DB_URL) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM outreach ORDER BY created_at DESC LIMIT ?", (limit,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

async def get_outreach(id: int) -> dict:
    async with aiosqlite.connect(DB_URL) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM outreach WHERE id = ?", (id,)) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None

async def update_outreach(id: int, updates: dict) -> bool:
    if not updates:
        return False
    async with aiosqlite.connect(DB_URL) as db:
        set_clause = ", ".join([f"{k} = ?" for k in updates.keys()])
        values = list(updates.values()) + [id]
        await db.execute(f"UPDATE outreach SET {set_clause} WHERE id = ?", values)
        await db.commit()
        return True

# --- Tracker Persistence ---
async def upsert_opportunity(opp: Opportunity) -> tuple[Opportunity, bool]:
    async with aiosqlite.connect(DB_URL) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT id, status, calendar_event_id FROM opportunities WHERE fingerprint = ?", (opp.fingerprint,)) as cursor:
            existing = await cursor.fetchone()
        
        if existing:
            opp.id = existing["id"]
            opp.status = Status(existing["status"])
            opp.calendar_event_id = existing["calendar_event_id"]
            return opp, False

        cursor = await db.execute(
            """INSERT INTO opportunities (fingerprint, title, source, url, type, company, deadline, days_until_deadline, priority_score, priority, skill_match_score, selection_value, hiring_potential, status, full_json, first_seen) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (opp.fingerprint, opp.title, opp.source, opp.url, opp.type.value, opp.company, opp.deadline.isoformat() if opp.deadline else None, opp.days_until_deadline, opp.priority_score, opp.priority.value, opp.skill_match_score, opp.selection_value, int(opp.hiring_potential), opp.status.value, opp.model_dump_json(), opp.first_seen.isoformat())
        )
        await db.commit()
        opp.id = cursor.lastrowid
        return opp, True
