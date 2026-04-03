# Opportunity Intelligence & Outreach Suite

A unified, professional FastAPI application that combines automated opportunity tracking with AI-powered cold outreach.

## Features

### 1. Opportunity Intelligence (Tracker)
- **Multi-source Scanning**: Automatically tracks hackathons, internships, competitions, and startup roles from Devfolio, Unstop, MLH, and YC.
- **Smart Scoring**: Ranks opportunities based on skill match, brand value, and deadline urgency.
- **Google Calendar Sync**: Automatically adds high-priority deadlines to your calendar.
- **Weekly Timeline**: Visualizes upcoming milestones.

### 2. Cold Outreach System
- **Company Scraping**: Deep-scrapes company websites and career pages.
- **AI Matching**: Matches your profile and projects against the company's tech stack and hiring signals.
- **Personalized Generation**: Uses LLMs (via Ollama) to draft genuine, non-generic outreach emails.

### 3. Unified Dashboard (Next.js)
- **Action-Oriented UI**: Minimal, high-performance control panel.
- **Dark/Light Mode**: Seamlessly switch themes for a premium experience.
- **Live Editing**: Refine and send emails directly from the dashboard.

## Quick Start

### 1. Installation
```bash
pip install -r requirements.txt
playwright install chromium
```

### 2. Configuration
Copy `.env.example` to `.env` and fill in your profile, Ollama settings, and Google API credentials.

### 3. Run the App
**Backend:**
```bash
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
Frontend URL: [http://localhost:3000](http://localhost:3000)

## Project Structure
- `app/`: FastAPI backend (routers, services, models).
- `frontend/`: Next.js 15 (App Router) dashboard with Tailwind CSS.
- `archive/`: Legacy Vite dashboard versions.
- `requirements.txt`: Python backend dependencies.
- `.gitignore`: Security-first exclusion rules.

## License
MIT
