from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.models.orm.portfolio import PortfolioItemModel
from app.core.auth import get_current_user
from typing import List
import uuid
from datetime import datetime

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])

@router.get("/projects", response_model=List[dict])
async def get_projects(db: Session = Depends(get_db)):
    """Fetches all flagship and secondary projects from Postgres."""
    user_id = get_current_user()
    results = db.query(PortfolioItemModel).filter(PortfolioItemModel.user_id == user_id).all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "tech_stack": r.tech_stack,
            "github_url": r.github_url,
            "live_url": r.live_url,
            "is_flagship": r.is_flagship,
            "created_at": r.created_at.isoformat() if r.created_at else None
        } for r in results
    ]

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
            user_id=get_current_user(),
            created_at=datetime.utcnow()
        )
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        return new_project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
