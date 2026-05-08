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
