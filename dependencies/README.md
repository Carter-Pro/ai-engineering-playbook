# External Skill Dependencies

This directory documents the external skill dependencies that `commands/` expects to be available in the user's Claude Code environment.

## Dependencies

### Superpowers

Superpowers-style agent skills provide methodology for structured thinking, planning, debugging, verification, and release discipline.

- **Source:** external, installed separately in the user's Claude Code environment
- **Status:** this repository does not vendor, copy, or reimplement Superpowers skills
- **Usage:** `commands/` will use Superpowers when available

### Matt Pocock Skills

Matt Pocock-inspired skills provide methodology for TypeScript correctness, type-driven design, and code quality.

- **Source:** external, installed separately in the user's Claude Code environment
- **Status:** this repository does not vendor, copy, or reimplement Matt Pocock skills
- **Usage:** `commands/` will use Matt Pocock skills when the task involves TypeScript, JavaScript, React, frontend architecture, or type-level design

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
