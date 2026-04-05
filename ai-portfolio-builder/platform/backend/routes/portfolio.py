import json
import time
from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

VALID_EXPERIENCES = {"beginner", "intermediate", "advanced"}
VALID_RISK = {"low", "medium", "high", "very_low", "very_high"}

AGENT_STEPS = [
    {"name": "Investor Profile Agent", "color": "#3b82f6"},
    {"name": "Asset Discovery Agent", "color": "#8b5cf6"},
    {"name": "Asset Filtering Agent", "color": "#10b981"},
    {"name": "Portfolio Builder Agent", "color": "#f59e0b"},
    {"name": "Portfolio Simulator Agent", "color": "#ec4899"},
    {"name": "Risk & Tradeoff Agent", "color": "#ef4444"},
]


def _sse(event, data):
    """Format a Server-Sent Event line."""
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


def _run_agents_stream(profile):
    """Generator that runs each real LangGraph agent and yields SSE events."""
    from src.agents.profile import ProfileAgent
    from src.agents.discovery import DiscoveryAgent
    from src.agents.filtering import FilteringAgent
    from src.agents.builder import BuilderAgent
    from src.agents.simulator import SimulatorAgent
    from src.agents.risk import RiskAgent

    # --- Step 1: Investor Profile Agent ---
    yield _sse("agent", {"index": 0, "name": AGENT_STEPS[0]["name"], "status": "running"})
    t0 = time.time()
    agent = ProfileAgent()
    profile_type = agent.run(profile)
    yield _sse("agent", {
        "index": 0, "name": AGENT_STEPS[0]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": f"Classified as: {profile_type}",
    })

    # --- Step 2: Asset Discovery Agent ---
    yield _sse("agent", {"index": 1, "name": AGENT_STEPS[1]["name"], "status": "running"})
    t0 = time.time()
    agent = DiscoveryAgent()
    candidates = agent.run(profile_type)
    yield _sse("agent", {
        "index": 1, "name": AGENT_STEPS[1]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": f"Found {len(candidates)} candidate assets",
    })

    # --- Step 3: Asset Filtering Agent ---
    yield _sse("agent", {"index": 2, "name": AGENT_STEPS[2]["name"], "status": "running"})
    t0 = time.time()
    agent = FilteringAgent()
    suitable = agent.run(profile_type, candidates)
    yield _sse("agent", {
        "index": 2, "name": AGENT_STEPS[2]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": f"Narrowed to {len(suitable)} suitable assets",
    })

    # --- Step 4: Portfolio Builder Agent ---
    yield _sse("agent", {"index": 3, "name": AGENT_STEPS[3]["name"], "status": "running"})
    t0 = time.time()
    agent = BuilderAgent()
    portfolios = agent.run(profile_type)
    base_count = len(portfolios.get("base", []))
    yield _sse("agent", {
        "index": 3, "name": AGENT_STEPS[3]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": f"Built 3 variants, base has {base_count} holdings",
    })

    # --- Step 5: Portfolio Simulator Agent ---
    yield _sse("agent", {"index": 4, "name": AGENT_STEPS[4]["name"], "status": "running"})
    t0 = time.time()
    agent = SimulatorAgent()
    explanations = agent.run(profile_type, portfolios)
    yield _sse("agent", {
        "index": 4, "name": AGENT_STEPS[4]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": "Generated variant explanations",
    })

    # --- Step 6: Risk & Tradeoff Agent (calls Claude) ---
    yield _sse("agent", {"index": 5, "name": AGENT_STEPS[5]["name"], "status": "running"})
    t0 = time.time()
    agent = RiskAgent()
    agent_reasoning = agent.run(profile, profile_type, portfolios)
    yield _sse("agent", {
        "index": 5, "name": AGENT_STEPS[5]["name"], "status": "done",
        "ms": int((time.time() - t0) * 1000),
        "detail": f"Generated {len(agent_reasoning)} agent analyses",
    })

    # --- Final result ---
    yield _sse("result", {
        "profile_type": profile_type,
        **portfolios,
        "explanations": explanations,
        "agent_reasoning": agent_reasoning,
    })


class BuildPortfolioView(APIView):
    def post(self, request):
        data = request.data
        age = data.get("age")
        experience = data.get("experience")
        risk_tolerance = data.get("risk_tolerance")

        if not age or not isinstance(age, int) or age < 1 or age > 120:
            return Response({"error": "age must be an integer between 1 and 120"}, status=status.HTTP_400_BAD_REQUEST)
        if experience not in VALID_EXPERIENCES:
            return Response({"error": f"experience must be one of {VALID_EXPERIENCES}"}, status=status.HTTP_400_BAD_REQUEST)
        if risk_tolerance not in VALID_RISK:
            return Response({"error": f"risk_tolerance must be one of {VALID_RISK}"}, status=status.HTTP_400_BAD_REQUEST)

        response = StreamingHttpResponse(
            _run_agents_stream(data),
            content_type="text/event-stream",
        )
        response["Cache-Control"] = "no-cache"
        response["X-Accel-Buffering"] = "no"
        return response
