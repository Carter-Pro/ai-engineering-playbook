# AI Engineering Playbook

## What this repository is

This repository is a personal AI engineering playbook.

It provides a Claude Code-compatible global workflow structure, including:

- `CLAUDE.md` — global operating rules and safety boundaries
- `commands/` — user-facing workflow commands that wrap external skills
- `dependencies/` — documents external skill dependencies (this repo does not vendor them)
- `templates/` — reusable project-level context templates
- `docs/` — source standard and design notes

The key design principle is:

> Commands are the user interface. External skills are the underlying methodology.

Users should normally invoke commands, not external skill names directly.

It currently uses Claude Code compatible files as the practical standard, but it is not intended to be Claude Code-only. Other AI coding agents may reuse or adapt the same `CLAUDE.md`, `commands/`, `dependencies/`, and `templates/` structure.

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
- `commands/*.md` — user-facing slash command or agent command workflows.
- `dependencies/` — documents external skill dependencies; this repo does not vendor or reimplement them.
- `templates/project-CLAUDE.md` — template for project-level agent rules.
- `templates/CONTEXT.md` — template for project background and engineering context.
- `docs/source-standard.md` — the full source standard used to generate this repository.

## External skill dependencies

This repository assumes the following external skills are already installed and available in the user's Claude Code environment:

- **Superpowers** — agent methodology skills (thinking, planning, debugging, verification, release discipline)
- **Matt Pocock skills** — TypeScript, JavaScript, React, frontend architecture, API typing, and type-level methodology skills

This repository does **not** vendor, copy, reimplement, simulate, or fake these skills.

`commands/` are workflow wrappers that use these installed skills. They do not duplicate the skill content.

The relationship is:

```text
commands/       personal workflow entry points (what you call)
external        installed skills in the user environment (how it works)
dependencies/   documents the dependency relationship (no code, no adapters)
```

If the external skills are not installed, `commands/` degrades to the generic safe workflow defined in `CLAUDE.md`.

External skills must not override explicit user instructions, project-level `CLAUDE.md`, safety rules, or this repository's rules.

## Installation

This repository is the source of truth for the personal AI engineering playbook.

Do not install directly into `~/.claude/` until the repository content has been reviewed and approved.

Recommended flow:

1. Generate or update this repository.
2. Commit changes to Git.
3. Push to GitHub.
4. Review the repository content.
5. Only after approval, back up the existing local Claude Code configuration.
6. Install selected files into `~/.claude/`.

Target installation layout after approval:

```text
~/.claude/
  CLAUDE.md
  commands/
  dependencies/
  templates/
```

Before installation, always create a backup of the existing local config:

```bash
cp -R ~/.claude ~/.claude.backup.$(date +%Y%m%d-%H%M%S)
```

Then copy files explicitly:

```bash
cp CLAUDE.md ~/.claude/CLAUDE.md
cp -R commands ~/.claude/commands
cp -R dependencies ~/.claude/dependencies
cp -R templates ~/.claude/templates
```

Do not overwrite user changes without review.

## Post-install smoke test

After installing into `~/.claude/`, start Claude Code in a test repository and run:

```text
/think classify this repository setup task
/plan create a no-op plan for reviewing the repository structure
```

Expected behavior:

- Claude Code recognizes the commands.
- `/think` classifies risk and recommends next workflow.
- `/think` does not modify files.
- `/plan` creates a plan but does not modify files.
- No dependencies are installed automatically.
- No destructive command is executed.
- If external skills are unavailable, Claude Code clearly degrades to the generic safe workflow instead of pretending they are available.

## Usage Policy

This repository should be reviewed before installation.

First generation pass:

1. Generate repository content only.
2. Do not install to `~/.claude/`.
3. Do not modify system-level configuration.
4. Review `CLAUDE.md`, `commands/*.md`, `dependencies/`, and templates before using them globally.

Post-review installation may copy the runtime files to `~/.claude/` only after explicit user approval and backup of existing local configuration.

## Commands

- `/start` — initialize project context, inspect the codebase, identify standards.
- `/think` — classify risk and choose workflow.
- `/plan` — create implementation plan.
- `/implement` — execute a clear plan.
- `/fix` — reproduce, diagnose, and fix bugs.
- `/verify` — verify current changes.
- `/pr` — prepare commit and open PR.
- `/finish` — handle CI, review, merge decision, cleanup.
- `/release <version>` — run explicit release workflow.

Commands follow the natural flow start → think → plan → implement → fix/verify/pr/finish/release as appropriate, but are not required to be used mechanically.
