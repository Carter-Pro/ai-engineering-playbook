# AI Engineering Playbook

This repository defines my personal AI engineering workflow standard for software projects.

It currently uses Claude Code compatible files as the practical standard, but it is not intended to be Claude Code-only. Other AI coding agents may reuse or adapt the same `CLAUDE.md`, `commands/`, and `templates/` structure.

It is project-agnostic. It defines how an AI coding agent should reason, classify risk, ask for approval, create issues, manage branches, commit work, open PRs, verify changes, and handle releases.

Project-specific details such as build commands, test commands, architecture notes, framework conventions, deployment targets, secrets, signing, and release procedures must live in the target project's `CLAUDE.md`, `CONTEXT.md`, or runbooks.

## Principles

1. **Strict boundaries, lightweight execution**  
   Low-risk tasks move quickly. Medium-risk tasks follow a standard workflow. High-risk and release tasks require approval at the right checkpoints.

2. **Think before changing**  
   Classify risk before acting. State assumptions when needed. Do not silently choose risky interpretations.

3. **Simplicity first**  
   Prefer the smallest change that satisfies the goal. Avoid speculative abstractions and unrelated refactors.

4. **Surgical changes**  
   Every changed line should trace back to the user request, approved plan, diagnosis, or verification need.

5. **Goal-driven execution**  
   Define success criteria for non-trivial work. Verify before reporting completion.

## Files

- `README.md` — repository overview and usage guide.
- `CLAUDE.md` — global operating rules for runtime use.
- `commands/*.md` — slash command or agent command workflows.
- `templates/project-CLAUDE.md` — template for project-level agent rules.
- `templates/CONTEXT.md` — template for project background and engineering context.
- `docs/source-standard.md` — the full source standard used to generate this repository.

## Usage Policy

This repository should be reviewed before installation.

First generation pass:

1. Generate repository content only.
2. Do not install to `~/.claude/`.
3. Do not modify system-level configuration.
4. Review `CLAUDE.md`, `commands/*.md`, and templates before using them globally.

Post-review installation may copy the runtime files to `~/.claude/` only after explicit user approval and backup of existing local configuration.

## Commands

- `/think` — classify risk and choose workflow.
- `/plan` — create implementation plan.
- `/implement` — execute a clear plan.
- `/fix` — reproduce, diagnose, and fix bugs.
- `/verify` — verify current changes.
- `/pr` — prepare commit and open PR.
- `/finish` — handle CI, review, merge decision, cleanup.
- `/release <version>` — run explicit release workflow.
