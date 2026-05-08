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

## Underlying skills

This command wraps:

- `skills/superpowers.md` for PR summarization, risk disclosure, and review readiness.
- `skills/matt-pocock.md` for explaining type-level, API-level, and runtime behavior changes when applicable.

PRs should include verification evidence and call out remaining risks.
