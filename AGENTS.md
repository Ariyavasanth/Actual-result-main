# AGENTS.md

## Project

Exam management platform.

Stack:
- Angular 16
- Flask
- Microsoft SQL Server
- Angular Material

Structure:
- edu-UI/
- backend/
- database/

Core modules:
- Institutes
- Departments
- Teams
- Categories
- Question Banks
- Exams
- Exam Schedules
- Users

## Before Editing

- Read the relevant files first.
- Follow existing project patterns.
- Keep changes limited to the requested feature.
- Explain the implementation plan if the task is complex.

## Coding Guidelines

- Reuse existing components, services, helpers, and blueprints.
- Do not rename files, methods, variables, or APIs unless requested.
- Do not modify database schema unless required.
- Avoid unrelated refactoring or formatting.
- Keep changes minimal and consistent with surrounding code.

## Angular

- Use existing Angular Material components.
- Follow existing Reactive Forms patterns.
- Keep HTML, TS, and SCSS changes consistent.
- Avoid unnecessary change detection or API calls.

## Flask

- Reuse existing blueprints and SQLAlchemy models.
- Keep API response format consistent.
- Preserve existing error handling.

## Verification

After completing work:

1. Summary of changes
2. Files modified
3. Validation performed
4. Remaining risks or follow-up work

If verification cannot be run, explain why and provide the command to run.

## Safety

- Never run destructive Git commands unless requested.
- Never expose secrets or credentials.
- Do not install dependencies or start services unless required.