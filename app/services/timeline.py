from datetime import datetime, timedelta
from collections import defaultdict
from app.models.tracker import Opportunity

def _week_label(base: datetime, week_offset: int) -> str:
    start = base + timedelta(weeks=week_offset)
    end   = start + timedelta(days=6)
    return f"Week of {start.strftime('%b %d')} – {end.strftime('%b %d')}"

def generate_timeline(opportunities: list[Opportunity]) -> dict:
    now = datetime.utcnow()
    weeks: dict[int, list] = defaultdict(list)
    overdue = []
    no_deadline = []

    for opp in opportunities:
        if not opp.deadline:
            no_deadline.append(_fmt(opp))
            continue

        days_left = (opp.deadline - now).days
        if days_left < 0:
            overdue.append(_fmt(opp))
            continue

        week_num = days_left // 7
        weeks[week_num].append((days_left, _fmt(opp)))

    timeline_weeks = []
    for i in sorted(weeks.keys()):
        items = [item for _, item in sorted(weeks[i], key=lambda x: x[0])]
        timeline_weeks.append({
            "label": _week_label(now, i),
            "items": items,
        })

    return {
        "generated_at": now.isoformat(),
        "weeks": timeline_weeks,
        "overdue": overdue,
        "no_deadline": no_deadline,
    }

def _fmt(opp: Opportunity) -> dict:
    return {
        "title":     opp.title,
        "type":      opp.type.value,
        "priority":  opp.priority.value,
        "days_left": opp.days_until_deadline,
        "deadline":  opp.deadline.strftime("%b %d, %Y") if opp.deadline else None,
        "url":       opp.url,
        "company":   opp.company,
        "score":     opp.priority_score,
    }

def render_timeline_text(timeline: dict) -> str:
    lines = [f"📅  Opportunity Timeline  (generated {timeline['generated_at'][:10]})\n"]

    for week in timeline["weeks"]:
        lines.append(f"── {week['label']} ──")
        for item in week["items"]:
            days = f"({item['days_left']}d left)" if item["days_left"] is not None else ""
            prio = {"High": "🔴", "Medium": "🟡", "Low": "⚪"}.get(item["priority"], "")
            lines.append(f"  {prio} {item['title']} {days}")
            if item["company"]:
                lines.append(f"     └ {item['company']} · {item['type']}")
        lines.append("")

    if timeline["overdue"]:
        lines.append("── Overdue ──")
        for item in timeline["overdue"]:
            lines.append(f"  ❌ {item['title']}")
        lines.append("")

    if timeline["no_deadline"]:
        lines.append("── No deadline ──")
        for item in timeline["no_deadline"]:
            lines.append(f"  • {item['title']}")

    return "\n".join(lines)
