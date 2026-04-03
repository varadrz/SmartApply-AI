from datetime import datetime
import re
from app.models.tracker import Opportunity, OpportunityType, Priority, TrackerUserProfile

MNC_KEYWORDS = [
    "google", "microsoft", "amazon", "meta", "apple", "netflix", "uber",
    "stripe", "airbnb", "twitter", "salesforce", "oracle", "ibm", "intel",
    "qualcomm", "goldman sachs", "morgan stanley", "jpmorgan", "mckinsey",
    "deloitte", "infosys", "tcs", "wipro", "accenture",
]
FUNDED_SIGNALS = ["series a", "series b", "series c", "yc", "y combinator",
                  "techstars", "sequoia", "a16z", "tiger global", "$", "mn", "funded"]

TYPE_BONUS = {
    OpportunityType.hackathon:    8,
    OpportunityType.competition:  5,
    OpportunityType.hiring_drive: 10,
    OpportunityType.internship:   10,
    OpportunityType.ppo:          10,
    OpportunityType.startup_role: 8,
    OpportunityType.unknown:      0,
}

SELECTION_VALUE_LABELS = {
    range(75, 101): "Strong",
    range(50, 75):  "Good",
    range(30, 50):  "Moderate",
    range(0, 30):   "Low",
}

def _normalize(s: str) -> str:
    return s.lower().strip()

def _skill_match(opp: Opportunity, profile: TrackerUserProfile) -> tuple[int, list[str]]:
    text = _normalize(f"{opp.title} {opp.description} {opp.company}")
    matched = [s for s in profile.skills if _normalize(s) in text]
    if not profile.skills:
        return 15, []
    ratio = len(matched) / len(profile.skills)
    return int(ratio * 35), matched

def _brand_score(opp: Opportunity) -> tuple[int, str]:
    text = _normalize(f"{opp.title} {opp.description} {opp.company}")
    if any(m in text for m in MNC_KEYWORDS):
        return 20, "MNC"
    if any(f in text for f in FUNDED_SIGNALS):
        return 14, "funded_startup"
    if opp.source in ("yc_startups",):
        return 10, "startup"
    return 5, "startup"

def _urgency_score(days_left: int | None) -> int:
    if days_left is None:
        return 5
    if days_left < 0:
        return 0
    if days_left <= 2:
        return 20
    if days_left <= 5:
        return 16
    if days_left <= 10:
        return 12
    if days_left <= 21:
        return 8
    return 4

def _hiring_bonus(opp: Opportunity) -> int:
    return 15 if opp.hiring_potential else 0

def _selection_value_label(score: int) -> str:
    for r, label in SELECTION_VALUE_LABELS.items():
        if score in r:
            return label
    return "Low"

def _infer_type(opp: Opportunity) -> OpportunityType:
    text = _normalize(f"{opp.title} {opp.description}")
    if any(k in text for k in ["hackathon", "hack", "buildathon"]):
        return OpportunityType.hackathon
    if any(k in text for k in ["competition", "contest", "challenge", "olympiad"]):
        return OpportunityType.competition
    if any(k in text for k in ["hiring drive", "recruitment drive", "campus drive"]):
        return OpportunityType.hiring_drive
    if any(k in text for k in ["internship", "intern ", "ppo", "stipend"]):
        return OpportunityType.internship
    if any(k in text for k in ["job", "role", "engineer", "developer", "analyst"]):
        return OpportunityType.startup_role
    return opp.type

def _check_eligibility(opp: Opportunity, profile: TrackerUserProfile) -> bool:
    """Phase 6: Eligibility Filter Logic."""
    if not profile.graduation_year:
        return True
    
    # Simple regex to find years in descriptions (e.g. 2025, 2026)
    text = f"{opp.title} {opp.description}".lower()
    years_found = re.findall(r"202\d", text)
    
    if years_found:
        # If the job explicitly mentions a year, the user must match it
        target_years = [int(y) for y in years_found]
        if profile.graduation_year not in target_years:
            # Check for range logic like "2025 or 2026 grads"
            return False
            
    # Check for "final year" keywords if user is not in final year
    if "final year" in text and profile.current_year and int(profile.current_year) < 4:
        return False
        
    return True

def classify_and_score(opp: Opportunity, profile: TrackerUserProfile) -> Opportunity:
    if opp.type == OpportunityType.unknown:
        opp.type = _infer_type(opp)

    # Phase 6: Eligibility check
    is_eligible = _check_eligibility(opp, profile)

    skill_pts, matched = _skill_match(opp, profile)
    brand_pts, company_type = _brand_score(opp)
    urgency_pts  = _urgency_score(opp.days_until_deadline)
    hiring_pts   = _hiring_bonus(opp)
    type_pts     = TYPE_BONUS.get(opp.type, 0)

    # Phase 7: Matching Engine (Weighted)
    # Readiness score from DSA Analysis if available (placeholder integration)
    dsa_pts = 0
    if hasattr(profile, 'dsa_readiness'):
        dsa_pts = int((profile.dsa_readiness / 100) * 15)

    base_score = skill_pts + brand_pts + urgency_pts + hiring_pts + type_pts + dsa_pts
    
    if not is_eligible:
        total = int(base_score * 0.3) # Heavy penalty for ineligibility
    else:
        total = min(base_score, 100)

    opp.skill_match_score = int((skill_pts / 35) * 100) if skill_pts else 0
    opp.matched_skills    = matched
    opp.company_type      = opp.company_type or company_type
    opp.priority_score    = total
    opp.selection_value   = _selection_value_label(total)

    if total >= 65:
        opp.priority = Priority.high
    elif total >= 40:
        opp.priority = Priority.medium
    else:
        opp.priority = Priority.low

    return opp
