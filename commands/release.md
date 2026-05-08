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
