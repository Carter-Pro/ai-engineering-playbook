# Project Claude Code Instructions

This file contains project-specific instructions for Claude Code.

It extends the personal global Claude Code standard. If there is a conflict, follow the stricter rule.

## Project Overview

<!-- Describe what this project does. -->

## Tech Stack

<!-- Languages, frameworks, package managers, platforms. -->

## Repository Structure

```text
<!-- Add important directories and their purpose. -->
```

## Rule Priority

Project-level rules are more specific than the personal global standard and take precedence. However, project-level rules must not bypass:

- Explicit user instructions
- Safety boundaries
- Approval gates
- Release gates

## Common Commands

Use these project-defined commands for verification and development:

```bash
# Build
# Test
# Lint
# Format
# CI-equivalent check
# Package
```

## Workflow Entrypoints

Claude Code commands live in:

```text
.claude/commands/
```

Recommended flow:

- `/think` for task classification.
- `/plan` for medium/high-risk planning.
- `/implement` for implementation.
- `/fix` for bug fixes.
- `/verify` for verification.
- `/pr` for PR creation.
- `/finish` for PR completion.
- `/release <version>` for explicit releases.

## Risk Notes

High-risk areas in this project:

- <!-- e.g. auth, payment, database migrations, signing, deployment -->

Files or directories requiring extra care:

```text
<!-- Add paths -->
```

## Testing Policy

<!-- Explain unit/integration/e2e split and what must be run before PR. -->

## CI/CD Policy

<!-- Explain CI workflows and which changes require approval. -->

## Release Policy

Default: do not release automatically.

Release runbook:

```text
docs/runbooks/release.md
```

Claude Code may run release only when the user explicitly provides a version or release target.

## Dependency Policy

<!-- Explain when dependencies can be added or upgraded. -->

## Code Style

<!-- Project-specific naming, formatting, architecture, and style rules. -->

## Known Pitfalls

<!-- Document flaky tests, external tools, local environment requirements, CI differences. -->

## External Skill Dependencies

This project may rely on external skills already installed in the user's Claude Code environment.

Do not vendor, copy, reimplement, simulate, or fake external skills in this project.

If external skills are unavailable, fall back to the generic safe workflow defined by the global standard and this project's local rules.
