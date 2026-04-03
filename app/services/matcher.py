from app.models.outreach import CompanyIntel, UserProfile, MatchResult

def _normalize(items: list[str]) -> set[str]:
    return {i.lower().strip() for i in items}

def _project_tech(projects: list[dict]) -> set[str]:
    tech = set()
    for p in projects:
        for t in p.get("tech_stack", []):
            tech.add(t.lower().strip())
    return tech

def _score_company_type(company_type: str) -> int:
    return {"startup": 5, "MNC": 0, "unknown": 2}.get(company_type, 0)

def match(intel: CompanyIntel, profile: UserProfile) -> MatchResult:
    required = _normalize(intel.tech_stack)
    user_skills = _normalize(profile.skills)
    project_tech = _project_tech(profile.projects)
    all_user_tech = user_skills | project_tech
    matched_skills = sorted(required & user_skills)
    unmatched = sorted(required - all_user_tech)
    matched_projects = [
        p for p in profile.projects
        if _normalize(p.get("tech_stack", [])) & required
    ]
    if required:
        skill_ratio = len(matched_skills) / len(required)
        project_bonus = min(len(matched_projects) * 5, 20)
        type_bonus = _score_company_type(intel.company_type)
        raw_score = int(skill_ratio * 70) + project_bonus + type_bonus
    else:
        raw_score = 40
    match_score = min(raw_score, 100)
    if match_score >= 65:
        probability = "High"
    elif match_score >= 40:
        probability = "Medium"
    else:
        probability = "Low"
    reasoning_parts = []
    if matched_skills:
        reasoning_parts.append(f"Your skills ({', '.join(matched_skills[:4])}) directly match their stack.")
    if matched_projects:
        names = [p.get("name", "a project") for p in matched_projects[:2]]
        reasoning_parts.append(f"Your project(s) {', '.join(names)} show relevant experience.")
    if unmatched:
        reasoning_parts.append(f"Gaps to acknowledge: {', '.join(unmatched[:3])}.")
    if not reasoning_parts:
        reasoning_parts.append("Limited tech signals found; outreach still possible.")
    return MatchResult(
        match_score=match_score,
        matched_skills=matched_skills,
        matched_projects=matched_projects,
        unmatched_requirements=unmatched,
        selection_probability=probability,
        reasoning=" ".join(reasoning_parts),
    )
