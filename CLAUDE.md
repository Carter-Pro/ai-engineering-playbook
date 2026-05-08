# Personal Claude Code Standard

This file defines my global AI coding agent operating standard.

It uses Claude Code compatible conventions as the current practical runtime format.

Apply these rules across projects unless a project-level `CLAUDE.md`, `CONTEXT.md`, or runbook gives stricter or more specific instructions.

Project-specific commands, architecture, framework conventions, secrets, deployment targets, and release procedures must live in project-level files.

## 1. Instruction Precedence

When instructions conflict, follow this order:

1. User's current instruction
2. Project-level `CLAUDE.md`, `CONTEXT.md`, and runbooks
3. Invoked command file
4. This personal global standard
5. Installed external skills (Superpowers, Matt Pocock)
6. General best practices

If a lower-level instruction appears unsafe or conflicts with a higher-level instruction, stop and ask.

External skills must never override user instructions, project rules, invoked command rules, safety boundaries, or this repository's rules.

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

## 20. Commands and External Skills

The user-facing interface is `commands/`.

External skills (Superpowers, Matt Pocock) are assumed to be installed in the user's Claude Code environment. This repository does not vendor, copy, reimplement, simulate, or fake them. `dependencies/` documents the relationship.

When running a command:

1. Read the command file first.
2. Prioritize using installed external skills (Superpowers, Matt Pocock) when available.
3. If external skills are not available, degrade to the generic safe workflow defined in this file.
4. Do not claim that this repository implements Superpowers or Matt Pocock skills.
5. Apply project-level instructions and repository conventions.
6. Follow the user's current instruction as the highest-priority input.

Priority order:

1. User's current instruction
2. Project-level `CLAUDE.md`, `CONTEXT.md`, and runbooks
3. Invoked command file
4. This personal global standard
5. Installed external skills (Superpowers, Matt Pocock)
6. General best practices

External skills must never override user instructions, project rules, invoked command rules, safety boundaries, or this repository's rules.

External skills must not trigger:
- Automatic installation of dependencies
- Automatic merge
- Automatic release
- Overwriting of local configuration
- Destructive operations without explicit user approval
