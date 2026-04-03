# Obsidian AI Platform (SmartApply-AI)

A unified, professional FastAPI + Next.js application that combines automated opportunity tracking, deep company intel analysis, and comprehensive AI-powered career pipeline management.

## Overview
Obsidian AI tracks and manages your complete technical hiring pipeline in one place, using large language models to provide unfair advantages in outreach, resume tailoring, and interview preparation.

### Core Modules

1. **Outreach & Target Intelligence**
   - Deep-scrapes company websites and career pages.
   - Matches your project profile against company tech stacks and hiring signals.
   - Uses local LLMs (via Ollama) to draft authentic, non-generic outreach emails.

2. **Pipeline Command Center**
   - **Interviews Kanban**: Easily track your progression across screenings, technicals, and onsites.
   - **Live Calendar**: An integrated timeline syncing deep-work prep blocks and scheduled calls.

3. **Asset Vault**
   - **Portfolio Showcase**: Manages case studies and extracts insights directly from your GitHub repositories.
   - **Resume Optimizer**: Compares your baseline CV against Target JD URLs, providing live AI suggestions for high-impact edits.

4. **Market Intelligence**
   - Tracks macro trends in hiring liquidities (Enterprise vs Startups), tech stack velocity (e.g. rising demand in Rust or Golang), and compensation bands.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS v4, Zustand.
- **Backend**: FastAPI, Pydantic, Python 3.10+.
- **Database**: SQLite (Migrating to robust PostgreSQL via SQLAlchemy).
- **AI Core**: Local Ollama execution for 100% privacy and local processing.
- **Scraping**: Playwright, BeautifulSoup4.

## Quick Start
### 1. Installation
```bash
# Backend Dependencies
pip install -r requirements.txt
playwright install chromium

# Frontend Dependencies
cd frontend
npm install
```

### 2. Configuration
Copy `.env.example` to `.env` and fill in your profile paths, LLM configuration, and Database URIs.

### 3. Run the Platform
**Running the Python Backend:**
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```
*API Documentation available at: [http://localhost:8001/docs](http://localhost:8001/docs)*

**Running the Next.js Frontend:**
```bash
cd frontend
npm run dev
```
*Dashboard available at: [http://localhost:3000](http://localhost:3000)*

## Project Structure
- `app/`: Production FastAPI backend (`/api/routers`, `/services`, `/models`).
- `frontend/`: Premium dark-mode Obsidian Next.js Dashboard.
- `requirements.txt`: Python package registry.

## License
MIT
