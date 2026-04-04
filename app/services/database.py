import time
import logging
import hashlib
from functools import wraps
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.exc import SQLAlchemyError, OperationalError, IntegrityError, TimeoutError
from app.core.config import get_settings
from app.models.base import Base

settings = get_settings()

DATABASE_URL = settings.database_url
DB_URL = "data.db" # Default for aiosqlite-based scanner components

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

from sqlalchemy import event

# --- 1. Engine Configuration (Optimized for SQLite Concurrency) ---
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False, "timeout": 30}, # For multicore safety & lock waiting
)

# Enable WAL Mode for SQLite (Write-Ahead Logging)
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute("PRAGMA synchronous=NORMAL")
    cursor.close()

# --- 2. Session Management ---
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,       
    autoflush=False         
)

def make_fingerprint(title, source, url):
    """Create a unique hash for an opportunity to prevent duplicates."""
    data = f"{title}:{source}:{url or ''}".lower().strip()
    return hashlib.sha256(data.encode()).hexdigest()

async def upsert_opportunity(opp_data):
    """
    Async wrapper for upserting an opportunity record using SQLAlchemy.
    Matches fingerprint to prevent duplicates.
    """
    from app.models.orm.opportunity import OpportunityModel
    from app.core.auth import get_current_user
    db = SessionLocal()
    try:
        # Extract data from Pydantic if needed
        data = opp_data.model_dump() if hasattr(opp_data, 'model_dump') else opp_data
        
        # Attach hardcoded user_id
        data['user_id'] = get_current_user()
        
        # Check by fingerprint (scoped to user)
        existing = db.query(OpportunityModel).filter(
            OpportunityModel.fingerprint == data.get('fingerprint'),
            OpportunityModel.user_id == data['user_id']
        ).first()
        
        if existing:
            # Logic: If it exists, we just return it. Could optionally update status.
            return existing, False
            
        # Create new ORM object
        new_opp = OpportunityModel(**data)
        db.add(new_opp)
        db.commit()
        db.refresh(new_opp)
        return new_opp, True
    except Exception as e:
        db.rollback()
        logger.error(f"upsert_failed: {e}")
        raise
    finally:
        db.close()

def init_db():
    """Init alembic/tables (fallback wrapper, though Alembic will dominate migrations)"""
    logger.info("db_connection_open: Creating all tables")
    Base.metadata.create_all(bind=engine)

# --- 3. Dependency Injection Pipeline ---
def get_db():
    """FastAPI Dependency: Scoped session per request."""
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"query_failure: Rolled back transaction due to error: {e}")
        db.rollback()        # on_failure -> rollback
        raise
    finally:
        db.close()           # on_request_end -> close

# --- 4. Retry Logic & Error Handling Decorator ---
def retry_on_db_fail(max_retries=3, initial_delay_seconds=1):
    """
    Decorator for retry logic tailored to temporary_network_failures, deadlocks, 
    and db_connection_errors. Implements exponential backoff strategy.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            retries = 0
            delay = initial_delay_seconds
            while retries < max_retries:
                try:
                    start_time = time.time()
                    result = func(*args, **kwargs)
                    execution_time_ms = (time.time() - start_time) * 1000
                    
                    if execution_time_ms > 500:
                        logger.warning(f"log_slow_queries: {func.__name__} took {execution_time_ms:.2f}ms")
                    
                    return result
                    
                except OperationalError as e:  # Connection errors, deadlocks
                    logger.warning(f"retry_attempt: OperationalError in {func.__name__}. Retrying in {delay}s...")
                    retries += 1
                    if retries >= max_retries:
                        logger.error(f"log_and_fail: Final failure in {func.__name__} after {max_retries} retries.")
                        raise
                    time.sleep(delay)
                    delay *= 2 # exponential backoff
                    
                except TimeoutError as e:
                    logger.warning(f"retry_or_fail: TimeoutError in {func.__name__}")
                    raise e
                    
                except IntegrityError as e:
                    logger.error(f"return_validation_error: Integrity Error in {func.__name__} -> {e}")
                    raise ValueError(f"Database integrity violation: {str(e.orig)}")
                    
                except SQLAlchemyError as e: # unknown_error
                    logger.error(f"log_and_fail: Unknown SQLAlchemy Error in {func.__name__}: {e}")
                    raise
                    
        return wrapper
    return decorator
