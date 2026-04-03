import requests
from datetime import datetime
from bs4 import BeautifulSoup
from dateutil import parser as dateparser
from app.models.tracker import Opportunity, OpportunityType
from app.services.database import make_fingerprint

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; OpportunityBot/1.0)"}
MLH_URL = "https://mlh.io/seasons/2025/events"

def scrape_mlh() -> list[Opportunity]:
    opportunities = []
    try:
        resp = requests.get(MLH_URL, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
    except Exception as e:
        print(f"[mlh] fetch error: {e}")
        return []

    for card in soup.select(".event-wrapper, .event, [class*='event-block']"):
        try:
            title_el = card.select_one("h3, h2, .event-name, [class*='event-name']")
            link_el  = card.select_one("a.event-link, a[href*='mlh.io'], .event-link")
            date_el  = card.select_one(".event-date, time, [class*='date']")

            title = title_el.get_text(strip=True) if title_el else ""
            if not title:
                continue

            url = link_el["href"] if link_el and link_el.get("href") else MLH_URL
            if url.startswith("/"):
                url = f"https://mlh.io{url}"

            deadline = None
            days_left = None
            if date_el:
                raw_date = date_el.get("datetime") or date_el.get_text(strip=True)
                try:
                    deadline = dateparser.parse(raw_date, fuzzy=True)
                    if deadline:
                        deadline = deadline.replace(tzinfo=None)
                        days_left = (deadline - datetime.utcnow()).days
                except Exception:
                    pass

            mode_el = card.select_one(".event-hybrid-notes, [class*='hybrid'], [class*='mode']")
            tags = ["mlh", "hackathon"]
            if mode_el:
                mode = mode_el.get_text(strip=True).lower()
                if "virtual" in mode or "online" in mode:
                    tags.append("online")
                elif "hybrid" in mode:
                    tags.append("hybrid")
                else:
                    tags.append("in-person")

            fingerprint = make_fingerprint(title, "mlh", url)

            opp = Opportunity(
                title=title,
                source="mlh",
                url=url,
                description="MLH official hackathon event.",
                type=OpportunityType.hackathon,
                deadline=deadline,
                days_until_deadline=days_left,
                tags=tags,
                fingerprint=fingerprint,
            )
            opportunities.append(opp)
        except Exception as e:
            print(f"[mlh] parse error: {e}")
            continue

    print(f"[mlh] found {len(opportunities)} events")
    return opportunities
