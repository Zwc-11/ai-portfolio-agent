"""Build base, safer, and higher-return portfolio variants."""

from src.data_access.assets import ASSET_UNIVERSE

PROFILES = {
    "young_beginner": {
        "base": {"VOO": 30, "QQQ": 25, "SCHD": 15, "MSFT": 10, "AAPL": 10, "VXUS": 10},
        "safer": {"VOO": 40, "SCHD": 25, "VXUS": 20, "BRK-B": 10, "COST": 5},
        "higher": {"QQQ": 30, "NVDA": 20, "MSFT": 15, "AAPL": 15, "VOO": 20},
    },
    "conservative": {
        "base": {"VOO": 35, "SCHD": 25, "VXUS": 20, "BRK-B": 10, "COST": 10},
        "safer": {"SCHD": 30, "VOO": 30, "VXUS": 25, "BRK-B": 10, "COST": 5},
        "higher": {"VOO": 30, "QQQ": 20, "SCHD": 20, "MSFT": 15, "VXUS": 15},
    },
    "balanced": {
        "base": {"VOO": 25, "QQQ": 20, "SCHD": 15, "VXUS": 15, "MSFT": 10, "AAPL": 10, "BRK-B": 5},
        "safer": {"VOO": 35, "SCHD": 25, "VXUS": 20, "BRK-B": 10, "COST": 10},
        "higher": {"QQQ": 25, "NVDA": 15, "MSFT": 15, "AAPL": 15, "VOO": 20, "SPY": 10},
    },
    "aggressive": {
        "base": {"QQQ": 25, "NVDA": 15, "MSFT": 15, "AAPL": 15, "VOO": 15, "SPY": 15},
        "safer": {"VOO": 30, "QQQ": 20, "SCHD": 20, "VXUS": 15, "MSFT": 15},
        "higher": {"NVDA": 25, "QQQ": 25, "MSFT": 15, "AAPL": 15, "SPY": 20},
    },
}


def build_portfolio(profile_type):
    templates = PROFILES.get(profile_type, PROFILES["balanced"])

    def enrich(allocations):
        return [
            {"ticker": ticker, "weight": weight, "name": ASSET_UNIVERSE.get(ticker, {}).get("name", ticker)}
            for ticker, weight in allocations.items()
        ]

    return {
        "profile_type": profile_type,
        "base": enrich(templates["base"]),
        "safer": enrich(templates["safer"]),
        "higher": enrich(templates["higher"]),
    }
