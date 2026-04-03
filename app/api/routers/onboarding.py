from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
import json
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.models.orm.user import UserModel
from app.models.onboarding import OnboardingRequest
from app.core.auth import get_current_user
from app.services.intel.profile_builder import build_user_profile
import os
import shutil

router = APIRouter(prefix="/user", tags=["user"])

@router.post("/intake")
async def user_intake(
    full_name: str = Form(...),
    email: str = Form(...),
    linkedin_url: str = Form(None),
    github_url: str = Form(None),
    leetcode_url: str = Form(None),
    short_bio: str = Form(None),
    current_year: int = Form(None),
    graduation_year: int = Form(None),
    manual_skills: str = Form(None), # JSON string of list
    education_history: str = Form(None), # JSON string of list
    resume: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """
    Phase 1: User Intake
    Collects all user data once, stores raw inputs, and sets foundation for background analysis.
    """
    user_id = get_current_user()
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 1. Store Raw Inputs
    user.full_name = full_name
    user.email = email
    user.linkedin_url = linkedin_url
    user.github_url = github_url
    user.leetcode_url = leetcode_url
    user.short_bio = short_bio
    user.current_year = current_year
    user.expected_graduation_year = graduation_year
    
    if manual_skills:
        try:
            user.manual_skills = json.loads(manual_skills)
        except:
            user.manual_skills = [s.strip() for s in manual_skills.split(",")]
            
    if education_history:
        try:
            user.education_history = json.loads(education_history)
        except:
            user.education_history = []
    
    # 2. Handle Resume Upload
    if resume:
        upload_dir = "data/resumes"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, f"{user_id}_resume.pdf")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        
        user.resume_path = file_path
    
    db.commit()
    
    # 3. Trigger Background Analysis (Phase 2-3 integration)
    try:
        await build_user_profile(db, user_id)
    except Exception as e:
        print(f"Intelligence build failed: {e}")
    
    return {
        "status": "success",
        "message": "Intake completed. Profile intelligence analysis triggered.",
        "user_id": user_id
    }

@router.get("/profile")
async def get_user_profile(
    db: Session = Depends(get_db)
):
    """Retrieves the current user's profile for state persistence and onboarding checks."""
    user_id = get_current_user()
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "linkedin_url": user.linkedin_url,
        "github_url": user.github_url,
        "leetcode_url": user.leetcode_url,
        "resume_path": user.resume_path,
        "current_year": user.current_year,
        "graduation_year": user.expected_graduation_year,
        "manual_skills": user.manual_skills,
        "education_history": user.education_history,
        "onboarding_complete": all([user.linkedin_url, user.github_url, user.expected_graduation_year])
    }
