# Demo MVP: AI Portfolio Builder and Investment Simulator

This demo is the first working MVP of the **AI Portfolio Builder and Investment Simulator**.

Its purpose is to show the core product idea in a small but believable way.

The final project will grow into a much richer AI wealth advisor experience with multiple subagents, deeper user understanding, richer data, portfolio simulation, visible discussion between specialized agents, and guided follow-up chat.

This demo is the first vertical slice of that system.

## Demo Goal

The goal of this MVP is to prove that the product can already do something more meaningful than a normal finance chatbot.

Instead of only answering investing questions, the system should:

- understand a user profile
- build a mock portfolio using specific assets
- generate alternative portfolio versions
- explain the tradeoffs between them

This makes the demo feel like a product, not just a prompt.

## What This Demo Should Show

The MVP should demonstrate one complete user flow from start to finish:

1. the user enters their investor profile
2. the system interprets the profile
3. the system builds a base portfolio
4. the system generates a safer version
5. the system generates a higher return version
6. the system explains what changed and why

That is the full demo scope.

## Demo User Story

Example user:

- age: 25
- experience: beginner
- time horizon: 5+ years
- risk tolerance: medium
- goal: long term growth
- preference: growth

Expected system output:

### Base Portfolio
A beginner-friendly base portfolio with specific tickers and weights

### Safer Version
A version with lower concentration and lower risk

### Higher Return Version
A version with more growth exposure and more volatility

### Explanation
A short and clear explanation of why the portfolios differ

## Expanded Profile Direction

Even though this demo is still an MVP, the product direction is already moving toward a much richer investor intake experience.

The final project should eventually collect more wealth-management-style information, such as:

- personal background
- financial snapshot
- annual income range
- investable amount
- emergency fund status
- debt level
- investment goals
- target time horizon
- risk tolerance
- risk capacity
- portfolio constraints
- asset class preferences
- investing style preferences

For this first demo, only a smaller subset needs to be active, but the design should leave space for this future direction.

## Demo Scope

This MVP includes:

- investor profile form
- profile classification logic
- starter asset universe
- base portfolio generation
- safer version generation
- higher return version generation
- simple tradeoff explanation
- basic portfolio results interface

This MVP does not yet include:

- full live debate between subagents
- full legendary investor style overlays
- advanced compare mode
- investing tutor mode
- knowledge retrieval
- full follow-up advisor chat
- historical backtesting pipeline
- broader market intelligence views

Those are part of the larger roadmap.

## Demo Workflow

The MVP follows this workflow:

1. collect user profile input
2. classify the investor profile
3. choose a base portfolio structure
4. map that structure to specific assets
5. generate a safer version
6. generate a higher return version
7. show portfolio results and short explanations

## Product Logic in This Demo

This demo should not behave like a random stock picker.

Instead, it should follow a structured process:

### Investor Profile
The system reads the user’s:
- age
- experience
- time horizon
- risk tolerance
- goal
- preference

### Profile Classification
The system maps the user to a structured profile type, such as:
- beginner conservative
- beginner balanced
- beginner growth

### Portfolio Construction
The system uses a starter asset universe and builds a base portfolio with specific tickers and weights.

### Portfolio Simulation
The system modifies the base version to create:
- a safer version
- a higher return version

### Explanation
The system explains what changed between the portfolio versions and why.

## Demo Asset Universe

A small starter asset universe is enough for this MVP.

Example assets:

- VOO
- SPY
- VT
- QQQ
- VXUS
- SCHD
- VTI
- AAPL
- MSFT
- BRK.B
- COST
- AMZN
- NVDA

The goal is not to cover the full market yet.
The goal is to create a believable and useful beginner portfolio experience.

## Suggested UI for the Demo

The demo interface should already feel like the beginning of a real AI investing product.

### Recommended interface sections

#### 1. Investor Profile Panel
A form where the user enters their profile

#### 2. Portfolio Results Area
Cards for:
- Base Portfolio
- Safer Version
- Higher Return Version

Each result card should show:
- portfolio title
- specific tickers
- weight percentages
- risk label
- short explanation

#### 3. Tradeoff Summary
A section that explains the key differences between portfolio versions

### Optional future-facing section
A placeholder panel for:
- advisor discussion
- follow-up chat
- investor-style overlays

This does not need to be fully active in the first demo, but the layout can leave room for it.

## Backend Scope

The demo only needs one main API route.

Example:

`POST /build-portfolio`

The response should include:

- profile type
- base portfolio
- safer version
- higher return version
- explanation text

That is enough for the first demo.

## Why This Demo Matters

This MVP is important because it gives the whole course a real starting point.

Students will be able to see from the first class that the product already works end to end, even if it is still simple.

That creates a strong foundation for the rest of the course, where each class adds more depth and intelligence to the system.

## Relationship to the Full Course Project

This demo is only the first slice of the full system.

The complete course project will later add:

- richer investor profile understanding
- asset discovery from APIs
- asset filtering and suitability logic
- visible discussion agents such as Bull Analyst, Bear Analyst, and Risk Manager
- legendary investor style adjustments
- main advisor orchestration
- guided follow-up chat
- more polished portfolio comparison and explanation

The long term goal is to build an AI system that feels much closer to a digital wealth advisory platform than a simple chatbot.

## Note

This demo is for educational and product-building purposes only.

All portfolios and examples are simulated and do not constitute real financial advice.