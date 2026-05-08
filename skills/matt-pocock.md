# Matt Pocock Skill Adapter

This file defines how this playbook adapts Matt Pocock-inspired code quality methods, especially for TypeScript and frontend projects.

## Role

Matt Pocock-inspired skills are used for:

- TypeScript correctness
- type-driven design
- clearer API boundaries
- safer refactoring
- testable code structure
- avoiding unnecessary complexity

## Applied by commands

### `/think`

When the task involves TypeScript or frontend code:

- identify the relevant types and data boundaries
- clarify whether the problem is runtime behavior, type design, or API design
- avoid jumping directly to implementation

### `/plan`

When planning TypeScript work:

- prefer small type-safe changes
- identify affected public APIs
- decide whether types, tests, or runtime behavior should change first
- avoid introducing new libraries unless clearly justified

### `/implement`

When implementing TypeScript work:

- preserve or improve type safety
- avoid `any` unless explicitly justified
- prefer narrowing, discriminated unions, and explicit boundaries
- keep functions small and behavior-focused
- avoid broad rewrites when a local change is enough

### `/fix`

When fixing TypeScript bugs:

- distinguish type errors from runtime bugs
- reproduce the issue with a failing test or type check where possible
- fix the root type or behavior boundary, not only the symptom

### `/verify`

When verifying TypeScript work:

- run typecheck
- run unit tests
- run lint or format checks if already present
- report exactly which commands passed or failed

### `/pr`

When preparing PRs:

- explain type-level changes separately from runtime behavior changes
- mention any public API impact
- include verification evidence

## Constraints

Do not introduce new TypeScript tooling, formatters, linters, test frameworks, or package managers unless the user explicitly approves it.

Follow the existing project conventions first.
