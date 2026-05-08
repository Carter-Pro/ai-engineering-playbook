# /start

Use this command to initialize a new project, new repository, new conversation, or resumed context.

The model should learn the project before thinking, planning, or implementing.

## Process

1. Inspect project structure and identify key directories.
2. Locate and read project-level `CLAUDE.md`, `CONTEXT.md`, or equivalent instruction files.
3. Identify available commands and project conventions.
4. Identify external skill dependencies and their applicability.
5. Detect verification commands, test suites, and runbooks.
6. Summarize findings and recommend safe next steps.

## Rules

- Do not implement, verify, release, or create plans by default.
- Do not install skills or create adapters.
- Report what was found and what is missing.

## Required external skills

Primary: None

Optional:

- `mattpocock:zoom-out` — only for TypeScript, JavaScript, React, or frontend codebase orientation.
- `mattpocock:grill-with-docs` — only when project docs or domain language must challenge the model's understanding of the project.

Matt Pocock skills apply only to TypeScript, JavaScript, React, frontend architecture, API typing, or type-level design/debugging/verification tasks.

Do not force a Matt Pocock skill if the project is not in that domain.

This command does not rewrite, copy, simulate, fake, or substitute for external skills.

If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
