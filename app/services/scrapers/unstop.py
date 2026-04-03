import requests
from datetime import datetime
from bs4 import BeautifulSoup
from app.models.tracker import Opportunity, OpportunityType
from app.services.database import make_fingerprint

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json, text/html",
}

UNSTOP_API = "https://unstop.com/api/public/opportunity/search-result"

def _type_from_category(category: str) -> OpportunityType:
    cat = category.lower()
    if "hackathon" in cat:
        return OpportunityType.hackathon
    if "competition" in cat or "contest" in cat:
        return OpportunityType.competition
    if "internship" in cat:
        return OpportunityType.internship
    if "job" in cat or "hiring" in cat:
        return OpportunityType.hiring_drive
    return OpportunityType.competition

def scrape_unstop(limit: int = 30) -> list[Opportunity]:
    opportunities = []

    try:
        resp = requests.post(
            UNSTOP_API,
            json={
                "filters": {"status": "open"},
                "page": 1,
                "size": limit,
                "sort": "latest",
            },
            headers={**HEADERS, "Content-Type": "application/json"},
            timeout=15,
        )
        resp.raise_for_status()
        payload = resp.json()
        items = (
            payload.get("data", {}).get("data", [])
            or payload.get("data", [])
            or payload.get("results", [])
        )
    except Exception as e:
        print(f"[unstop] API error ({e}), trying HTML fallback")
        items = _html_fallback()

    for item in items:
        try:
            title = item.get("title") or item.get("name", "")
            slug  = item.get("seo_url") or item.get("slug", "")
            url   = f"https://unstop.com/competitions/{slug}" if slug else "https://unstop.com"
            desc  = item.get("short_description") or item.get("description", "")
            prize = str(item.get("prize_money") or item.get("reward", ""))
            category = item.get("type") or item.get("category", "")

            deadline = None
            days_left = None
            for key in ("registration_deadline", "deadline", "end_date"):
                raw = item.get(key)
                if raw:
                    try:
                        deadline = datetime.fromisoformat(str(raw).replace("Z", "+00:00")).replace(tzinfo=None)
                        days_left = (deadline - datetime.utcnow()).days
                        break
                    except Exception:
                        pass

            opp_type = _type_from_category(category)
            hiring = opp_type in (OpportunityType.hiring_drive, OpportunityType.internship) or \
                     any(k in (title + desc).lower() for k in ["hiring", "ppo", "placement"])

            fingerprint = make_fingerprint(title, "unstop", url)

            opp = Opportunity(
                title=title,
                source="unstop",
                url=url,
                description=str(desc)[:400],
                type=opp_type,
                deadline=deadline,
                days_until_deadline=days_left,
                prize=prize,
                hiring_potential=hiring,
                tags=["unstop", category.lower()],
                fingerprint=fingerprint,
            )
            opportunities.append(opp)
        except Exception as e:
            print(f"[unstop] parse error: {e}")
            continue

    print(f"[unstop] found {len(opportunities)} opportunities")
    return opportunities

def _html_fallback() -> list[dict]:
    try:
        resp = requests.get(
            "https://unstop.com/hackathons",
            headers=HEADERS,
            timeout=15,
        )
        soup = BeautifulSoup(resp.text, "html.parser")
        items = []
        for card in soup.select(".opportunity-card, .comp-card, [class*='card']")[:20]:
            title_el = card.select_one("h2, h3, .title, [class*='title']")
            link_el  = card.select_one("a[href]")
            if title_el and link_el:
                items.append({
                    "title": title_el.get_text(strip=True),
                    "seo_url": link_el["href"].split("/")[-1],
                    "category": "competition",
                })
        return items
    except Exception:
        return []
