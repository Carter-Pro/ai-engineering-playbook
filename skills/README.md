# Skills

This directory contains local skill adapters used by the workflow commands.

## Purpose

`skills/` is not the primary user interface.

Users should normally call commands such as:

- `/think`
- `/plan`
- `/implement`
- `/fix`
- `/verify`
- `/pr`
- `/finish`
- `/release`

The commands then apply the relevant skills internally.

## Design principle

```text
commands = workflow interface
skills   = methodology layer
```

A command may combine multiple skills. For example:

- `/think` may use Superpowers-style problem framing.
- `/plan` may use Superpowers-style planning and risk analysis.
- `/implement` may use Matt Pocock-style code quality practices when working in TypeScript projects.
- `/fix` may use diagnosis-first debugging before editing code.
- `/verify` may use test-first and evidence-based verification methods.

## Rules

1. Do not ask the user to remember or invoke low-level skill names.
2. Commands should describe which skills they apply and why.
3. Skills should stay concise and reusable.
4. Skills must not override repository-specific instructions.
5. Skills must not authorize unsafe automation.
6. Project-level `CLAUDE.md` and user instructions always take priority.
