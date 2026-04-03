import requests
from datetime import datetime
from bs4 import BeautifulSoup
from app.models.tracker import Opportunity, OpportunityType
from app.services.database import make_fingerprint

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; OpportunityBot/1.0)"}

YC_API = "https://www.workatastartup.com/api/job_list"

def scrape_yc_startups(roles: list[str] | None = None) -> list[Opportunity]:
    opportunities = []
    role_query = " ".join(roles or ["software engineer", "backend", "fullstack"])

    try:
        resp = requests.get(
            YC_API,
            params={"query": role_query, "limit": 30},
            headers={**HEADERS, "Accept": "application/json"},
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()
        jobs = data if isinstance(data, list) else data.get("jobs", data.get("results", []))
    except Exception as e:
        print(f"[yc] API error: {e}, trying HTML")
        jobs = _yc_html_fallback(role_query)

    for job in jobs:
        try:
            title   = job.get("title") or job.get("role", "")
            company = job.get("company", {})
            company_name = company.get("name", "") if isinstance(company, dict) else str(company)
            url     = job.get("url") or f"https://www.workatastartup.com/jobs/{job.get('id', '')}"
            desc    = job.get("description", "")[:400]
            funding = company.get("stage", "") if isinstance(company, dict) else ""

            if funding in ("Series A", "Series B", "Series C+"):
                company_type = "funded_startup"
            else:
                company_type = "startup"

            opp_type = OpportunityType.internship if "intern" in title.lower() else OpportunityType.startup_role

            fingerprint = make_fingerprint(title, "yc", url)

            opp = Opportunity(
                title=title,
                source="yc_startups",
                url=url,
                description=desc,
                type=opp_type,
                company=company_name,
                company_type=company_type,
                hiring_potential=True,
                tags=["yc", "startup", funding.lower() if funding else "early-stage"],
                fingerprint=fingerprint,
            )
            opportunities.append(opp)
        except Exception as e:
            print(f"[yc] parse error: {e}")
            continue

    print(f"[yc] found {len(opportunities)} startup jobs")
    return opportunities

def _yc_html_fallback(query: str) -> list[dict]:
    try:
        resp = requests.get(
            "https://www.workatastartup.com/jobs",
            params={"q": query},
            headers=HEADERS,
            timeout=15,
        )
        soup = BeautifulSoup(resp.text, "html.parser")
        jobs = []
        for card in soup.select(".job-name, [class*='job-row']")[:20]:
            title_el   = card.select_one("h2, h3, [class*='title']")
            company_el = card.select_one("[class*='company']")
            link_el    = card.select_one("a[href]")
            if title_el:
                jobs.append({
                    "title":   title_el.get_text(strip=True),
                    "company": {"name": company_el.get_text(strip=True) if company_el else ""},
                    "url":     link_el["href"] if link_el else "",
                })
        return jobs
    except Exception:
        return []

HIRING_THREADS = [
    ("https://www.reddit.com/r/cscareerquestions/search.json?q=hiring+intern&sort=new&limit=10",
     "reddit"),
]

def scrape_community_hiring() -> list[Opportunity]:
    opportunities = []
    for url, source in HIRING_THREADS:
        try:
            resp = requests.get(
                url,
                headers={**HEADERS, "Accept": "application/json"},
                timeout=10,
            )
            resp.raise_for_status()
            posts = resp.json().get("data", {}).get("children", [])
            for post in posts[:10]:
                d = post.get("data", {})
                title = d.get("title", "")
                link  = "https://reddit.com" + d.get("permalink", "")
                if not title:
                    continue
                fingerprint = make_fingerprint(title, source, link)
                opp = Opportunity(
                    title=title[:120],
                    source=source,
                    url=link,
                    description=d.get("selftext", "")[:300],
                    type=OpportunityType.hiring_drive,
                    hiring_potential=True,
                    tags=[source, "community"],
                    fingerprint=fingerprint,
                )
                opportunities.append(opp)
        except Exception as e:
            print(f"[community:{source}] error: {e}")
    return opportunities
