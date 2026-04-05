"""Portfolio Simulator Agent — generates and explains portfolio variants."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class SimulatorState(TypedDict):
    profile_type: str
    portfolios: dict
    explanations: dict


def simulate(state: SimulatorState) -> SimulatorState:
    """Generate explanations for portfolio variants."""
    from src.core.explainer import explain_portfolios

    explanations = explain_portfolios(state["profile_type"])
    return {**state, "explanations": explanations}


class SimulatorAgent:
    """LangGraph agent that simulates and explains portfolio variants."""

    def __init__(self):
        graph = StateGraph(SimulatorState)
        graph.add_node("simulate", simulate)
        graph.set_entry_point("simulate")
        graph.add_edge("simulate", END)
        self.graph = graph.compile()

    def run(self, profile_type: str, portfolios: dict) -> dict:
        result = self.graph.invoke({
            "profile_type": profile_type,
            "portfolios": portfolios,
            "explanations": {},
        })
        return result["explanations"]
