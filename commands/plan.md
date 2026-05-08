# /plan

Use this command to create an implementation plan for medium-risk or high-risk work.

Do not modify code unless the user explicitly asks for planning plus implementation and the task does not require an approval gate.

## Process

1. Read project-level instructions.
2. Inspect relevant files.
3. Understand current behavior.
4. Define scope and non-goals.
5. Define success criteria.
6. Define verification strategy.
7. Identify risks and approval gates.
8. Propose implementation steps.

## Output

```markdown
## Goal

## Risk

## Scope

## Non-Goals

## Plan

## Success Criteria

## Verification

## Approval Gates

## Open Questions
```

## Rules

- Keep the plan proportional to task risk.
- Do not invent requirements.
- Do not introduce new dependencies without justification.
- Do not propose broad refactors unless necessary.
- For high-risk work, stop after the plan and wait for approval.

## Underlying skills

This command wraps:

- `skills/superpowers.md` for implementation planning, risk control, verification design, and scope management.
- `skills/matt-pocock.md` for TypeScript-aware planning when applicable.

The plan must respect existing project conventions and must not introduce new tools without approval.
