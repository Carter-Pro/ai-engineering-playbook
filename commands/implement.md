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
