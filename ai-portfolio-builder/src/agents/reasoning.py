"""Generate agent reasoning using Claude API."""

import os
import json
import anthropic

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

AGENT_DEFINITIONS = [
    {
        "name": "Investor Profile Agent",
        "color": "#3b82f6",
        "role": "Analyze the investor profile and classify their investment personality.",
    },
    {
        "name": "Asset Discovery Agent",
        "color": "#8b5cf6",
        "role": "Screen the asset universe and identify candidates matching the profile.",
    },
    {
        "name": "Asset Filtering Agent",
        "color": "#10b981",
        "role": "Narrow candidates to the most suitable assets for the portfolio.",
    },
    {
        "name": "Portfolio Builder Agent",
        "color": "#f59e0b",
        "role": "Construct the base portfolio with specific tickers and weights.",
    },
    {
        "name": "Portfolio Simulator Agent",
        "color": "#ec4899",
        "role": "Generate safer and higher-return variants by adjusting allocations.",
    },
    {
        "name": "Risk & Tradeoff Agent",
        "color": "#ef4444",
        "role": "Assess risk metrics and explain tradeoffs between portfolio variants.",
    },
]


def generate_agent_reasoning(profile, profile_type, portfolios):
    """Call Claude to generate reasoning for each agent step."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    prompt = f"""You are simulating a team of 6 specialized AI investment agents that just built a portfolio for a user. Each agent must provide a short (2-3 sentence) reasoning about what they did.

User Profile:
- Age: {profile.get('age', 'N/A')}
- Experience: {profile.get('experience', 'N/A')}
- Risk Tolerance: {profile.get('risk_tolerance', 'N/A')}
- Goal: {profile.get('goal', 'N/A')}
- Time Horizon: {profile.get('time_horizon', 'N/A')}
- Preference: {profile.get('preference', 'N/A')}

Profile Classification: {profile_type}

Base Portfolio: {json.dumps(portfolios.get('base', []))}
Safer Version: {json.dumps(portfolios.get('safer', []))}
Higher Return Version: {json.dumps(portfolios.get('higher', []))}

For each agent below, write a concise 2-3 sentence reasoning from their perspective. Be specific — reference actual tickers, percentages, and numbers from the portfolios above. Do not be generic.

Agents:
1. Investor Profile Agent — Classifies the investor
2. Asset Discovery Agent — Screens the asset universe
3. Asset Filtering Agent — Narrows to suitable assets
4. Portfolio Builder Agent — Constructs the base allocation
5. Portfolio Simulator Agent — Generates safer and higher-return variants
6. Risk & Tradeoff Agent — Assesses risk and tradeoffs

Respond with a JSON array of 6 objects, each with a "name" and "text" field. Only output the JSON array, nothing else."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    text = response.content[0].text.strip()
    # Parse JSON from response
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
        text = text.strip()

    reasoning_list = json.loads(text)

    # Merge with agent definitions (colors)
    result = []
    for i, agent_def in enumerate(AGENT_DEFINITIONS):
        agent_text = ""
        if i < len(reasoning_list):
            agent_text = reasoning_list[i].get("text", "")
        result.append({
            "name": agent_def["name"],
            "color": agent_def["color"],
            "text": agent_text,
        })

    return result
