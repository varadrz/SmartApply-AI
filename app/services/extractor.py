import re
from app.models.outreach import ScrapedCompany, CompanyIntel

LANGUAGES = [
    "python", "javascript", "typescript", "java", "golang", "go", "rust",
    "c++", "c#", "ruby", "kotlin", "swift", "scala", "php", "elixir",
]
FRAMEWORKS = [
    "react", "next.js", "nextjs", "vue", "angular", "svelte",
    "fastapi", "django", "flask", "spring", "rails", "laravel",
    "express", "nestjs", "gin", "fiber", "actix",
]
INFRA = [
    "aws", "gcp", "azure", "docker", "kubernetes", "k8s", "terraform",
    "ci/cd", "github actions", "jenkins", "argocd", "helm",
]
DATABASES = [
    "postgresql", "postgres", "mysql", "mongodb", "redis", "elasticsearch",
    "cassandra", "dynamodb", "supabase", "firebase", "sqlite",
]
ML_AI = [
    "machine learning", "deep learning", "llm", "pytorch", "tensorflow",
    "hugging face", "openai", "langchain", "rag", "mlops", "data science",
]
ALL_TECH = LANGUAGES + FRAMEWORKS + INFRA + DATABASES + ML_AI

DOMAIN_SIGNALS = {
    "fintech":   ["payment", "banking", "finance", "fintech", "trading", "wallet", "ledger"],
    "devtools":  ["developer", "devtools", "sdk", "api", "platform", "cli", "open source"],
    "saas":      ["saas", "subscription", "b2b", "enterprise", "dashboard", "workflow"],
    "ecommerce": ["ecommerce", "e-commerce", "shopping", "marketplace", "retail", "checkout"],
    "healthtech":["health", "medical", "clinical", "patient", "healthcare", "telemedicine"],
    "edtech":    ["education", "learning", "course", "student", "edtech", "tutoring"],
    "ai/ml":     ["artificial intelligence", "machine learning", "ai-powered", "model", "inference"],
}

STARTUP_SIGNALS = [
    "seed", "series a", "series b", "funded", "yc", "y combinator",
    "techstars", "startup", "early stage", "remote-first", "small team",
    "fast-paced", "equity", "stock options",
]
MNC_SIGNALS = [
    "fortune 500", "nasdaq", "nyse", "global offices", "10,000 employees",
    "enterprise", "publicly traded", "worldwide", "international",
]

ROLE_PATTERN = re.compile(
    r"(senior|junior|staff|lead|principal)?\s?"
    r"(software|backend|frontend|fullstack|full.stack|data|ml|devops|sre|platform)\s?"
    r"(engineer|developer|scientist|analyst|architect|intern)",
    re.IGNORECASE,
)

def _find_tech(text: str) -> list[str]:
    lower = text.lower()
    found = []
    for tech in ALL_TECH:
        pattern = r"\b" + re.escape(tech) + r"\b"
        if re.search(pattern, lower):
            found.append(tech)
    return list(dict.fromkeys(found))

def _find_hiring_signals(text: str) -> list[str]:
    matches = ROLE_PATTERN.findall(text)
    roles = [" ".join(p for p in m if p).strip() for m in matches]
    for line in text.splitlines():
        ll = line.lower()
        if any(k in ll for k in ["we're hiring", "we are hiring", "join our team", "open position"]):
            roles.append(line.strip()[:80])
    return list(dict.fromkeys(r for r in roles if r))[:15]

def _detect_domain(text: str) -> str:
    lower = text.lower()
    scores = {domain: 0 for domain in DOMAIN_SIGNALS}
    for domain, keywords in DOMAIN_SIGNALS.items():
        for kw in keywords:
            if kw in lower:
                scores[domain] += 1
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "unknown"

def _detect_company_type(text: str) -> str:
    lower = text.lower()
    startup_score = sum(1 for s in STARTUP_SIGNALS if s in lower)
    mnc_score = sum(1 for s in MNC_SIGNALS if s in lower)
    if startup_score > mnc_score:
        return "startup"
    if mnc_score > startup_score:
        return "MNC"
    return "unknown"

def _make_summary(company_name: str, domain: str, company_type: str, tech: list[str]) -> str:
    tech_str = ", ".join(tech[:5]) if tech else "various technologies"
    return f"{company_name} is a {company_type} in the {domain} space working with {tech_str}."

def extract_intel(scraped: ScrapedCompany) -> CompanyIntel:
    text = scraped.raw_text
    tech = _find_tech(text)
    hiring = _find_hiring_signals(text)
    domain = _detect_domain(text)
    company_type = _detect_company_type(text)
    summary = _make_summary(scraped.company_name, domain, company_type, tech)
    return CompanyIntel(
        company_name=scraped.company_name,
        tech_stack=tech,
        hiring_signals=hiring,
        company_type=company_type,
        domain=domain,
        summary=summary,
    )
