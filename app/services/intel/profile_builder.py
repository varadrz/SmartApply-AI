from typing import List, Dict
from app.services.intel.resume_parser import extract_text_from_pdf, parse_resume_intel
from app.services.intel.github_extractor import extract_github_intel
from app.services.intel.leetcode_scraper import extract_leetcode_intel
from sqlalchemy.orm import Session
from app.models.orm.user import UserModel
from app.models.orm.portfolio import PortfolioItemModel
import uuid

async def build_user_profile(db: Session, user_id: str):
    """
    Phase 9 Refinement: Prioritized Profile Builder
    1. Orchestrate all extractors
    2. Merge into ONE user profile with Source Priority:
       Manual Input > Resume > GitHub
    3. Update ProfileScore & Strength
    """
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        return None
    
    # --- 1. Orchestrate Extraction ---
    manual_skills = set(user.manual_skills or [])
    
    resume_intel = {"skills": [], "experience": [], "projects": [], "education": []}
    if user.resume_path:
        resume_text = extract_text_from_pdf(user.resume_path)
        resume_intel = parse_resume_intel(resume_text)
        
    github_intel = {"repos": [], "languages": [], "stars": 0}
    if user.github_url:
        github_intel = await extract_github_intel(user.github_url)
        
    leetcode_intel = {"problems_solved": 0, "topics": [], "difficulty_breakdown": {}}
    if user.leetcode_url:
        leetcode_intel = await extract_leetcode_intel(user.leetcode_url)
        
    # --- 2. Prioritized Merging (Manual > Resume > GitHub) ---
    # Skills
    final_skills = list(manual_skills)
    resume_skills = [s for s in resume_intel.get("skills", []) if s not in final_skills]
    final_skills.extend(resume_skills)
    
    github_skills = [s for s in github_intel.get("languages", []) if s not in final_skills]
    final_skills.extend(github_skills)
    
    # Education: Manual first, then Resume
    final_edu = user.education_history or []
    if not final_edu and resume_intel.get("education"):
        final_edu = resume_intel.get("education")

    # --- 3. Calculation & Updates ---
    repo_count = len(github_intel.get("repos", []))
    leetcode_count = leetcode_intel.get("problems_solved", 0)
    
    # Profile Strength (0-100)
    strength = 0
    if final_skills: strength += 30
    if repo_count > 0: strength += 20
    if leetcode_count > 0: strength += 20
    if user.resume_path: strength += 20
    if final_edu: strength += 10
    
    # Update UserModel
    user.parsed_skills = final_skills
    user.profile_strength = strength
    
    # 4. Auto-populate Portfolio from GitHub (Phase 3 carryover)
    for repo in github_intel.get("repos", []):
        existing = db.query(PortfolioItemModel).filter(
            PortfolioItemModel.user_id == user_id,
            PortfolioItemModel.title == repo['name']
        ).first()
        
        if not existing:
            new_item = PortfolioItemModel(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title=repo['name'],
                description=repo['description'] or "Imported from GitHub.",
                tech_stack=[repo['language']] if repo['language'] else [],
                github_url=repo['url'],
                is_flagship=repo['stars'] > 5
            )
            db.add(new_item)
            
    db.commit()
    
    return {
        "user_id": user_id,
        "profile_strength": strength,
        "skills_count": len(final_skills),
        "repos_added": repo_count
    }
