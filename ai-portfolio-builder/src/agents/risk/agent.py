"""Risk & Tradeoff Agent — assesses risk and explains tradeoffs."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class RiskState(TypedDict):
    profile: dict
    profile_type: str
    portfolios: dict
    agent_reasoning: list


def assess(state: RiskState) -> RiskState:
    """Generate agent reasoning using Claude API."""
    from src.agents.reasoning import generate_agent_reasoning

    reasoning = generate_agent_reasoning(
        state["profile"],
        state["profile_type"],
        state["portfolios"],
    )
    return {**state, "agent_reasoning": reasoning}


class RiskAgent:
    """LangGraph agent that assesses risk and generates reasoning."""

    def __init__(self):
        graph = StateGraph(RiskState)
        graph.add_node("assess", assess)
        graph.set_entry_point("assess")
        graph.add_edge("assess", END)
        self.graph = graph.compile()

    def run(self, profile: dict, profile_type: str, portfolios: dict) -> list:
        result = self.graph.invoke({
            "profile": profile,
            "profile_type": profile_type,
            "portfolios": portfolios,
            "agent_reasoning": [],
        })
        return result["agent_reasoning"]
