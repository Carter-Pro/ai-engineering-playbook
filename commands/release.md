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

## Release Gate

Before creating tags, pushing release commits, publishing artifacts, deploying, signing, notarizing, or distributing packages, stop and confirm explicit user authorization for that specific release action unless the user has already explicitly authorized that exact action in the current task.

Reading the runbook, checking version state, preparing release notes, and running verification may proceed. Actual release actions require explicit approval.

## Process

### Preflight and Preparation

1. Confirm version or release target.
2. Read project release runbook.
3. Confirm current branch and working tree status.
4. Check existing tags and version state.
5. Check changelog or release notes requirements.
6. Run required tests and CI-equivalent checks.
7. Prepare the proposed release action list.
8. Stop and ask for explicit authorization for the exact release actions.

### Authorized Release Actions

Only after explicit authorization for the exact action:

1. Update version files if authorized.
2. Create release commit if authorized.
3. Create tag if authorized.
4. Push release commit or tag if authorized.
5. Monitor release workflow if authorized.
6. Publish release artifacts if authorized and specified by the runbook.
7. Report final release status.

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

## Required external skills

This command prioritizes using installed external skills:

- **Superpowers** for release gating, explicit approval, verification, changelog review, and artifact safety.

This command does not rewrite, copy, simulate, fake, or substitute for these external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
Release actions require explicit user authorization.
