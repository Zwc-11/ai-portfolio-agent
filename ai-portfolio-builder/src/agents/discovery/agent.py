"""Asset Discovery Agent — screens asset universe for candidates."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class DiscoveryState(TypedDict):
    profile_type: str
    candidates: list


def discover(state: DiscoveryState) -> DiscoveryState:
    """Screen the asset universe and return candidate tickers."""
    from src.data_access.assets import ASSET_UNIVERSE

    # For MVP, return all assets as candidates
    candidates = [
        {"ticker": ticker, **info}
        for ticker, info in ASSET_UNIVERSE.items()
    ]
    return {"profile_type": state["profile_type"], "candidates": candidates}


class DiscoveryAgent:
    """LangGraph agent that discovers candidate assets."""

    def __init__(self):
        graph = StateGraph(DiscoveryState)
        graph.add_node("discover", discover)
        graph.set_entry_point("discover")
        graph.add_edge("discover", END)
        self.graph = graph.compile()

    def run(self, profile_type: str) -> list:
        result = self.graph.invoke({"profile_type": profile_type, "candidates": []})
        return result["candidates"]
