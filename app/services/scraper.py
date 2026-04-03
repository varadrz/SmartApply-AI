import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from app.models.outreach import ScrapedCompany

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

CAREERS_HINTS = [
    "/careers", "/jobs", "/about", "/about-us", "/team",
    "/hiring", "/work-with-us", "/join-us", "/join",
]

def _extract_text(soup: BeautifulSoup) -> str:
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()
    lines = [line.strip() for line in soup.get_text(separator="\n").splitlines()]
    return "\n".join(line for line in lines if line)

def _find_careers_url(base_url: str, soup: BeautifulSoup) -> str | None:
    for a in soup.find_all("a", href=True):
        href = a["href"].lower()
        if any(h.strip("/") in href for h in CAREERS_HINTS):
            return urljoin(base_url, a["href"])
    parsed = urlparse(base_url)
    root = f"{parsed.scheme}://{parsed.netloc}"
    for hint in CAREERS_HINTS:
        candidate = root + hint
        try:
            r = requests.head(candidate, headers=HEADERS, timeout=5, allow_redirects=True, verify=False)
            if r.status_code < 400:
                return candidate
        except Exception:
            continue
    return None

def scrape_with_requests(url: str) -> ScrapedCompany:
    resp = requests.get(url, headers=HEADERS, timeout=15, verify=False)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    title = soup.title.string.strip() if soup.title else ""
    careers_url = _find_careers_url(url, soup)
    full_text = _extract_text(soup)
    if careers_url and careers_url != url:
        try:
            cr = requests.get(careers_url, headers=HEADERS, timeout=15, verify=False)
            cr.raise_for_status()
            careers_soup = BeautifulSoup(cr.text, "html.parser")
            full_text += "\n\n--- CAREERS PAGE ---\n\n" + _extract_text(careers_soup)
        except Exception:
            pass
    company_name = (
        (soup.find("meta", property="og:site_name") or {}).get("content")
        or (title.split("|")[0].split("–")[0].strip() if title else "")
        or urlparse(url).netloc.replace("www.", "").split(".")[0].title()
    )
    return ScrapedCompany(
        url=url,
        company_name=company_name,
        raw_text=full_text[:12000],
        page_title=title,
        careers_url=careers_url,
    )

async def scrape_with_playwright(url: str) -> ScrapedCompany:
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        raise RuntimeError("Playwright not installed.")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(extra_http_headers=HEADERS)
        await page.goto(url, wait_until="networkidle", timeout=30000)
        html = await page.content()
        await browser.close()
    soup = BeautifulSoup(html, "html.parser")
    title = soup.title.string.strip() if soup.title else ""
    careers_url = _find_careers_url(url, soup)
    full_text = _extract_text(soup)
    company_name = (
        (soup.find("meta", property="og:site_name") or {}).get("content")
        or (title.split("|")[0].strip() if title else "")
        or urlparse(url).netloc.replace("www.", "").split(".")[0].title()
    )
    return ScrapedCompany(
        url=url,
        company_name=company_name,
        raw_text=full_text[:12000],
        page_title=title,
        careers_url=careers_url,
    )

async def scrape(url: str, use_playwright: bool = False) -> ScrapedCompany:
    if use_playwright:
        return await scrape_with_playwright(url)
    return scrape_with_requests(url)
