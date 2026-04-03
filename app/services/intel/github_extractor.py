import httpx
import re
from typing import List, Dict

async def extract_github_intel(github_url: str) -> Dict:
    """
    Phase 2: GitHub Extraction
    Using GitHub API (publicly accessible info) to get structured repo and activity data.
    """
    # Extract username from URL
    match = re.search(r"github\.com/([^/]+)", github_url)
    if not match:
        return {"repos": [], "languages": [], "stars": 0}
    
    username = match.group(1)
    api_url = f"https://api.github.com/users/{username}/repos"
    
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(api_url, timeout=10)
            if resp.status_code != 200:
                print(f"GitHub API Error: {resp.status_code}")
                return {"repos": [], "languages": [], "stars": 0}
            
            repos_data = resp.json()
            repos = []
            languages = set()
            total_stars = 0
            
            for repo in repos_data:
                if not repo.get('fork'): # Only focus on original repos for portfolio
                    repos.append({
                        "name": repo.get("name"),
                        "description": repo.get("description"),
                        "stars": repo.get("stargazers_count"),
                        "language": repo.get("language"),
                        "url": repo.get("html_url")
                    })
                    total_stars += repo.get("stargazers_count", 0)
                    if repo.get("language"):
                        languages.add(repo.get("language"))
            
            return {
                "repos": repos[:10], # Top 10 for portfolio
                "languages": list(languages),
                "stars": total_stars,
                "username": username
            }
        except Exception as e:
            print(f"Error fetching GitHub data: {e}")
            return {"repos": [], "languages": [], "stars": 0}
