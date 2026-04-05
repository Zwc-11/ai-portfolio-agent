"""Asset Filtering Agent — narrows candidates to suitable assets."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class FilteringState(TypedDict):
    profile_type: str
    candidates: list
    suitable: list


PROFILE_FILTERS = {
    "young_beginner": {"categories": ["broad_market", "growth", "tech", "international", "dividend"]},
    "conservative": {"categories": ["broad_market", "dividend", "value", "international", "consumer"]},
    "balanced": {"categories": ["broad_market", "growth", "dividend", "international", "tech", "value"]},
    "aggressive": {"categories": ["growth", "tech", "broad_market"]},
}


def filter_assets(state: FilteringState) -> FilteringState:
    """Filter candidates based on profile type suitability."""
    profile_type = state["profile_type"]
    allowed = PROFILE_FILTERS.get(profile_type, PROFILE_FILTERS["balanced"])["categories"]
    suitable = [c for c in state["candidates"] if c.get("category") in allowed]
    return {**state, "suitable": suitable}


class FilteringAgent:
    """LangGraph agent that filters assets for suitability."""

    def __init__(self):
        graph = StateGraph(FilteringState)
        graph.add_node("filter", filter_assets)
        graph.set_entry_point("filter")
        graph.add_edge("filter", END)
        self.graph = graph.compile()

    def run(self, profile_type: str, candidates: list) -> list:
        result = self.graph.invoke({
            "profile_type": profile_type,
            "candidates": candidates,
            "suitable": [],
        })
        return result["suitable"]
