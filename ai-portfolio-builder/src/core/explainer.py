"""Generate short explanations for portfolio variants."""

EXPLANATIONS = {
    "young_beginner": {
        "base": "A growth-oriented mix of broad index funds and top tech names. As a young investor with time on your side, this captures long-term market growth while keeping things simple.",
        "safer": "Shifted toward broad index funds and dividend payers. Lower concentration in individual stocks means less volatility while still growing steadily.",
        "higher": "Heavier tech and growth exposure. More volatile short-term, but your long time horizon lets you ride out dips for potentially higher returns.",
    },
    "conservative": {
        "base": "A stability-first portfolio with dividend-paying ETFs and established value names. Designed for steady income with moderate growth.",
        "safer": "Even more emphasis on dividends and broad diversification. This minimizes drawdowns at the cost of slower growth.",
        "higher": "Added growth ETFs while keeping a stable core. A step up in return potential without abandoning the conservative foundation.",
    },
    "balanced": {
        "base": "A diversified blend of growth and value across U.S. and international markets. Balances upside potential with reasonable risk management.",
        "safer": "Tilted toward stable index funds and dividend payers. Smoother ride with slightly lower expected returns.",
        "higher": "More weight in growth-oriented holdings. Accepts more short-term swings in pursuit of better long-term performance.",
    },
    "aggressive": {
        "base": "A growth-heavy portfolio concentrated in tech leaders and broad market indexes. Suited for investors comfortable with higher volatility.",
        "safer": "Pulled back on individual stock concentration and added dividend exposure. Still growth-oriented but with guardrails.",
        "higher": "Maximum growth tilt with heavy tech exposure. Highest return potential but expect significant short-term swings.",
    },
}


def explain_portfolios(profile_type):
    return EXPLANATIONS.get(profile_type, EXPLANATIONS["balanced"])
