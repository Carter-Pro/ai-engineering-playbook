# AI Engineering Playbook

## What this repository is

This repository is a personal AI engineering playbook.

It provides a Claude Code-compatible global workflow structure, including:

- `CLAUDE.md` — global operating rules and safety boundaries
- `commands/` — user-facing workflow commands
- `skills/` — underlying methodology adapters, including Superpowers and Matt Pocock-inspired practices
- `templates/` — reusable project-level context templates
- `docs/` — source standard and design notes

The key design principle is:

> Commands are the user interface. Skills are the underlying methodology.

Users should normally invoke commands, not skills directly.

It currently uses Claude Code compatible files as the practical standard, but it is not intended to be Claude Code-only. Other AI coding agents may reuse or adapt the same `CLAUDE.md`, `commands/`, `skills/`, and `templates/` structure.

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
- `skills/*.md` — underlying methodology adapters (Superpowers, Matt Pocock) used by commands.
- `templates/project-CLAUDE.md` — template for project-level agent rules.
- `templates/CONTEXT.md` — template for project background and engineering context.
- `docs/source-standard.md` — the full source standard used to generate this repository.

## External skill dependencies

This playbook assumes the following methodology sources are available conceptually or installed separately where supported:

- Superpowers-style agent skills
- Matt Pocock-inspired TypeScript / code-quality skills

This repository does not vendor or copy third-party skill packages by default.
Instead, it provides a local `skills/` adapter layer that documents how our commands should use those methods.

The relationship is:

```text
commands/     user-facing workflow entry points
skills/       local adapters for external skill methodologies
external      optional upstream skill packages or references
```

If an environment supports installing third-party skills directly, install them according to their upstream documentation first, then keep this repository's `skills/` files as the local wrapper and policy layer.

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
  skills/
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
cp -R skills ~/.claude/skills
cp -R templates ~/.claude/templates
```

Do not overwrite user changes without review.

## Usage Policy

This repository should be reviewed before installation.

First generation pass:

1. Generate repository content only.
2. Do not install to `~/.claude/`.
3. Do not modify system-level configuration.
4. Review `CLAUDE.md`, `commands/*.md`, `skills/*.md`, and templates before using them globally.

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
