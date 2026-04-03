import httpx
from app.models.outreach import CompanyIntel, UserProfile, MatchResult, GeneratedEmail
from app.core.config import get_settings

settings = get_settings()

def _build_prompt(
    intel: CompanyIntel,
    profile: UserProfile,
    match: MatchResult,
) -> str:
    matched_skills_str = ", ".join(match.matched_skills) if match.matched_skills else " several relevant skills"
    project_highlights = "\n".join(
        f'  - {p["name"]}: {p.get("description", "")} (stack: {", ".join(p.get("tech_stack", []))})'
        for p in match.matched_projects[:3]
    ) or "  - (no directly matched projects, but strong general background)"

    hiring_context = (
        f'They are currently hiring for: {", ".join(intel.hiring_signals[:4])}.'
        if intel.hiring_signals
        else "No specific open roles detected — write a general expression of interest."
    )

    extra = f"\nAdditional context from the sender: {profile.extra_context}" if profile.extra_context else ""

    return f"""You are a world-class career coach helping a developer write a cold outreach email.
Write a highly personalized, concise, and genuine cold email to a company based on the details below.

RULES:
- Keep the email under 200 words.
- DO NOT use generic phrases like "I hope this email finds you well" or "I am writing to express my interest".
- Open with a specific, genuine observation about the company (use the domain/summary below).
- Mention 1–2 matched skills or projects naturally — do not list them mechanically.
- End with a clear, low-friction call to action (e.g. a 15-minute call, or asking if there's an open role).
- Tone: confident, human, direct — not desperate or overly formal.
- Output ONLY the email. Start with Subject: on the first line, then a blank line, then the body.

COMPANY DETAILS:
- Name: {intel.company_name}
- Summary: {intel.summary}
- Domain: {intel.domain}
- Company type: {intel.company_type}
- Tech stack: {", ".join(intel.tech_stack[:10]) or "not detected"}
- {hiring_context}

SENDER PROFILE:
- Name: {profile.name}
- Role: {profile.role}
- Matched skills: {matched_skills_str}
- Relevant projects:
{project_highlights}
- Years of experience: {profile.experience_years}
{extra}

MATCH SCORE: {match.match_score}/100 ({match.selection_probability} probability)
REASONING: {match.reasoning}
"""

def _parse_email(raw: str) -> GeneratedEmail:
    lines = raw.strip().splitlines()
    subject = ""
    body_lines = []
    body_started = False

    for line in lines:
        if not body_started and line.lower().startswith("subject:"):
            subject = line.split(":", 1)[1].strip()
        elif not body_started and subject:
            if line.strip():
                body_started = True
                body_lines.append(line)
        else:
            body_lines.append(line)

    body = "\n".join(body_lines).strip()
    if not subject:
        subject = "Quick intro"

    return GeneratedEmail(
        subject=subject,
        body=body,
        word_count=len(body.split()),
    )

async def generate_email(
    intel: CompanyIntel,
    profile: UserProfile,
    match: MatchResult,
) -> GeneratedEmail:
    prompt = _build_prompt(intel, profile, match)

    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(
            f"{settings.ollama_base_url}/api/generate",
            json={
                "model": settings.ollama_model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 400,
                },
            },
        )
        response.raise_for_status()
        data = response.json()

    raw_text = data.get("response", "").strip()
    if not raw_text:
        raise ValueError("Ollama returned an empty response. Is the model loaded?")

    return _parse_email(raw_text)

async def check_ollama_health() -> bool:
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            r = await client.get(f"{settings.ollama_base_url}/api/tags")
            r.raise_for_status()
            models = [m["name"] for m in r.json().get("models", [])]
            return any(settings.ollama_model in m for m in models)
    except Exception:
        return False
