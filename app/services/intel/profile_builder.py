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
    Phase 3: Profile Builder
    1. Orchestrate all extractors
    2. Merge into ONE user profile
    3. Calculate ProfileScore
    4. Auto-populate Portfolio & User skills
    """
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        return None
    
    # 1. Orchestrate Extraction
    resume_intel = {}
    if user.resume_path:
        resume_text = extract_text_from_pdf(user.resume_path)
        resume_intel = parse_resume_intel(resume_text)
        
    github_intel = {}
    if user.github_url:
        github_intel = await extract_github_intel(user.github_url)
        
    leetcode_intel = {}
    if user.leetcode_url:
        leetcode_intel = await extract_leetcode_intel(user.leetcode_url)
        
    # 2. Merge Sources & Deduplicate
    merged_skills = set(resume_intel.get("skills", []))
    merged_skills.update(github_intel.get("languages", []))
    
    # 3. Calculate ProfileScore (Phased Placeholder)
    # Simple logic: repo count + solved count + skills
    repo_score = min(len(github_intel.get("repos", [])) * 5, 25)
    leetcode_score = min(leetcode_intel.get("problems_solved", 0) / 10, 25)
    skills_score = min(len(merged_skills) * 2, 50)
    
    profile_score = repo_score + leetcode_score + skills_score
    
    # 4. Update UserModel
    user.parsed_skills = list(merged_skills)
    # We could also update bio or other fields here
    
    # 5. Auto-populate Portfolio from GitHub Repos
    for repo in github_intel.get("repos", []):
        # Check if already exists
        existing = db.query(PortfolioItemModel).filter(
            PortfolioItemModel.user_id == user_id,
            PortfolioItemModel.title == repo['name']
        ).first()
        
        if not existing:
            new_item = PortfolioItemModel(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title=repo['name'],
                description=repo['description'] or "No description provided.",
                tech_stack=[repo['language']] if repo['language'] else [],
                github_url=repo['url'],
                is_flagship=repo['stars'] > 5
            )
            db.add(new_item)
            
    db.commit()
    
    return {
        "user_id": user_id,
        "profile_score": profile_score,
        "skills_count": len(merged_skills),
        "repos_added": len(github_intel.get("repos", []))
    }
