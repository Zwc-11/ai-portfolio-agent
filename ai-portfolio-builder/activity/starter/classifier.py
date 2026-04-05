"""
=============================================================
  Investor Profile Classifier
  ----------------------------
  TODO: Complete the classify_profile() function.

  Given a profile dict with keys:
    - age (int)
    - experience ("beginner", "intermediate", "advanced")
    - risk_tolerance ("very_low", "low", "medium", "high", "very_high")
    - goal ("preservation", "income", "long_term_growth", "aggressive_growth")
    - time_horizon ("1", "1-3", "3-5", "5+", "10+")

  Return one of these profile types:
    - "young_beginner"   → young + new to investing
    - "conservative"     → low risk or capital preservation
    - "aggressive"       → high risk or aggressive growth
    - "balanced"         → everything else (default)
=============================================================
"""



def classify_profile(profile):
    age = profile.get("age", 30)
    experience = profile.get("experience", "beginner")
    risk_tolerance = profile.get("risk_tolerance", "medium")
    goal = profile.get("goal", "long_term_growth")

    # ─── TODO 2: Write the classification rules ─────────────────
    #
    # Rule 1: If experience is "beginner" AND age < 25 → return "young_beginner"
    #
    # Rule 2: If risk_tolerance is "low" or "very_low"
    #         OR goal is "preservation" → return "conservative"
    #
    # Rule 3: If risk_tolerance is "high" or "very_high"
    #         OR goal is "aggressive_growth" → return "aggressive"
    #
    # Rule 4: Everything else → return "balanced"
    #
    # Write your if/elif/else chain below:
    # -----------------------------------------------------------------
    return "balanced"  # TODO: replace this with your rules
    # ─── END TODO 2 ──────────────────────────────────────────────


