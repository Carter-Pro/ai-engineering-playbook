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

## Required external skills

This command prioritizes using installed external skills:

- **Superpowers** for diagnosis-first debugging and evidence-based fixes.
- **Matt Pocock skills** for TypeScript-specific debugging when applicable.

This command does not rewrite, copy, or substitute for these external skills.
If external skills are not available, degrade to the generic safe workflow defined in `CLAUDE.md`.
Do not guess-fix. Reproduce or diagnose before editing whenever possible.
