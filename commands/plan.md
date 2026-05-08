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

## Required external skills

Primary: `superpowers:writing-plans`

Optional:

- `mattpocock:grill-with-docs` — only for docs or domain language validation of the plan.
- `mattpocock:improve-codebase-architecture` — only for frontend architecture plans.
- `mattpocock:prototype` — only if a throwaway prototype is needed before finalizing the plan.

Do not default to `superpowers:brainstorming`. If the goal is still unclear, route back to `/think`. If project context is missing, route back to `/start`.
The plan must respect existing project conventions and must not introduce new tools without approval.
This command does not rewrite, copy, simulate, fake, or substitute for external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
