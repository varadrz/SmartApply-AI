import sys
import os
import uuid
from datetime import datetime, timedelta

# Add current directory to path
sys.path.append(os.getcwd())

from app.services.database import engine, Base, SessionLocal
from app.models.orm.user import UserModel
from app.models.orm.opportunity import OpportunityModel
from app.models.orm.interview import InterviewModel
from app.models.orm.outreach import OutreachModel
from app.models.orm.portfolio import PortfolioItemModel
from app.models.orm.calendar import CalendarEventModel

def seed_data():
    db = SessionLocal()
    user_id = "default_user_001"
    
    try:
        # 1. Clean existing data (except the user)
        db.query(OpportunityModel).delete()
        db.query(InterviewModel).delete()
        db.query(OutreachModel).delete()
        db.query(PortfolioItemModel).delete()
        db.query(CalendarEventModel).delete()
        db.commit()
        
        print("Existing data cleared.")

        # 2. Seed Opportunities
        opps = [
            OpportunityModel(
                user_id=user_id,
                title="Staff Software Engineer, AI Platform",
                company="OpenAI",
                source="Direct",
                url="https://openai.com/careers",
                type="Full-time",
                priority="High",
                skill_match_score=98,
                status="new",
                deadline=datetime.utcnow() + timedelta(days=14)
            ),
            OpportunityModel(
                user_id=user_id,
                title="Lead Machine Learning Engineer",
                company="Anthropic",
                source="LinkedIn",
                url="https://anthropic.com/careers",
                type="Full-time",
                priority="High",
                skill_match_score=95,
                status="applied",
                deadline=datetime.utcnow() + timedelta(days=7)
            ),
            OpportunityModel(
                user_id=user_id,
                title="Senior Backend Engineer (Go/Distributed Systems)",
                company="HashiCorp",
                source="Lever",
                url="https://hashicorp.com/jobs",
                type="Full-time",
                priority="Medium",
                skill_match_score=88,
                status="new",
                deadline=datetime.utcnow() + timedelta(days=21)
            ),
            OpportunityModel(
                user_id=user_id,
                title="Founding Engineer, Generative UI",
                company="Vercel",
                source="X (Twitter)",
                url="https://vercel.com/careers",
                type="Full-time",
                priority="High",
                skill_match_score=92,
                status="applied",
                deadline=datetime.utcnow() + timedelta(days=10)
            )
        ]
        db.add_all(opps)
        
        # 3. Seed Interviews
        interviews = [
            InterviewModel(
                id="int_001",
                user_id=user_id,
                company_name="Google",
                role_title="Senior AI Researcher",
                stage="Technical Rounds",
                win_probability=65,
                next_event_date=datetime.utcnow() + timedelta(days=2),
                target_compensation="450k TC"
            ),
            InterviewModel(
                id="int_002",
                user_id=user_id,
                company_name="Meta",
                role_title="L6 Machine Learning Engineer",
                stage="Screening",
                win_probability=80,
                next_event_date=datetime.utcnow() + timedelta(days=1),
                target_compensation="500k TC"
            ),
            InterviewModel(
                id="int_003",
                user_id=user_id,
                company_name="NVIDIA",
                role_title="CUDA Systems Architect",
                stage="Offer Negotiation",
                win_probability=95,
                next_event_date=datetime.utcnow() + timedelta(days=5),
                target_compensation="600k TC"
            )
        ]
        db.add_all(interviews)
        
        # 4. Seed Outreach (Analyzed Companies)
        outreaches = [
            OutreachModel(
                user_id=user_id,
                company_name="Mistral AI",
                company_url="https://mistral.ai",
                match_score=91,
                selection_probability="High",
                status="sent",
                created_at=datetime.utcnow() - timedelta(days=2),
                email_subject="Leveraging Distributed Systems expertise for Mistral LLM inference",
                email_body="Hi Mistral team, I've been following your work on MoE architectures..."
            ),
            OutreachModel(
                user_id=user_id,
                company_name="Databricks",
                company_url="https://databricks.com",
                match_score=87,
                selection_probability="Medium",
                status="draft",
                created_at=datetime.utcnow() - timedelta(hours=5)
            ),
            OutreachModel(
                user_id=user_id,
                company_name="Snowflake",
                company_url="https://snowflake.com",
                match_score=82,
                selection_probability="Medium",
                status="sent",
                created_at=datetime.utcnow() - timedelta(days=4)
            )
        ]
        db.add_all(outreaches)
        
        # 5. Seed Portfolio
        portfolio = [
            PortfolioItemModel(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title="Distributed Vector Store Engine",
                description="Built a high-performance vector DB from scratch using Go and Raft consensus.",
                tech_stack=["Go", "gRPC", "Protobuf", "Raft"],
                github_url="https://github.com/example/vector-engine",
                is_flagship=True
            ),
            PortfolioItemModel(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title="Auto-Regressive Agentic Framework",
                description="Autonomous agents that can browse the web and execute local CLI commands.",
                tech_stack=["Python", "LangChain", "Playwright"],
                github_url="https://github.com/example/agent-framework",
                is_flagship=True
            )
        ]
        db.add_all(portfolio)
        
        db.commit()
        print("Mock data seeded successfully.")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
