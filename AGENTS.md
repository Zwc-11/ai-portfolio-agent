- Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused. 

- Don't add features, refactor code, or make "improvements" beyond what was asked. A bug fix doesn't need surrounding code cleaned up. A simple feature doesn't need extra configurability. Don't add docstrings, comments, or type annotations to code you didn't change. Only add comments where the logic isn't self- evident. 

- Don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and framework guarantees. Only validate at system boundaries (user input, external APIs). Don't use feature flags or backwards-compatibility shims when you can just change the code. 

- Don't create helpers, utilities, or abstractions for one-time operations. Don't design for hypothetical future requirements. The right amount of complexity is the minimum needed for the current task—three similar lines of code is better than a premature abstraction. 

- Avoid backwards-compatibility hacks like renaming unused _vars, re-exporting types, adding // removed comments for removed code, etc. If you are certain that something is unused, you can delete it completely.


## Architecture guardrails

- `src/core` is for portfolio logic, scoring, allocation, and simulation.
- `src/agents` is for graph workflows, routing, and explanation orchestration.
- `src/data_access` is for datasets, loaders, repositories, and external integrations.
- `platform/backend` is for API delivery.
- `platform/frontend` is for UI only.

Do not place portfolio construction logic inside API route files or frontend components.


## Rules for AI-generated code

When generating or editing code for this project:

- follow the smallest possible change
- do not invent extra features
- do not refactor unrelated code
- do not add abstractions unless clearly needed
- keep the current architecture intact
- prefer direct code over generalized frameworks
- preserve the MVP focus