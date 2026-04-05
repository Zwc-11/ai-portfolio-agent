"""
=============================================================
  Investor Profile Classifier — ANSWER KEY
=============================================================
"""


def classify_profile(profile):
    age = profile.get("age", 30)
    experience = profile.get("experience", "beginner")
    risk_tolerance = profile.get("risk_tolerance", "medium")
    goal = profile.get("goal", "long_term_growth")

    # ─── TODO 2 ANSWER: Classification rules ──────────────────────
    if experience == "beginner" and age < 25:
        return "young_beginner"

    if risk_tolerance in ("low", "very_low") or goal == "preservation":
        return "conservative"

    if risk_tolerance in ("high", "very_high") or goal == "aggressive_growth":
        return "aggressive"

    return "balanced"
    # ──────────────────────────────────────────────────────────────
