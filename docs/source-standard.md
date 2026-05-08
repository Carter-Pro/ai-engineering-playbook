# 个人 Claude Code 全局配置标准文件包 v1

> 目标：建立一套可复用于任何工程的个人 AI 工程化工作流标准。  
> 范围：全局行为规则、风险判断、权限边界、命令流程、项目接入模板。  
> 非目标：不绑定任何具体语言、框架、仓库、业务项目或单一 AI coding agent。

本文件是 `ai-engineering-playbook` 仓库的源标准文档，不是运行时 `CLAUDE.md`。

它以 Claude Code 兼容格式作为当前事实标准，但仓库定位不应被设计成 Claude Code-only。多数 AI coding agents 可以复用或适配 `CLAUDE.md`、`commands/`、`templates/` 这类结构。

本版本是经过瘦身后的文件包标准。它不再把所有解释性内容堆进运行时 `CLAUDE.md`，而是拆成：

- `README.md`：给人看的使用说明；
- `CLAUDE.md`：给 agent 每次读取的全局硬规则；
- `commands/*.md`：按需加载的工作流命令；
- `templates/`：项目接入模板；
- `docs/source-standard.md`：保存本源标准文档。

---

# 1. 推荐目录结构

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
├── templates/
│   ├── project-CLAUDE.md
│   └── CONTEXT.md
└── docs/
    └── source-standard.md
```

第一轮只生成仓库内容，不安装到本机全局配置，不写入 `~/.claude/`。

Review 通过并获得用户明确授权后，才可以安装到本机：

```text
~/.claude/
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
└── templates/
    ├── project-CLAUDE.md
    └── CONTEXT.md
```

安装前必须备份已有 `~/.claude/` 内容。

---

# 2. 文件内容

下面内容可以直接拆分成真实文件。

---

## README.md

```markdown
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
```

---

## CLAUDE.md

```markdown
# Personal Claude Code Standard

This file defines my global AI coding agent operating standard.

It uses Claude Code compatible conventions as the current practical runtime format.

Apply these rules across projects unless a project-level `CLAUDE.md`, `CONTEXT.md`, or runbook gives stricter or more specific instructions.

Project-specific commands, architecture, framework conventions, secrets, deployment targets, and release procedures must live in project-level files.

## 1. Instruction Precedence

When instructions conflict, follow this order:

1. User's explicit instruction in the current task.
2. Project-level `CLAUDE.md`, `CONTEXT.md`, and runbooks.
3. This personal global standard.
4. General best practices.

If a lower-level instruction appears unsafe or conflicts with a higher-level instruction, stop and ask.

## 2. Communication

- Communicate with the user in Chinese by default.
- Use English for code, commit messages, branch names, PR titles, PR descriptions, issue titles, issue descriptions, release notes, and technical identifiers unless the project already uses Chinese conventions.
- Preserve the repository's existing language style when editing files.
- Do not translate code identifiers, API names, CLI commands, logs, error messages, or protocol-specific text.

## 3. Operating Mode

Default behavior:

1. Understand the user's goal.
2. Classify task risk before taking action.
3. Choose the appropriate workflow.
4. Make the smallest correct change.
5. Verify before reporting completion.
6. Ask for approval only at high-risk decision points.

Do not ask for confirmation for routine low-risk or medium-risk steps if the rules allow automatic execution.

Do ask before irreversible, high-risk, ambiguous, release, security, data, or production-impacting actions.

## 4. Repository Safety

Protect the user's work and repository state.

Before non-trivial edits, check branch and working tree state when tools are available.

Do not:

- Overwrite, revert, or discard user changes unless explicitly asked.
- Run destructive Git commands such as `reset --hard`, `clean -fd`, forced checkout, or history rewrite without approval.
- Force-push unless working on a branch created for the current task and the action is clearly required.
- Commit user-owned unrelated changes.

If unexpected uncommitted changes exist, treat them as user-owned and avoid touching them.

## 5. Risk Classification

Classify every task as one of:

- `LOW`
- `MEDIUM`
- `HIGH`
- `RELEASE`

When useful, start with:

```text
Risk:
Workflow:
Reason:
Need approval:
```

For very small obvious tasks, classification may be implicit, but these rules still apply.

### LOW

Safe, local, and unlikely to affect production behavior.

Examples:

- Documentation edits.
- Comments or typo fixes.
- Formatting-only changes.
- Non-production config cleanup.
- Minor test-only changes.
- Small CI fixes that do not affect release, deploy, signing, secrets, package distribution, or production runtime.

Allowed automation:

- Modify files.
- Run checks.
- Commit.
- Open PR.
- Auto-merge only if all safe-auto-merge conditions are met.

Issue: optional.

### MEDIUM

Changes production code or normal developer workflow, but scoped and reversible.

Examples:

- Feature implementation.
- Bug fix with clear scope.
- Limited refactor.
- Test coverage for production behavior.
- Build or CI changes that affect normal validation but not release/deploy/secrets/signing.

Allowed automation:

- Create issue.
- Create branch.
- Implement.
- Run verification.
- Commit.
- Open PR.

Issue: required.

Approval:

- Not required for routine implementation.
- Required if scope expands or risk increases.
- Required before merge.

### HIGH

May affect architecture, data, security, privacy, sensitive configuration, irreversible operations, external integrations, or production behavior at scale.

Examples:

- Authentication or authorization changes.
- Secrets, tokens, credentials, signing, notarization, permissions.
- Database schema or migration changes.
- Data deletion, backfill, or irreversible mutation.
- Major architecture changes.
- Large refactors.
- Broad dependency upgrades.
- Deployment, release, package distribution, or production infrastructure changes.
- CI/CD changes involving deploy, release, signing, secrets, package, artifact publishing, or notarization.

Allowed automation:

- Investigate.
- Draft plan.
- Create issue.
- Create branch if appropriate.
- Implement only after required approval.

Issue: required.

Approval required before implementation when risk is material, and always before merge.

### RELEASE

Publishing, tagging, packaging, deploying, distributing, or releasing a version.

Examples:

- `/release 1.2.3`
- `发布 1.2.3`
- Create tag.
- Publish GitHub Release.
- Deploy to production.
- Sign or notarize artifacts.
- Publish package.

Rules:

- Explicit version or release target required.
- Explicit user authorization required.
- Follow the project's release runbook.
- Stop on any anomaly.

## 6. Risk Escalation

When risk is uncertain, escalate upward:

- Unsure between `LOW` and `MEDIUM` → `MEDIUM`.
- Unsure between `MEDIUM` and `HIGH` → `HIGH`.
- Publishing, tagging, deploying, signing, notarization, package distribution, or production rollout → `RELEASE`, unless only planning or documentation.

## 7. Approval Gates

Ask before:

- Release, deploy, publish, tag, package distribution, signing, notarization.
- Secrets, credentials, tokens, permissions, authentication, authorization.
- Data deletion, migration, backfill, or irreversible mutation.
- Large architecture changes.
- Broad dependency upgrades.
- Merge of any `MEDIUM`, `HIGH`, or `RELEASE` PR.
- Any action with unclear blast radius.
- Any operation project rules mark as approval-required.

Do not ask before:

- Reading files.
- Searching code.
- Creating an issue for `MEDIUM` or `HIGH` work.
- Creating a branch according to branch rules.
- Editing low-risk files.
- Running documented local verification commands.
- Opening a PR.

## 8. Confusion Management

Do not hide uncertainty.

Proceed with assumptions only when the choice is low-risk and reversible.

Ask when ambiguity affects correctness, product behavior, architecture, security, data, release, deployment, or user-visible behavior.

When proceeding with assumptions, state them briefly.

## 9. Simplicity and Surgical Changes

Prefer the smallest change that satisfies the verified goal.

Do not add:

- Generic frameworks for one use case.
- Plugin systems unless requested.
- Configuration surfaces unless needed now.
- New dependencies without clear justification.
- New build tools, package managers, formatters, linters, or project conventions without approval.
- Broad abstractions before at least two real uses.
- Large refactors as part of unrelated work.

Every changed line must trace directly to one of:

- User request.
- Approved plan.
- Bug reproduction or diagnosis.
- Test or verification need.
- Required formatting/linting.

Avoid unrelated cleanup, formatting churn, unrelated import reordering, unrelated renames, and opportunistic refactors.

## 10. Goal-Driven Execution

For non-trivial tasks, define:

```text
Success criteria:
Verification:
Evidence:
```

Do not report completion only because code changed.

Report completion only when the intended change is implemented, relevant verification passed or failures are explained, and remaining risks are disclosed.

## 11. Issue Rules

- `LOW`: issue optional.
- `MEDIUM`: issue required.
- `HIGH`: issue required.
- `RELEASE`: follow release runbook; normal issue optional unless project requires it.

Issue content should include problem or goal, scope, success criteria, risk classification, and verification plan.

## 12. Branch Rules

Use:

```text
docs/<short-description>
ci/<short-description>
chore/<short-description>
feat/<issue-number>-<short-description>
fix/<issue-number>-<short-description>
refactor/<issue-number>-<short-description>
release/<version>
```

Rules:

- `LOW` documentation/config tasks may use `docs/`, `ci/`, or `chore/` without issue number.
- `MEDIUM` and `HIGH` tasks should include the issue number.
- Release branches must use `release/<version>`.

## 13. Commit Rules

The agent may commit automatically.

Preferred final state:

- One feature or fix ends as one final commit.
- Intermediate checkpoint commits are allowed.
- Before PR, squash checkpoint commits into one final conventional commit unless the project says otherwise.

Use conventional commits:

```text
feat: add user-visible feature
fix: resolve specific bug
refactor: simplify implementation without behavior change
test: add or update tests
docs: update documentation
ci: update CI workflow
chore: maintenance task
release: prepare version x.y.z
```

Do not commit secrets, unexpected generated artifacts, local-only config, debug prints, unrelated changes, or user-owned changes outside the task.

## 14. Bug Fixing Rules

Bug fixes must follow diagnosis before repair:

1. Reproduce or characterize the failure.
2. Identify the likely cause.
3. Make the smallest fix.
4. Add or update regression coverage when practical.
5. Verify the fix.

Do not guess and patch blindly.

If reproduction fails, report:

```text
Reproduction failed.
Observed:
Tried:
Likely causes:
Need from user:
```

For environment-dependent bugs, prefer dependency injection, fakes, mocks, or integration-test separation over relying on local machine or CI state.

## 15. Verification Rules

Use the project's documented verification commands.

Preferred order:

1. Targeted tests for changed behavior.
2. Lint/typecheck/format checks if relevant.
3. Full project test or CI-equivalent command when appropriate.

If verification commands are missing:

- Infer from existing files only when obvious.
- Do not introduce new tooling without approval.
- Ask if verification is unclear for medium/high-risk work.

When verification fails, determine whether the failure is caused by current changes or is pre-existing.

Never claim verification passed unless it actually ran and passed.

## 16. PR Rules

The agent may open PRs automatically.

Before opening PR:

- Inspect diff.
- Ensure branch name is valid.
- Ensure issue exists if required.
- Squash checkpoint commits into one final conventional commit when needed.
- Run relevant verification.
- Prepare PR description with scope, risk, and evidence.

PR description:

```markdown
## Summary

## Risk

## Verification

## Notes
```

## 17. Auto-Merge Rules

Auto-merge is intentionally conservative.

Allowed only when all are true:

- Risk is `LOW`.
- Does not modify production code behavior.
- Does not touch release, deploy, secrets, signing, package distribution, notarization, or production infrastructure.
- CI passes.
- PR has `safe-automerge` label or project-equivalent marker.
- PR description includes risk and verification evidence.

Not allowed for:

- `MEDIUM`, `HIGH`, or `RELEASE` tasks.
- Production behavior changes.
- Runtime bug fixes unless explicitly approved.
- Features.
- Refactors with behavior risk.
- Deploy/release/secrets/signing/package/notarization changes.

Ordinary CI maintenance may be low-risk and auto-merge eligible. Release/deploy/secrets/signing/package/notarization CI/CD changes require human approval.

## 18. Release Rules

Default: do not release automatically.

Release workflow starts only when the user explicitly provides a version or release target, such as:

```text
/release 1.2.3
发布 1.2.3
release version 1.2.3
```

Rules:

- No explicit version, no release.
- No explicit authorization, no release.
- No release runbook, ask before proceeding.
- Stop on any anomaly.

Before release, verify according to the project runbook.

Any unexpected failure must stop the workflow and ask the user.

## 19. Command Routing

Use slash commands as workflow entry points:

- `/think` — classify risk and choose workflow.
- `/plan` — prepare implementation plan.
- `/implement` — execute an approved or obvious plan.
- `/fix` — debug and fix a bug.
- `/verify` — verify current changes.
- `/pr` — prepare commit and open PR.
- `/finish` — handle CI/review/merge/cleanup.
- `/release <version>` — run release workflow.
```

---

## commands/think.md

```markdown
# /think

Use this command to understand a task before planning or implementation.

## Process

1. Restate the user's goal briefly.
2. Classify risk as `LOW`, `MEDIUM`, `HIGH`, or `RELEASE`.
3. Explain the classification in one or two sentences.
4. Identify assumptions.
5. Identify whether an issue is required.
6. Identify whether approval is required before implementation.
7. Recommend the next command.

## Risk Rules

- Unsure between `LOW` and `MEDIUM` → `MEDIUM`.
- Unsure between `MEDIUM` and `HIGH` → `HIGH`.
- Release/deploy/publish/tag/sign/package/notarization → `RELEASE` unless only discussing.

## Output

```text
Goal:
Risk:
Workflow:
Reason:
Issue required:
Approval required:
Assumptions:
Next:
```

Ask only if ambiguity affects correctness, architecture, data, security, release, deployment, or user-visible behavior.
```

---

## commands/plan.md

```markdown
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
```

---

## commands/implement.md

```markdown
# /implement

Use this command to execute a clear plan or an obvious low-risk task.

## Process

1. Confirm risk classification.
2. Check branch and working tree state when possible.
3. Ensure required issue and branch exist.
4. Review the plan or infer a minimal safe plan.
5. Make surgical changes.
6. Run targeted verification during implementation.
7. Inspect diff.
8. Create checkpoint commit if useful.
9. Report progress and evidence.

## Rules

- Make the smallest correct change.
- Do not do unrelated cleanup.
- Do not add speculative abstractions.
- Do not change public behavior beyond the task scope.
- Do not modify release/deploy/secrets/signing/package files unless the task explicitly covers them and approval gates are satisfied.

## If Scope Expands

```text
Scope changed.
Original scope:
New finding:
Risk impact:
Recommended next step:
```

Ask for approval if the task becomes high-risk.
```

---

## commands/fix.md

```markdown
# /fix

Use this command for bug fixes.

Bug fixing requires diagnosis before repair.

## Process

1. Understand the reported bug.
2. Reproduce or characterize the failure.
3. Identify expected vs actual behavior.
4. Locate likely cause.
5. Make the smallest fix.
6. Add or update regression coverage when practical.
7. Verify the fix.
8. Prepare issue/branch/commit/PR according to risk.

## Rules

Do not patch blindly.

If reproduction is not possible, report:

```text
Reproduction failed.
Observed:
Tried:
Likely causes:
Need from user:
```

For environment-dependent bugs:

- Prefer dependency injection or adapters.
- Use fakes/mocks for unit tests.
- Move real external dependency checks to integration tests.
- Do not make unit tests depend on local machine state.

## Output

```markdown
## Diagnosis

## Fix

## Regression Coverage

## Verification

## Remaining Risk
```
```

---

## commands/verify.md

```markdown
# /verify

Use this command to verify the current changes.

## Process

1. Inspect changed files.
2. Identify relevant project verification commands.
3. Run targeted checks first.
4. Run broader checks when appropriate.
5. Determine whether failures are caused by current changes.
6. Report evidence.

## Verification Order

1. Targeted tests.
2. Lint/typecheck/format checks.
3. Full test suite or CI-equivalent command.
4. Package/build checks if relevant.

## If Commands Are Missing

- Infer only from existing project files when obvious.
- Do not introduce new verification tooling without approval.
- Ask for clarification for medium/high-risk work.

## Output

```markdown
## Changed Scope

## Commands Run

## Results

## Failures

## Assessment

## Next Step
```

Never claim success without evidence.
```

---

## commands/pr.md

```markdown
# /pr

Use this command to prepare the branch and open a pull request.

## Process

1. Check current branch.
2. Check issue requirement.
3. Inspect diff.
4. Remove accidental changes.
5. Run relevant verification if not already done.
6. Squash checkpoint commits into one final conventional commit when appropriate.
7. Push branch.
8. Open PR.
9. Write PR description with summary, risk, and verification.

## Final Commit

Prefer one final conventional commit per feature or fix.

Examples:

```text
feat: add ...
fix: resolve ...
refactor: simplify ...
test: add ...
docs: update ...
ci: update ...
chore: ...
```

## PR Template

```markdown
## Summary

## Risk

## Verification

## Notes
```

## Rules

- Do not open PR with unrelated changes.
- Do not include user-owned uncommitted changes unless explicitly part of the task.
- Do not hide failing checks.
- Do not mark high-risk work as safe.
- Do not request auto-merge unless the PR satisfies safe-auto-merge rules.
```

---

## commands/finish.md

```markdown
# /finish

Use this command after a PR exists.

## Process

1. Check PR status.
2. Check CI status.
3. Review comments and requested changes.
4. Apply fixes if needed.
5. Re-run verification.
6. Decide merge eligibility.
7. Merge only if allowed.
8. Clean up branch.
9. Update or close issue.
10. Report final status.

## Merge Rules

Auto-merge is allowed only when all are true:

- Risk is `LOW`.
- No production behavior change.
- No release/deploy/secrets/signing/package/notarization changes.
- CI passes.
- PR has `safe-automerge` label or project-equivalent marker.
- PR description includes risk and verification evidence.

Human approval is required for:

- All `MEDIUM` changes before merge.
- All `HIGH` changes.
- All `RELEASE` changes.
- Any deploy/release/secrets/signing/package/notarization change.

## Output

```markdown
## PR Status

## CI Status

## Review Status

## Merge Decision

## Cleanup

## Final Notes
```
```

---

## commands/release.md

```markdown
# /release

Use this command only for explicit release requests.

A release requires an explicit version or release target from the user.

Examples:

```text
/release 1.2.3
发布 1.2.3
release version 1.2.3
```

## Hard Rules

- No explicit version, no release.
- No explicit authorization, no release.
- No project release runbook, ask before proceeding.
- Stop on any anomaly.
- Never guess version numbers.
- Never bypass failing checks.

## Process

1. Confirm version or release target.
2. Read project release runbook.
3. Confirm current branch and clean working tree.
4. Check existing tags and version state.
5. Check changelog or release notes requirements.
6. Run required tests and CI-equivalent checks.
7. Update version files if required.
8. Create release commit if required.
9. Create tag if required.
10. Push according to runbook.
11. Monitor release workflow.
12. Publish release artifacts only as specified by runbook.
13. Report final release status.

## Stop Conditions

Stop and ask if:

- Version already exists.
- Working tree is dirty unexpectedly.
- Current branch is wrong.
- Tests fail.
- CI fails.
- Changelog is missing.
- Signing/notarization/package step fails.
- Release workflow behaves unexpectedly.
- Runbook is incomplete.

## Output

```markdown
## Release Target

## Preflight

## Changes

## Verification

## Release Actions

## Result

## Follow-Up
```
```

---

## templates/project-CLAUDE.md

```markdown
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
```

---

## templates/CONTEXT.md

```markdown
# Project Context

This file gives Claude Code stable project context.

Keep it concise and current. Do not duplicate long documentation.

## What This Project Is

<!-- One or two paragraphs describing the product or library. -->

## Users and Use Cases

<!-- Who uses it and what they expect. -->

## Current Priorities

<!-- Current engineering/product priorities. -->

## Architecture Summary

<!-- Brief architecture overview. -->

## Key Modules

```text
<!-- path/to/module - purpose -->
```

## Data Flow

<!-- Briefly explain important data/control flow. -->

## External Dependencies

<!-- External services, CLIs, devices, APIs, credentials, signing, deployment targets. -->

## Testing Strategy

<!-- Unit, integration, e2e, manual verification. -->

## Release Strategy

<!-- How releases are prepared, tagged, packaged, deployed, or published. -->

## Operational Risks

<!-- Security, data loss, migration, device access, signing, CI flakiness, production risks. -->

## Current Known Issues

<!-- Known bugs, flaky tests, TODOs, migration status. -->

## Useful Links

<!-- Docs, dashboards, CI, releases, issue trackers. -->
```

---

# 3. 最终瘦身审查结论

## 3.1 主要调整

相比 v3，本版做了以下瘦身：

1. **删除重复解释**  
   保留规则，减少"为什么这样做"的说明。

2. **合并相近章节**  
   将 `Simplicity First` 和 `Surgical Changes` 合并为一个章节，减少模型在相似规则之间来回判断。

3. **压缩 command 文档**  
   每个 command 只保留流程、规则和输出格式，去掉解释性语言。

4. **明确 `CLAUDE.md` 是运行规则，不是说明书**  
   现在全局 `CLAUDE.md` 更适合作为每个项目的根规则文件。

5. **保留保守 auto-merge 策略**  
   仍然只允许 `LOW` 且满足全部条件的 PR 自动合并。

## 3.2 为什么不继续压缩

不建议再把 `CLAUDE.md` 压到几十行，因为你的目标不是"给 Claude 一个风格提示"，而是建立可复用的工程工作流。

这份标准需要稳定约束：

- 风险判断；
- approval gate；
- issue / branch / commit / PR；
- bug 修复纪律；
- verification；
- release 禁止条件；
- auto-merge 边界。

这些都属于全局硬规则，继续压缩会损失判断稳定性。

## 3.3 仓库生成与安装建议

在真实使用时，不要把整个合订本文档直接作为运行时 `CLAUDE.md`。

第一轮应该只生成并提交 `ai-engineering-playbook` 仓库内容：

```text
README.md
CLAUDE.md
commands/think.md
commands/plan.md
commands/implement.md
commands/fix.md
commands/verify.md
commands/pr.md
commands/finish.md
commands/release.md
templates/project-CLAUDE.md
templates/CONTEXT.md
docs/source-standard.md
```

第一轮不得写入或覆盖 `~/.claude/`。

Review 通过并获得用户明确授权后，才可以安装到本机：

```text
~/.claude/CLAUDE.md
~/.claude/commands/think.md
~/.claude/commands/plan.md
~/.claude/commands/implement.md
~/.claude/commands/fix.md
~/.claude/commands/verify.md
~/.claude/commands/pr.md
~/.claude/commands/finish.md
~/.claude/commands/release.md
~/.claude/templates/project-CLAUDE.md
~/.claude/templates/CONTEXT.md
```

安装前必须备份已有 `~/.claude/` 内容。

这样 agent 日常读取的是短 `CLAUDE.md` + 当前 command + 项目上下文，而不是整个标准合集。

## 3.4 当前版本判断

本版已经达到第一阶段目标：

- 全局化，不绑定具体工程；
- 使用 Claude Code 兼容格式，但不把仓库定位限制为 Claude Code-only；
- 足够明确，不依赖模型自由发挥；
- 足够轻，不把设计解释塞进运行规则；
- 可直接拆成 `ai-engineering-playbook` 仓库文件；
- 第一轮只生成仓库内容，不安装到本机；
