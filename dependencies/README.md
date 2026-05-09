# External Skill Dependencies

This directory documents the external skill dependencies that `commands/` expects to be available in the user's Claude Code environment.

## Dependencies

### Superpowers

Superpowers skills are external skills installed separately in the user's Claude Code environment. They provide methodology for structured thinking, planning, debugging, verification, and release discipline.

**Installed skill names relevant to this repository:**

| Skill                                        | Purpose                                           |
| -------------------------------------------- | ------------------------------------------------- |
| `superpowers:brainstorming`                  | Unclear goals, tradeoffs, design exploration      |
| `superpowers:writing-plans`                  | Implementation planning for defined goals         |
| `superpowers:executing-plans`                | Disciplined plan execution                        |
| `superpowers:systematic-debugging`           | Bug diagnosis and repair                          |
| `superpowers:test-driven-development`        | General TDD red-green-refactor                    |
| `superpowers:verification-before-completion` | Evidence-based verification                       |
| `superpowers:requesting-code-review`         | PR review preparation for non-trivial changes     |
| `superpowers:finishing-a-development-branch` | Checklist reference for branch completion         |
| `superpowers:subagent-driven-development`    | Complex work with independent sub-tasks           |
| `superpowers:dispatching-parallel-agents`    | Multiple independent fault domains                |
| `superpowers:using-git-worktrees`            | Isolated workspace (only when explicitly allowed) |

- **Source:** external, installed separately in the user's Claude Code environment
- **Status:** this repository does not vendor, copy, reimplement, simulate, or fake Superpowers skills
- **Usage:** `commands/` references Superpowers skills by name, purpose boundary, and trigger condition

### Matt Pocock Skills

Matt Pocock skills are external skills installed separately in the user's Claude Code environment. They provide methodology for TypeScript, JavaScript, React, frontend architecture, API typing, and type-level design/debugging/verification.

**Installed skill names relevant to this repository:**

| Skill                                      | Purpose                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| `mattpocock:zoom-out`                      | Codebase orientation, unfamiliar areas                                    |
| `mattpocock:grill-with-docs`               | Docs/domain-language challenge                                            |
| `mattpocock:improve-codebase-architecture` | Architecture, refactorability, testability, AI-navigability               |
| `mattpocock:prototype`                     | Throwaway validation of UI/state/API typing/design assumptions            |
| `mattpocock:tdd`                           | TypeScript/JavaScript/React/frontend/type-level TDD                       |
| `mattpocock:diagnose`                      | Hard TypeScript/JavaScript/React/frontend bugs or performance regressions |

- **Source:** external, installed separately in the user's Claude Code environment
- **Status:** this repository does not vendor, copy, reimplement, simulate, or fake Matt Pocock skills
- **Scope:** TypeScript, JavaScript, React, frontend architecture, API typing, or type-level design/debugging/verification only
- **Usage:** `commands/` references Matt Pocock skills by name, purpose boundary, and trigger condition, only when the task falls within scope

## Conditional Use

Commands reference external skills **conditionally**, not mechanically:

- Each command declares a primary skill (or None) and optional skills.
- Optional skills include trigger conditions — they are only used when the condition is met.
- Where Superpowers and Matt Pocock overlap (e.g., TDD, debugging), choose one based on task domain. Do not default to running both.
- If no skill fits, the command says None.

## Design Principle

```
commands/     personal workflow entry points — what you call
external      installed skills in the user's environment — how it works
dependencies/ documents the relationship — no code, no adapters, no rewrites
```

## Fallback Behavior

If an external skill dependency is not installed or not available:

1. `commands/` degrades to the generic safe workflow defined in `CLAUDE.md`.
2. Do not simulate, fake, or reimplement the missing skill.
3. Report the degradation to the user when it affects the workflow.

## Installation

This repository does not automatically install external skill dependencies.

To install external skills:

1. Install them according to their upstream documentation.
2. Verify they are available in your Claude Code environment.
3. Then `commands/` in this repository will use them automatically.

When installing this repository to `~/.claude/`:

1. Back up existing `~/.claude/` configuration first:
   ```bash
   cp -R ~/.claude ~/.claude.backup.$(date +%Y%m%d-%H%M%S)
   ```
2. Copy files explicitly:
   ```bash
   cp CLAUDE.md ~/.claude/CLAUDE.md
   cp -R commands ~/.claude/commands
   cp -R dependencies ~/.claude/dependencies
   cp -R templates ~/.claude/templates
   ```
3. Do not overwrite user changes without review.
4. Do not install during the first generation pass — review first.
