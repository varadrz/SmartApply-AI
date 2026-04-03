import sys
import os
# Add current directory to path
sys.path.append(os.getcwd())

from app.services.database import engine, Base, SessionLocal
from app.models.orm.user import UserModel
from app.models.orm.opportunity import OpportunityModel
from app.models.orm.interview import InterviewModel
from app.models.orm.outreach import OutreachModel
from app.models.orm.portfolio import PortfolioItemModel
from app.models.orm.calendar import CalendarEventModel

print("Creating all tables...")
Base.metadata.create_all(bind=engine)

print("Seeding default user...")
db = SessionLocal()
try:
    user = db.query(UserModel).filter(UserModel.id == "default_user_001").first()
    if not user:
        user = UserModel(
            id="default_user_001",
            email="you@local.dev",
            full_name="Local Developer"
        )
        db.add(user)
        db.commit()
        print("Default user created.")
    else:
        print("Default user already exists.")
finally:
    db.close()

print("Database initialization complete.")
