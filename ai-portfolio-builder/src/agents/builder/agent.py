"""Portfolio Builder Agent — constructs portfolio allocations."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class BuilderState(TypedDict):
    profile_type: str
    portfolios: dict


def build(state: BuilderState) -> BuilderState:
    """Build base, safer, and higher-return portfolio variants."""
    from src.core.portfolio_builder import build_portfolio

    portfolios = build_portfolio(state["profile_type"])
    return {"profile_type": state["profile_type"], "portfolios": portfolios}


class BuilderAgent:
    """LangGraph agent that builds portfolio allocations."""

    def __init__(self):
        graph = StateGraph(BuilderState)
        graph.add_node("build", build)
        graph.set_entry_point("build")
        graph.add_edge("build", END)
        self.graph = graph.compile()

    def run(self, profile_type: str) -> dict:
        result = self.graph.invoke({"profile_type": profile_type, "portfolios": {}})
        return result["portfolios"]
