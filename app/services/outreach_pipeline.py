from datetime import datetime
from app.models.outreach import PipelineRequest, PipelineResult
from app.services.scraper import scrape
from app.services.extractor import extract_intel
from app.services.matcher import match
from app.services.generator import generate_email
from app.services.database import save_outreach

async def run_pipeline(request: PipelineRequest) -> PipelineResult:
    """
    Full pipeline:
      1. Scrape company URL (+ careers page if found)
      2. Extract tech stack + hiring signals
      3. Match against user profile
      4. Generate personalized email via Ollama
      5. Persist to SQLite
      6. Return full result
    """
    # 1. Scrape
    scraped = await scrape(request.company_url, use_playwright=request.use_playwright)

    # 2. Extract company intelligence
    intel = extract_intel(scraped)

    # 3. Match skills
    match_result = match(intel, request.profile)

    # 4. Generate email
    email = await generate_email(intel, request.profile, match_result)

    # 5. Assemble result
    result = PipelineResult(
        company_url=request.company_url,
        company_intel=intel,
        match=match_result,
        email=email,
        status="draft",
        created_at=datetime.utcnow(),
    )

    # 6. Persist
    row_id = await save_outreach(result)
    result.id = row_id

    return result
