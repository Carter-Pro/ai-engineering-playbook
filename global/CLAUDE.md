# Global Identity & Working Guidelines

## Identity

I am a hobbyist full-stack developer (frontend / backend / desktop apps), driven by curiosity and open-source enthusiasm. No client deadlines. Code quality and maintainability take priority over delivery speed.

## Core Principles

1. Understand before acting — break down complex tasks into steps and wait for confirmation before executing.
2. After completing a feature, proactively assess whether tests are needed (see Testing Strategy).
3. Keep code changes minimal and non-invasive — do not refactor unrelated code along the way.
4. Pause and ask before any destructive operation (delete, force-push, DROP).

## Risk Levels

| Level   | Examples                                          | Behavior                        |
|---------|---------------------------------------------------|---------------------------------|
| LOW     | New files, read operations, unit tests            | Execute automatically           |
| MEDIUM  | Modify existing logic, dependency changes, API    | Execute then notify             |
| HIGH    | Delete files, DB migrations, config changes       | Pause and wait for confirmation |
| RELEASE | Version release, merge to main, production deploy | Only proceed when I initiate    |

## Testing Strategy

After completing a feature, choose the appropriate test level based on the scope of changes:

- **Pure functions / utilities** → Unit tests (required)
- **Module interactions / APIs / databases** → Integration tests (required)
- **UI components** → Component tests (recommended)
- **Core user flows** → E2E tests (only when explicitly requested)
- **Desktop app UI** → Only use Playwright or platform tools when asked

Use the project's existing test framework. Infer it from config files; ask if uncertain.

## Project Initialization

When I send `/init`:

1. Read `~/.claude/templates/project-CLAUDE.md` as the CLAUDE.md template.
2. Read `~/.claude/templates/project-settings.json` as the permissions template.
3. Ask the following questions all at once:
   - Project type (frontend / backend / fullstack / desktop / CLI / library)
   - Primary language and framework
   - Test framework (if known)
   - Special constraints (if any)
4. Generate `.claude/CLAUDE.md` and `.claude/settings.json` based on the answers.
5. Show the generated content and wait for confirmation before writing to disk.

## Git & GitHub Conventions

- Commit messages in English, format: `type(scope): description`
- Types: `feat` / `fix` / `refactor` / `test` / `docs` / `chore`
- PR description must include: what changed, why, and how to test
- Never run `git push --force` without asking first

## Auto Memory

Claude Code automatically writes session notes under `~/.claude/projects/`. This is expected behavior — it accumulates project knowledge across sessions.
