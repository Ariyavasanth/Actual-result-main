# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Orientation

- Start by reading the root documentation and nearby files before editing.
- Prefer existing project patterns over introducing new frameworks, helpers, or conventions.
- Keep changes focused on the user request. Avoid unrelated refactors, formatting churn, or metadata updates.
- Treat the working tree as shared with the user. Do not overwrite, revert, or delete changes you did not make unless explicitly asked.

## Project Stack

- Frontend: Angular 16
- Backend: Flask (Python)
- Database: Microsoft SQL Server
- UI: Angular Material

## Repository Structure

- Frontend: `edu-UI/`
- Backend: `backend/`
- Database scripts: `database/` (if applicable)

## Application Context

This is an exam management platform for schools, colleges, and corporate organizations.

Core modules include:

- Institutes
- Departments
- Teams
- Categories
- Question Banks
- Exams
- Exam Schedules
- Users

## Coding Rules

- Follow the existing Angular and Flask project structure.
- Reuse existing services, components, utilities, blueprints, and helpers before creating new ones.
- Do not rename files or folders unless requested.
- Do not change APIs or database schema unless required for the requested feature.
- Keep changes limited to the requested feature or fix.

## Scope of Changes

- Modify only the files required for the requested task.
- Avoid unrelated cleanup or refactoring.
- Preserve existing behavior unless the request explicitly changes it.

## Do Not Modify Unless Requested

- Do not change unrelated files.
- Do not change existing UI/UX unless the request requires it.
- Do not rename variables, methods, or components solely for style.
- Do not update package versions or dependencies unless requested.
- Do not remove existing comments or logging unless they are incorrect.

## Performance

- Avoid unnecessary API calls.
- Reuse existing observables and services where possible.
- Avoid duplicate database queries.
- Keep Angular change detection efficient.

## Angular Guidelines

- Prefer existing Angular Material components.
- Use Reactive Forms where the project already uses them.
- Keep HTML, TypeScript, and SCSS changes minimal and consistent with nearby files.
- Do not introduce new UI libraries.

## Flask Guidelines

- Reuse existing blueprints, services, and database access patterns.
- Follow the current API response format.
- Keep SQLAlchemy patterns consistent with the project where SQLAlchemy is already used.

## Database Guidelines

- Reuse existing SQLAlchemy models and repositories.
- Avoid unnecessary schema changes.
- Keep queries efficient.
- Maintain compatibility with Microsoft SQL Server.

## Error Handling

- Preserve existing error handling patterns.
- Return consistent API responses.
- Do not swallow exceptions silently.
- Add validation only where appropriate.

## Validation Rules

Before editing:

- Read the related files first.
- Explain the implementation plan if the task is complex.

After editing:

- Summarize changed files.
- Explain why each change was made.
- Mention any commands that should be run for verification.

## Development Workflow

- Inspect the relevant code path before making edits.
- Use fast search tools such as `rg` where available.
- Make the smallest coherent change that solves the problem.
- Update tests, fixtures, or documentation when behavior changes.
- If a command fails because dependencies are missing or the environment is not running, report that clearly instead of masking the failure.

## Verification

- Run the most relevant checks for the files you changed.
- Prefer targeted tests first, then broader suites when the change affects shared behavior.
- If you cannot run verification locally, include the reason and the exact command that should be run.

## Code Style

- Follow the style already present in each file.
- Keep names descriptive and consistent with surrounding code.
- Add comments only when they explain non-obvious intent or constraints.
- Avoid adding broad abstractions unless they remove real duplication or match an established pattern.

## Frontend Guidelines

- Match the existing design system and component conventions.
- Keep UI changes responsive and accessible.
- Avoid layout shifts, overlapping text, and controls whose labels do not fit.
- Use existing icon, styling, routing, and state-management patterns where present.

## Safety Rules

- Do not run destructive commands such as `git reset --hard`, recursive deletes, or forced checkouts unless the user explicitly requests them.
- Do not commit, push, install dependencies, or start long-running services unless that is needed for the task or requested by the user.
- Never place secrets, credentials, tokens, or private environment values in committed files.

## When Unsure

- If multiple implementation approaches are possible, explain the options briefly and choose the one that best matches the existing codebase.
- If required information is missing, ask for clarification instead of making assumptions.

## Response Format

For every completed task include:

1. Summary of changes
2. Files modified
3. Validation performed
4. Remaining risks or follow-up work

Do not include unnecessary explanations when the change is straightforward.
