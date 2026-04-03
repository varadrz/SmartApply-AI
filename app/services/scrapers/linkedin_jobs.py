import requests
import re
from bs4 import BeautifulSoup
from typing import List, Dict
from app.models.tracker import Opportunity, OpportunityType, Priority
from app.services.database import make_fingerprint

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
}

def scrape_linkedin_jobs(query: str = "software engineer internship", limit: int = 15) -> List[Opportunity]:
    """
    Phase 5: LinkedIn Jobs Scraper
    Uses Google Search Dorks to find recent LinkedIn job postings without authentication.
    """
    search_url = f"https://www.google.com/search?q=site:linkedin.com/jobs/view {query.replace(' ', '+')}"
    opportunities = []
    
    try:
        resp = requests.get(search_url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Google search result blocks
        results = soup.select(".g, div[data-hveid]")
        
        for res in results[:limit]:
            link_tag = res.find("a", href=True)
            if not link_tag: continue
            
            url = link_tag["href"]
            if "linkedin.com/jobs/view" not in url: continue
            
            title_tag = res.find("h3")
            title = title_tag.get_text(strip=True) if title_tag else "Job Posting"
            
            # Clean title (often includes company info)
            company_name = "LinkedIn Source"
            if " - " in title:
                parts = title.split(" - ")
                title = parts[0].strip()
                company_name = parts[1].split("|")[0].strip()
            
            fingerprint = make_fingerprint(title, "linkedin_jobs", url)
            
            opp = Opportunity(
                title=title,
                source="linkedin_jobs",
                url=url,
                company=company_name,
                description=f"LinkedIn job posting: {title} at {company_name}",
                type=OpportunityType.internship if "intern" in query.lower() else OpportunityType.hiring_drive,
                tags=["linkedin", "job"],
                fingerprint=fingerprint
            )
            opportunities.append(opp)
            
    except Exception as e:
        print(f"Error scraping LinkedIn via Google: {e}")
        
    return opportunities
