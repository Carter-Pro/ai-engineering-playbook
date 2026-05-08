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

## Required external skills

This command prioritizes using installed external skills:

- **Superpowers** for evidence-based verification and honest reporting.
- **Matt Pocock skills** for typecheck, unit test, lint, and API-safety verification in TypeScript, JavaScript, React, frontend architecture, API typing, or type-level design when applicable.

This command does not rewrite, copy, simulate, fake, or substitute for these external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
Verification claims must be backed by command output or explicit inspection evidence.
