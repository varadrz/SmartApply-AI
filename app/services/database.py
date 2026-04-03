import time
import logging
from functools import wraps
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.exc import SQLAlchemyError, OperationalError, IntegrityError, TimeoutError
from app.core.config import get_settings
from app.models.base import Base

settings = get_settings()

DATABASE_URL = settings.database_url

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# --- 1. Engine Configuration (Strict Connection Limits & Pre-ping) ---
engine = create_engine(
    DATABASE_URL,
    pool_size=5,             # keep pool size small initially
    max_overflow=10,         # app limit: never exceed db max connections (100)
    pool_timeout=30,         # wait 30s before throwing connection timeout
    pool_recycle=1800,       # avoids long-idle connection drops (recycle every 30m)
    pool_pre_ping=True,      # prevents stale connections
    echo=False               # echo should be false in production
)

# --- 2. Session Management (Scoped Session Per Request) ---
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,       # disable autocommit
    autoflush=False         # disable autoflush
)

def init_db():
    """Init alembic/tables (fallback wrapper, though Alembic will dominate migrations)"""
    logger.info("db_connection_open: Creating all tables")
    Base.metadata.create_all(bind=engine)

# --- 3. Dependency Injection Pipeline ---
def get_db():
    """FastAPI Dependency: Scoped session per request with commit/rollback logic"""
    db = SessionLocal()
    try:
        yield db
        db.commit()          # on_success -> commit
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
