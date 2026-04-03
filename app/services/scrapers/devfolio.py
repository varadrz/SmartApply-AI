import requests
from datetime import datetime
from app.models.tracker import Opportunity, OpportunityType
from app.services.database import make_fingerprint

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; OpportunityBot/1.0)",
    "Accept": "application/json",
}

DEVFOLIO_API = "https://api.devfolio.co/api/hackathons"

def scrape_devfolio(limit: int = 30) -> list[Opportunity]:
    opportunities = []
    try:
        resp = requests.get(
            DEVFOLIO_API,
            params={"type": "public", "open": "true", "page": 1, "per_page": limit},
            headers=HEADERS,
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()
        items = data if isinstance(data, list) else data.get("results", data.get("data", []))
    except Exception as e:
        print(f"[devfolio] fetch error: {e}")
        return []

    for item in items:
        try:
            title = item.get("name") or item.get("title", "")
            url   = f"https://devfolio.co/hackathons/{item.get('slug', '')}"
            desc  = item.get("tagline") or item.get("description", "")
            prize = str(item.get("prize_amount") or item.get("prize", ""))
            eligibility = item.get("eligibility", "")

            deadline = None
            days_left = None
            for key in ("submission_deadline", "ends_at", "deadline", "hackathon_end"):
                raw = item.get(key)
                if raw:
                    try:
                        deadline = datetime.fromisoformat(raw.replace("Z", "+00:00")).replace(tzinfo=None)
                        days_left = (deadline - datetime.utcnow()).days
                        break
                    except Exception:
                        pass

            hiring = any(
                kw in (desc + title).lower()
                for kw in ["hiring", "job", "recruit", "placement", "ppo", "internship"]
            )

            fingerprint = make_fingerprint(title, "devfolio", url)

            opp = Opportunity(
                title=title,
                source="devfolio",
                url=url,
                description=desc[:400],
                type=OpportunityType.hackathon,
                deadline=deadline,
                days_until_deadline=days_left,
                prize=prize,
                eligibility=str(eligibility),
                hiring_potential=hiring,
                tags=["hackathon", "devfolio"],
                fingerprint=fingerprint,
            )
            opportunities.append(opp)
        except Exception as e:
            print(f"[devfolio] parse error on item: {e}")
            continue

    print(f"[devfolio] found {len(opportunities)} hackathons")
    return opportunities
