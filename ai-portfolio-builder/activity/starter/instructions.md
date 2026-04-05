# Activity 1: Build Your Investor Profile

## What You're Building

A web app where you fill in an investor profile (age, experience, risk tolerance, etc.) and an **AI agent analyzes who you are** as an investor.

You'll complete **2 TODOs** across 2 Python files to make it work.

---

## Setup (One Time)

### 1. Install dependencies

Open a terminal, navigate to this folder, and run:

```
pip install -r requirements.txt
```

> If `pip` doesn't work, try `pip3 install -r requirements.txt`

This installs Flask (web framework), Anthropic (AI), and python-dotenv (loads API key).

### 2. Set up your API key

Copy `.env.example` to `.env`:

**Windows (Command Prompt):**
```
copy .env.example .env
```

**Windows (PowerShell):**
```
Copy-Item .env.example .env
```

**Mac / Linux:**
```
cp .env.example .env
```

Then open the `.env` file in your editor and replace `your_api_key_here` with the API key your instructor provides.

---

## Run the App

```
python app.py
```

> If `python` doesn't work, try `python3 app.py`

You should see:
```
 * Running on http://127.0.0.1:5000
```

**Keep this terminal open!** Then open **http://127.0.0.1:5000** in your browser.

> If you see "Error: Failed to fetch" in the browser, it means the server isn't running. Check your terminal.

---

## Your 2 TODOs

### TODO 1 — `app.py` (Extract profile fields)

In the `/api/analyze` route, the frontend sends a JSON object with the form data. You need to extract 5 fields from it.

Right now all 5 variables are set to `None`. Replace them like this:

```python
age = int(data.get("age", 30))
experience = data.get("experience", "beginner")
# ... and so on for risk_tolerance, goal, time_horizon
```

### TODO 2 — `classifier.py` (Write classification rules)

Write if/elif/else rules that return one of these 4 profile types:

| Profile Type      | Rule                                                  |
|-------------------|-------------------------------------------------------|
| `young_beginner`  | experience is "beginner" **and** age < 25             |
| `conservative`    | risk_tolerance is "low" or "very_low" **or** goal is "preservation" |
| `aggressive`      | risk_tolerance is "high" or "very_high" **or** goal is "aggressive_growth" |
| `balanced`        | everything else (default)                             |

**Order matters** — check `young_beginner` first, then `conservative`, then `aggressive`, then default to `balanced`.

---

## Files Overview

```
starter/
├── app.py              ← TODO 1 (extract form fields)
├── classifier.py       ← TODO 2 (write classification rules)
├── requirements.txt    ← dependencies (already done)
├── .env                ← API key (copy from .env.example)
├── static/
│   └── style.css       ← styling (already done)
└── templates/
    └── index.html      ← form UI (already done)
```

---

## How to Test

1. Run `python app.py`
2. Open http://127.0.0.1:5000
3. Fill in the form and click **Analyze My Profile**
4. You should see your **profile type** (e.g. "Young Beginner") and a **personalized AI analysis**

If you only see "Balanced" no matter what you enter, check TODO 1 and TODO 2.
