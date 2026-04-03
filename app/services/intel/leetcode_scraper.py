import httpx
import re
from typing import List, Dict

async def extract_leetcode_intel(leetcode_url: str) -> Dict:
    """
    Phase 2: LeetCode Extraction
    Using the public GraphQL API to get solved statistics and top tags.
    """
    # Extract username from URL
    match = re.search(r"leetcode\.com/([^/]+)", leetcode_url)
    if not match:
        return {"problems_solved": 0, "topics": [], "difficulty_breakdown": {}}
    
    username = match.group(1).strip("/")
    api_url = "https://leetcode.com/graphql"
    
    # Query to fetch solved statistics
    query = {
        "query": """
        query userProblemsSolved($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                problemsSolvedBeatsStats {
                    difficulty
                    percentage
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
            userSkillStats(username: $username) {
                tagSkillCounts {
                    intermediate {
                        tagName
                        problemsSolved
                        tagSlug
                    }
                    advanced {
                        tagName
                        problemsSolved
                        tagSlug
                    }
                    fundamental {
                        tagName
                        problemsSolved
                        tagSlug
                    }
                }
            }
        }
        """,
        "variables": {"username": username}
    }
    
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(api_url, json=query, timeout=10)
            if resp.status_code != 200:
                print(f"LeetCode API Error: {resp.status_code}")
                return {"problems_solved": 0, "topics": [], "difficulty_breakdown": {}}
            
            data = resp.json().get("data", {})
            user_data = data.get("matchedUser", {})
            skill_stats = data.get("userSkillStats", {}).get("tagSkillCounts", {})
            
            if not user_data:
                return {"problems_solved": 0, "topics": [], "difficulty_breakdown": {}}
            
            # Problems Solved
            ac_submissions = user_data.get("submitStatsGlobal", {}).get("acSubmissionNum", [])
            problems_solved = 0
            difficulty_breakdown = {}
            for item in ac_submissions:
                problems_solved += item.get("count", 0) if item.get("difficulty") == "All" else 0
                if item.get("difficulty") != "All":
                    difficulty_breakdown[item.get("difficulty")] = item.get("count")
            
            # Topics (Tags)
            topics = []
            for level in ["fundamental", "intermediate", "advanced"]:
                for tag in skill_stats.get(level, []):
                    topics.append({
                        "name": tag.get("tagName"),
                        "count": tag.get("problemsSolved")
                    })
            
            return {
                "problems_solved": problems_solved,
                "topics": sorted(topics, key=lambda x: x['count'], reverse=True),
                "difficulty_breakdown": difficulty_breakdown,
                "username": username
            }
        except Exception as e:
            print(f"Error fetching LeetCode data: {e}")
            return {"problems_solved": 0, "topics": [], "difficulty_breakdown": {}}
