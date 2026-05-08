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

## Required external skills

This command prioritizes using installed external skills:

- **Superpowers** for clean closure, worktree awareness, unresolved issue tracking, and safe handoff.

This command does not rewrite, copy, or substitute for these external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
Do not silently discard or overwrite user work.
