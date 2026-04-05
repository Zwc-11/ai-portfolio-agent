"""Investor Profile Agent — classifies user into an investor type."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class ProfileState(TypedDict):
    profile: dict
    profile_type: str


def classify(state: ProfileState) -> ProfileState:
    """Classify the investor profile into a structured type."""
    from src.core.classifier import classify_profile

    profile_type = classify_profile(state["profile"])
    return {"profile": state["profile"], "profile_type": profile_type}


class ProfileAgent:
    """LangGraph agent that classifies an investor profile."""

    def __init__(self):
        graph = StateGraph(ProfileState)
        graph.add_node("classify", classify)
        graph.set_entry_point("classify")
        graph.add_edge("classify", END)
        self.graph = graph.compile()

    def run(self, profile: dict) -> str:
        result = self.graph.invoke({"profile": profile, "profile_type": ""})
        return result["profile_type"]
