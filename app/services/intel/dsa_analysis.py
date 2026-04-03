from typing import List, Dict

# Topic map to bridge common keyword variations
TOPIC_SYNONYMS = {
    "arrays": ["array", "list", "sequence", "two-pointers", "sliding-window"],
    "dynamic programming": ["dp", "dynamic-programming", "optimization", "memoization"],
    "trees": ["tree", "binary-tree", "dfs", "bfs", "binary-search-tree", "trie"],
    "graphs": ["graph", "bfs", "dfs", "topological-sort", "dijkstra", "shortest-path"],
    "strings": ["string", "text", "buffer", "regex"],
    "sorting": ["sort", "binary-search", "divide-and-conquer"],
    "linked list": ["linkedlist", "pointer", "doubly-linked-list"],
    "hashing": ["hash-table", "hashmap", "set", "map"],
    "stacks/queues": ["stack", "queue", "monotonic-stack", "deque"],
    "heaps": ["heap", "priority-queue"],
    "bit manipulation": ["bit-manipulation", "bitwise"],
}

def analyze_dsa_readiness(user_topics: List[Dict], company_needs: List[str]) -> Dict:
    """
    Phase 4: DSA Analysis
    1. Input: leetcode_topics
    2. Compare with: company_required_topics
    3. Output: covered_topics, missing_topics, readiness_score
    """
    user_topic_names = {t['name'].lower() for t in user_topics if t['count'] > 0}
    required_topic_names = {t.lower() for t in company_needs}
    
    covered = []
    missing = []
    
    for req in required_topic_names:
        # Check direct or synonym match
        is_covered = False
        if req in user_topic_names:
            is_covered = True
        else:
            for canon, syns in TOPIC_SYNONYMS.items():
                if req == canon or req in syns:
                    if any(s in user_topic_names for s in syns + [canon]):
                        is_covered = True
                        break
        
        if is_covered:
            covered.append(req)
        else:
            missing.append(req)
            
    # Calculate Readiness Score
    if not required_topic_names:
        readiness_score = 100.0 if user_topic_names else 0.0
    else:
        readiness_score = (len(covered) / len(required_topic_names)) * 100.0
        
    return {
        "covered_topics": covered,
        "missing_topics": missing,
        "readiness_score": round(readiness_score, 2)
    }
