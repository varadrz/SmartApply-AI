import asyncio
from app.models.outreach import PipelineRequest, UserProfile
from app.services.outreach_pipeline import run_pipeline

SAMPLE_PROFILE = UserProfile(
    name="Alex Kumar",
    role="Backend Engineer",
    skills=["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
    projects=[
        {
            "name": "PayFlow",
            "description": "Payment reconciliation service processing 10k transactions/day",
            "tech_stack": ["Python", "FastAPI", "PostgreSQL", "Redis"],
        },
        {
            "name": "DevBoard",
            "description": "Internal developer dashboard with metrics and alerting",
            "tech_stack": ["Python", "React", "Docker", "AWS"],
        },
    ],
    experience_years=2,
    extra_context="Looking for backend/infra roles at product companies",
)

async def main():
    url = input("Enter company URL to test (e.g. https://stripe.com): ").strip()
    if not url:
        url = "https://stripe.com"

    print(f"\n▶  Running pipeline for {url} ...\n")

    request = PipelineRequest(
        company_url=url,
        profile=SAMPLE_PROFILE,
        use_playwright=False,
    )

    result = await run_pipeline(request)

    print("━" * 60)
    print(f"Company      : {result.company_intel.company_name}")
    print(f"Type         : {result.company_intel.company_type}")
    print(f"Domain       : {result.company_intel.domain}")
    print(f"Tech stack   : {', '.join(result.company_intel.tech_stack[:8]) or 'none detected'}")
    print(f"Hiring for   : {', '.join(result.company_intel.hiring_signals[:4]) or 'none detected'}")
    print("━" * 60)
    print(f"Match score  : {result.match.match_score}/100")
    print(f"Probability  : {result.match.selection_probability}")
    print(f"Matched      : {', '.join(result.match.matched_skills) or 'none'}")
    print(f"Gaps         : {', '.join(result.match.unmatched_requirements[:4]) or 'none'}")
    print(f"Reasoning    : {result.match.reasoning}")
    print("━" * 60)
    print(f"Subject      : {result.email.subject}")
    print(f"Word count   : {result.email.word_count}")
    print("\nEmail body:\n")
    print(result.email.body)
    print("━" * 60)
    print(f"Saved to DB  : id={result.id}")

if __name__ == "__main__":
    asyncio.run(main())
