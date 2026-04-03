from typing import List, Dict

def suggest_referral_strategy(company_name: str, company_type: str) -> Dict:
    """
    Phase 8: Suggest Referral
    Provides tailored advice on where to seek referrals based on company profile.
    """
    strategies = {
        "MNC": [
            "Search LinkedIn for 2nd-degree connections currently at " + company_name,
            "Check internal employee referral portals (often posted on Blind or Fishbowl)",
            "Reach out to University Alumni on LinkedIn who work at " + company_name
        ],
        "funded_startup": [
            "Follow the founders on X (Twitter) or LinkedIn; look for 'We are hiring' posts",
            "Check the 'People' tab on LinkedIn and filter by your shared skills",
            "Message current engineers directly with a link to your GitHub flagship project"
        ],
        "startup": [
            "Find the CTO or Engineering Manager directly",
            "Mention your specific interest in their niche/problem space in the first message",
            "Check Y Combinator's Work at a Startup portal"
        ]
    }
    
    return {
        "company": company_name,
        "suggested_actions": strategies.get(company_type, strategies["startup"]),
        "platform_priority": ["LinkedIn", "Twitter/X", "Wellfound"] if company_type != "MNC" else ["LinkedIn", "Alumni Network"]
    }
