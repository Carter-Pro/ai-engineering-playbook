# AI Engineering Playbook — Source Standard

> **Version:** current (external skill dependency scheme)
> **Deprecates:** v1 adapter scheme with local `skills/` directory

## 1. Repository Positioning

This is a personal AI engineering workflow standard. It is project-agnostic and defines how an AI coding agent should reason, classify risk, ask for approval, create issues, manage branches, commit work, open PRs, verify changes, and handle releases.

It uses Claude Code compatible files as the current practical format, but is not intended to be Claude Code-only. Most AI coding agents can reuse or adapt `CLAUDE.md`, `commands/`, `dependencies/`, and `templates/`.

## 2. Directory Structure

```text
ai-engineering-playbook/
├── README.md
├── CLAUDE.md
├── commands/
│   ├── think.md
│   ├── plan.md
│   ├── implement.md
│   ├── fix.md
│   ├── verify.md
│   ├── pr.md
│   ├── finish.md
│   └── release.md
├── dependencies/
│   └── README.md
├── templates/
│   ├── project-CLAUDE.md
│   └── CONTEXT.md
└── docs/
    └── source-standard.md
```

## 3. Core Scheme

### 3.1 Commands are workflow wrappers

`commands/` is the user-facing interface. Users invoke commands such as `/think`, `/plan`, `/implement`, `/fix`, `/verify`, `/pr`, `/finish`, `/release`. Users should not need to remember or invoke external skill names directly.

### 3.2 External skill dependencies

Superpowers skills and Matt Pocock skills are **external dependencies** installed separately in the user's Claude Code environment.

This repository does **not**:
- vendor external skills
- copy external skills
- reimplement external skills
- simulate external skills
- fake external skills
- create local adapters that mimic external skills

### 3.3 Dependency documentation

`dependencies/README.md` documents the dependency relationship, prerequisites, installation instructions, and fallback behavior.

### 3.4 Fallback behavior

If external skills are not available, `commands/` degrades to the generic safe workflow defined in `CLAUDE.md`. The agent must not simulate, fake, or reimplement missing external skills. It must report the degradation when it affects the workflow.

### 3.5 Matt Pocock skill scope

Matt Pocock skills apply only to: TypeScript, JavaScript, React, frontend architecture, API typing, or type-level design/debugging/verification. They do not apply to Swift, Python, CI, release, deployment, general backend, or non-frontend architecture unless the task explicitly involves the in-scope technologies.

## 4. Deprecated: Old Adapter Scheme

The following is **explicitly deprecated and removed**:

- `skills/` directory — no longer exists
- `skills/superpowers.md` — no local Superpowers adapter
- `skills/matt-pocock.md` — no local Matt Pocock adapter
- Any phrasing that implies local imitation (e.g., "Superpowers-style", "Matt Pocock-inspired", "local adapter", "reimplementation")

## 5. Instruction Precedence

When instructions conflict, follow this order:

1. User's current instruction
2. Project-level `CLAUDE.md`, `CONTEXT.md`, and runbooks
3. Invoked command file
4. This personal global standard
5. Installed external skills (Superpowers, Matt Pocock)
6. General best practices

External skills must never override user instructions, project rules, invoked command rules, safety boundaries, or this repository's rules.

## 6. Communication

- Communicate with the user in Chinese by default.
- Use English for code, commit messages, branch names, PR titles, PR descriptions, issue titles, issue descriptions, release notes, and technical identifiers unless the project already uses Chinese conventions.
- Preserve the repository's existing language style when editing files.
- Do not translate code identifiers, API names, CLI commands, logs, error messages, or protocol-specific text.

## 7. Operating Mode

1. Understand the user's goal.
2. Classify task risk before taking action.
3. Choose the appropriate workflow.
4. Make the smallest correct change.
5. Verify before reporting completion.
6. Ask for approval only at high-risk decision points.

Do not ask for routine low-risk or medium-risk steps. Do ask before irreversible, high-risk, ambiguous, release, security, data, or production-impacting actions.

## 8. Risk Classification

Classify every task: `LOW`, `MEDIUM`, `HIGH`, or `RELEASE`.

### LOW
Safe, local, unlikely to affect production. Examples: docs, comments, formatting, non-production config, minor test changes, small CI fixes not touching release/deploy/secrets/signing.

Allowed: modify, check, commit, open PR, auto-merge only if safe-automerge conditions are met. Issue: optional.

### MEDIUM
Changes production code, scoped and reversible. Examples: features, bug fixes with clear scope, limited refactors, test coverage, build/CI changes not touching release/deploy/secrets/signing.

Allowed: issue, branch, implement, verify, commit, open PR. Issue: required. Approval: required if scope expands or risk increases; always required before merge.

### HIGH
May affect architecture, data, security, privacy, sensitive config, irreversible operations, external integrations, or production behavior at scale. Examples: auth, secrets, DB migrations, data deletion/backfill, major architecture, large refactors, broad dependency upgrades, deployment, release, production infrastructure, CI/CD involving deploy/release/secrets/signing/package/notarization.

Allowed: investigate, draft plan, issue, branch if appropriate, implement only after approval. Issue: required. Approval: required before implementation when material, always before merge.

### RELEASE
Publishing, tagging, packaging, deploying, distributing, releasing a version. Examples: `/release 1.2.3`, create tag, publish GitHub Release, deploy, sign/notarize, publish package.

Rules: explicit version required, explicit authorization required, follow project release runbook, stop on any anomaly.

## 9. Risk Escalation

- Unsure `LOW` or `MEDIUM` → `MEDIUM`.
- Unsure `MEDIUM` or `HIGH` → `HIGH`.
- Publishing, tagging, deploying, signing, notarization, package distribution, production rollout → `RELEASE` unless only planning or documentation.

## 10. Approval Gates

**Ask before:** release, deploy, publish, tag, package distribution, signing, notarization; secrets, credentials, tokens, permissions, auth; data deletion, migration, backfill, irreversible mutation; large architecture changes; broad dependency upgrades; merge of MEDIUM/HIGH/RELEASE PRs; unclear blast radius; project-marked approval-required operations.

**Do not ask before:** reading files, searching code, creating MEDIUM/HIGH issues, creating branches by rules, editing low-risk files, running documented local verification, opening PRs.

## 11. Repository Safety

Do not: overwrite/revert/discard user changes unless asked; run destructive git commands without approval; force-push unless on task-created branch and clearly required; commit user-owned unrelated changes.

Unexpected uncommitted changes are user-owned — avoid touching them.

## 12. Simplicity and Surgical Changes

Prefer the smallest change. Do not add: generic frameworks for one use case, plugin systems unless requested, config surfaces unless needed, new deps without justification, new build tools/linters/formatters without approval, broad abstractions before two real uses, large refactors as part of unrelated work.

Every changed line must trace to: user request, approved plan, bug diagnosis, test/verification need, or required formatting. Avoid unrelated cleanup, formatting churn, import reordering, renames, and opportunistic refactors.

## 13. Issue Rules

- `LOW`: optional
- `MEDIUM`: required
- `HIGH`: required
- `RELEASE`: follow release runbook; normal issue optional

Issue content: problem/goal, scope, success criteria, risk classification, verification plan.

## 14. Branch Rules

```
docs/<short-description>
ci/<short-description>
chore/<short-description>
feat/<issue-number>-<short-description>
fix/<issue-number>-<short-description>
refactor/<issue-number>-<short-description>
release/<version>
```

LOW tasks may use `docs/`, `ci/`, or `chore/` without issue number. MEDIUM and HIGH tasks include issue number. Release branches use `release/<version>`.

## 15. Commit Rules

Preferred: one final conventional commit per feature/fix. Checkpoint commits allowed, squashed before PR unless project says otherwise.

Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `ci:`, `chore:`, `release:`.

Do not commit: secrets, unexpected generated artifacts, local-only config, debug prints, unrelated changes, user-owned changes outside the task.

## 16. Bug Fixing Rules

Diagnosis before repair: reproduce or characterize, identify likely cause, make smallest fix, add regression coverage when practical, verify.

Do not guess and patch blindly. If reproduction fails, report: observed, tried, likely causes, need from user.

For environment-dependent bugs: prefer dependency injection, fakes, mocks, or integration-test separation.

## 17. Verification Rules

Use project's documented verification commands. Order: targeted tests → lint/typecheck/format → full test suite → package/build checks.

If commands are missing: infer from existing files when obvious, do not introduce new tooling without approval, ask for medium/high-risk work.

Never claim verification passed unless it actually ran and passed.

## 18. PR Rules

Before opening PR: inspect diff, check branch name, check issue requirement, squash checkpoint commits, run verification, prepare PR description.

PR template: `## Summary`, `## Risk`, `## Verification`, `## Notes`.

## 19. Auto-Merge Rules

Auto-merge is conservative. Allowed only when: LOW risk, no production behavior change, no release/deploy/secrets/signing/package/notarization changes, CI passes, `safe-automerge` label, risk and verification in PR description.

Not allowed: MEDIUM/HIGH/RELEASE, production behavior changes, features, refactors with behavior risk, deploy/release/secrets/signing/package/notarization changes.

## 20. Release Rules

Default: do not release automatically. Release starts only with explicit version and explicit authorization. No version → no release. No authorization → no release. No runbook → ask. Stop on any anomaly.

Before creating tags, pushing release commits, publishing artifacts, deploying, signing, notarizing, or distributing packages: stop and confirm explicit user authorization.

Reading the runbook, checking version state, preparing notes, and running verification may proceed. Actual release actions require explicit approval.

## 21. Command Routing

- `/think` — classify risk and choose workflow.
- `/plan` — create implementation plan for MEDIUM/HIGH work.
- `/implement` — execute an approved or obvious plan.
- `/fix` — debug and fix a bug.
- `/verify` — verify current changes.
- `/pr` — prepare commit and open PR.
- `/finish` — handle CI/review/merge/cleanup.
- `/release <version>` — run explicit release workflow.

## 22. External Skills in Commands

When running a command: read the command file first, prioritize using installed external skills when available, degrade to generic safe workflow if unavailable, do not claim this repo implements external skills.

External skills must not trigger: automatic dependency installation, automatic merge, automatic release, configuration overwriting, destructive operations without explicit user approval.

## 23. Installation Strategy

This repository is the source of truth. Do not install to `~/.claude/` until reviewed and approved.

Installation flow: generate/update repo → commit → push → review → back up existing `~/.claude/` → install selected files.

Target: `~/.claude/CLAUDE.md`, `~/.claude/commands/`, `~/.claude/dependencies/`, `~/.claude/templates/`.

Before installation: `cp -R ~/.claude ~/.claude.backup.$(date +%Y%m%d-%H%M%S)`. Do not overwrite user changes without review.

## 24. Evolution History

- **v1** — original combined standard with local skill adapters and `skills/` directory
- **current** — external skill dependency scheme: `commands/` are wrappers, Superpowers and Matt Pocock are external dependencies, `dependencies/` documents the relationship, no local adapters, no `skills/` directory
