# /think

Use this command to understand a task before planning or implementation.

## Process

1. Restate the user's goal briefly.
2. Classify risk as `LOW`, `MEDIUM`, `HIGH`, or `RELEASE`.
3. Explain the classification in one or two sentences.
4. Identify assumptions.
5. Identify whether an issue is required.
6. Identify whether approval is required before implementation.
7. Recommend the next command.

## Risk Rules

- Unsure between `LOW` and `MEDIUM` → `MEDIUM`.
- Unsure between `MEDIUM` and `HIGH` → `HIGH`.
- Release/deploy/publish/tag/sign/package/notarization → `RELEASE` unless only discussing.

## Output

```text
Goal:
Risk:
Workflow:
Reason:
Issue required:
Approval required:
Assumptions:
Next:
```

Ask only if ambiguity affects correctness, architecture, data, security, release, deployment, or user-visible behavior.

## Required external skills

Primary: None

Optional:

- `superpowers:brainstorming` — only for unclear goals, tradeoffs, or design exploration.
- `mattpocock:zoom-out` — only for unfamiliar TypeScript, JavaScript, React, or frontend areas.
- `mattpocock:grill-with-docs` — only when project docs or domain language must challenge understanding.
- `mattpocock:improve-codebase-architecture` — only for frontend architecture, refactorability, testability, or AI-navigability.
- `mattpocock:prototype` — only for throwaway validation of UI, state, API typing, or design assumptions.

Do not default to `superpowers:writing-plans`.

Do not force a skill if the project is not in Matt Pocock's domain.

This command does not rewrite, copy, simulate, fake, or substitute for external skills.

If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
