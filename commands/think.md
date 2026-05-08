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

This command prioritizes using installed external skills:

- **Superpowers** for structured problem framing, risk classification, assumptions, and success criteria.
- **Matt Pocock skills** when the task involves TypeScript, JavaScript, React, frontend architecture, API typing, or type-level design/debugging/verification.

This command does not rewrite, copy, simulate, fake, or substitute for these external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
