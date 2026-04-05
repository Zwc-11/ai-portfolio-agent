"""
=============================================================
  Activity 1: ANSWER KEY — Build Your Investor Profile
  ----------------------------------------------------
  Complete working version with all TODOs filled in.
=============================================================
"""

import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()  # loads .env file automatically

from classifier import classify_profile

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/analyze", methods=["POST"])
def analyze():
    """Receive the profile form data and return the classification + AI analysis."""
    data = request.get_json()

    # ─── TODO 1 ANSWER: Extract profile fields ────────────────────
    age = int(data.get("age", 30))
    experience = data.get("experience", "beginner")
    risk_tolerance = data.get("risk_tolerance", "medium")
    goal = data.get("goal", "long_term_growth")
    time_horizon = data.get("time_horizon", "5+")
    # ──────────────────────────────────────────────────────────────

    profile = {
        "age": age,
        "experience": experience,
        "risk_tolerance": risk_tolerance,
        "goal": goal,
        "time_horizon": time_horizon,
    }

    # Classify the profile using the classifier
    profile_type = classify_profile(profile)

    # Generate AI analysis (uses Claude API — needs ANTHROPIC_API_KEY env var)
    ai_analysis = generate_ai_analysis(profile, profile_type)

    return jsonify({
        "profile_type": profile_type,
        "ai_analysis": ai_analysis,
    })


def generate_ai_analysis(profile, profile_type):
    """Call Claude to generate a personalized investor analysis."""
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return "Set ANTHROPIC_API_KEY environment variable to enable AI analysis."

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)

        prompt = f"""You are a friendly AI investment advisor analyzing a new investor's profile.

Profile:
- Age: {profile.get('age')}
- Experience: {profile.get('experience')}
- Risk Tolerance: {profile.get('risk_tolerance')}
- Investment Goal: {profile.get('goal')}
- Time Horizon: {profile.get('time_horizon')}

Classification: {profile_type}

Write a short (3-4 sentence) personalized analysis of this investor. Be specific about what their profile means for investing. Mention what types of investments might suit them and why. Be encouraging but honest about risks."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text.strip()
    except Exception as e:
        return f"AI analysis unavailable: {e}"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
