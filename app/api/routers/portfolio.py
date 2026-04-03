from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.models.orm.portfolio import PortfolioItemModel
from typing import List
import uuid
from datetime import datetime

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])

@router.get("/projects", response_model=List[dict])
async def get_projects(db: Session = Depends(get_db)):
    """Fetches all flagship and secondary projects from Postgres."""
    return db.query(PortfolioItemModel).all()

@router.post("/analyze-repo")
async def analyze_repo(github_url: str, db: Session = Depends(get_db)):
    """
    Triggers a repository analysis flow and persists the project metadata.
    """
    try:
        # In a production scenario, we'd trigger a PortfolioFlow here
        new_project = PortfolioItemModel(
            id=str(uuid.uuid4()),
            title="Analyzed Project",
            description=f"Automated intelligence for {github_url}",
            tech_stack=["Pending"],
            github_url=github_url,
            created_at=datetime.utcnow()
        )
        db.add(new_project)
        db.flush()
        return new_project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
