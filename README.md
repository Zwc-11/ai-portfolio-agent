# AI Portfolio Builder and Investment Simulator

This repository contains the foundation for an **AI Portfolio Builder and Investment Simulator**.

The goal of this project is to build a real AI investing product that goes beyond a simple chatbot. Instead of only answering finance questions, the system is designed to understand a user’s investor profile, research possible assets, filter what fits, construct a mock portfolio, simulate safer and higher return alternatives, explain the tradeoffs, and eventually support visible discussion between specialized AI subagents.

This project is also designed as the core build for a live course where students gradually create the system step by step. The repository is intentionally structured so it can support both a clean MVP and future classroom expansion.

## Project Vision

A beginner investor often has questions like these:

- I want to start investing. What kind of portfolio makes sense for me?
- What if I want more return?
- What if I want something safer?
- Why is one portfolio riskier than another?
- Why did the system choose these assets?
- What would a more quality-focused or growth-focused version look like?

A normal chatbot may answer these questions one at a time, but it usually does not behave like a real product. This project is meant to go further.

The long term goal is to create an AI advisor experience that can:

- understand the user deeply
- research real assets
- screen them for suitability
- build structured portfolio outputs
- simulate different allocation paths
- explain tradeoffs clearly
- show how different AI perspectives react to a portfolio
- support follow-up refinement through chat

## What Makes This Different From a Chatbot

A normal finance chatbot usually gives one answer.

This project is meant to behave more like a system.

Instead of only producing text, it should follow a workflow:

1. understand the user
2. research candidate assets
3. filter what fits
4. build a portfolio
5. simulate alternatives
6. explain tradeoffs
7. let specialized agents discuss the result
8. support follow-up adjustments

The product should feel closer to a digital wealth advisory workflow than a one-shot prompt.

## Core Product Experience

The final experience is designed around one main user flow:

1. The user enters their investor profile
2. The system turns that into a structured investor type
3. The system gathers and screens possible assets
4. The system builds a base portfolio with specific tickers and weights
5. The system creates safer and higher return versions
6. The system explains why those versions differ
7. The system optionally shows AI discussion and style-based overlays
8. The user continues refining the result through follow-up chat

## Product Direction

The final product is not intended to be a random stock picker.

It is meant to be a structured **portfolio building and simulation tool** for educational and product-building purposes.

The product should help users explore questions such as:

- what fits me right now?
- what happens if I want more return?
- what if I need less risk?
- what if I prefer ETFs only?
- what if I want a more quality-focused or growth-focused portfolio?
- what are the tradeoffs between these choices?

## Current Scope

This repository is being built in stages.

The current focus is the **Minimal MVP**, which is a small but complete vertical slice of the product.

The Minimal MVP is designed to prove the core experience:

- collect a user profile
- classify the user into a structured investor type
- generate a base portfolio with specific assets
- generate a safer version
- generate a higher return version
- explain what changed

The MVP is intentionally limited so that the product stays clean, teachable, and extensible.

## Long Term System Overview

The final project is designed around one **Main Advisor Agent** and a set of specialized subagents.

### Main Advisor Agent
The top-level agent the user interacts with. It receives the request, coordinates the subagents, combines their outputs, and returns the final response.

### Investor Profile Agent
Turns user inputs such as age, experience level, time horizon, goals, constraints, and risk preferences into a structured investor profile.

### Asset Discovery Agent
Gathers candidate stocks, ETFs, and later other asset classes from APIs or data sources, along with useful research information.

### Asset Filtering and Suitability Agent
Screens discovered assets and determines which ones are actually appropriate for the user.

### Portfolio Builder Agent
Constructs the base portfolio using specific assets and weights.

### Portfolio Simulator Agent
Generates alternative versions of the portfolio, such as safer, higher return, more ETF-focused, or more growth-focused versions.

### Risk and Tradeoff Explanation Agent
Explains why one version is safer, why another one is more aggressive, and what the user is gaining or giving up.

### Discussion Agents
Visible agents such as a Bull Analyst, Bear Analyst, and Risk Manager add an engaging discussion layer and help users see different perspectives on the portfolio.

### Legendary Investor Style Agent
Applies or comments on a portfolio through a style lens such as Buffett-style, Graham-style, growth-style, or conservative style.

### Investing Tutor and Knowledge Agent
Provides educational explanations for investing concepts in a clear and simple way.

## Full Workflow

The full project workflow looks like this:

1. User enters profile information
2. Investor Profile Agent classifies the user
3. Asset Discovery Agent gathers candidate assets and research data
4. Asset Filtering and Suitability Agent screens the candidates
5. Portfolio Builder Agent constructs the base portfolio
6. Portfolio Simulator Agent creates alternative portfolio versions
7. Risk and Tradeoff Explanation Agent explains the differences
8. Discussion Agents react to the proposal
9. Legendary Investor Style Agent optionally adjusts or comments on the portfolio
10. Main Advisor Agent combines everything into a final response
11. User follow-up chat triggers further adjustments or explanations

## UI Direction

The final product should feel like a real AI investing workspace.

A strong interface direction is:

### Investor Profile Panel
Where the user enters profile and onboarding information

### Portfolio Results Area
Where the system shows:
- Base Portfolio
- Safer Version
- Higher Return Version
- optional Style Version

Each result should show:
- specific tickers
- weights
- risk level
- short explanation
- simple visual allocation breakdown

### Tradeoff Summary Area
Where the product explains the key differences between portfolio versions

### Discussion Panel
Where visible subagents such as Bull Analyst, Bear Analyst, and Risk Manager comment on the portfolio

### Follow-up Chat
Where the user can ask:
- make it safer
- make it more aggressive
- explain why you chose this asset
- compare two versions
- show me a Buffett-style version

## Richer User Profile Direction

The long term product should collect a much richer investor profile than a simple form.

Future profile layers may include:

### Personal Information
- age
- country or region
- employment status
- investing experience

### Financial Snapshot
- annual income range
- investable assets range
- cash available to invest
- emergency fund status
- debt level
- monthly savings ability

### Investment Goals
- primary goal
- secondary goal
- target amount
- target date
- time horizon

### Risk Profile
- risk tolerance
- reaction to market drawdowns
- liquidity needs
- comfort with volatility
- risk capacity vs risk preference

### Portfolio Preferences
- ETFs only or stocks allowed
- crypto allowed or not
- U.S. only or global exposure
- dividend preference
- growth vs stability preference
- sector preferences
- concentration limits
- exclusion preferences

### Behavior and Style
- passive vs active
- simple vs detailed portfolio
- preferred investor style
- confidence level in investing knowledge

The MVP does not need all of these active at once, but the system should leave room for this direction.

## Repository Structure

```text
ai-portfolio-builder/
├── README.md
├── AGENTS.md
├── docs/
├── data/
├── src/
│   ├── core/
│   ├── agents/
│   └── data_access/
├── platform/
│   ├── backend/
│   └── frontend/
├── tests/
└── scripts/