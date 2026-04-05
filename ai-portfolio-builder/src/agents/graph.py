"""Main advisor graph — orchestrates all agent nodes in sequence."""

from typing import TypedDict
from langgraph.graph import StateGraph, END


class AdvisorState(TypedDict):
    profile: dict
    profile_type: str
    candidates: list
    suitable: list
    portfolios: dict
    explanations: dict
    agent_reasoning: list


def classify_node(state: AdvisorState) -> dict:
    from src.agents.profile import ProfileAgent
    agent = ProfileAgent()
    profile_type = agent.run(state["profile"])
    return {"profile_type": profile_type}


def discover_node(state: AdvisorState) -> dict:
    from src.agents.discovery import DiscoveryAgent
    agent = DiscoveryAgent()
    candidates = agent.run(state["profile_type"])
    return {"candidates": candidates}


def filter_node(state: AdvisorState) -> dict:
    from src.agents.filtering import FilteringAgent
    agent = FilteringAgent()
    suitable = agent.run(state["profile_type"], state["candidates"])
    return {"suitable": suitable}


def build_node(state: AdvisorState) -> dict:
    from src.agents.builder import BuilderAgent
    agent = BuilderAgent()
    portfolios = agent.run(state["profile_type"])
    return {"portfolios": portfolios}


def simulate_node(state: AdvisorState) -> dict:
    from src.agents.simulator import SimulatorAgent
    agent = SimulatorAgent()
    explanations = agent.run(state["profile_type"], state["portfolios"])
    return {"explanations": explanations}


def risk_node(state: AdvisorState) -> dict:
    from src.agents.risk import RiskAgent
    agent = RiskAgent()
    reasoning = agent.run(state["profile"], state["profile_type"], state["portfolios"])
    return {"agent_reasoning": reasoning}


def create_advisor_graph():
    """Create the full advisor pipeline graph."""
    graph = StateGraph(AdvisorState)

    graph.add_node("classify", classify_node)
    graph.add_node("discover", discover_node)
    graph.add_node("filter", filter_node)
    graph.add_node("build", build_node)
    graph.add_node("simulate", simulate_node)
    graph.add_node("risk", risk_node)

    graph.set_entry_point("classify")
    graph.add_edge("classify", "discover")
    graph.add_edge("discover", "filter")
    graph.add_edge("filter", "build")
    graph.add_edge("build", "simulate")
    graph.add_edge("simulate", "risk")
    graph.add_edge("risk", END)

    return graph.compile()
