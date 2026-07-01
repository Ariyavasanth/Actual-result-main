# edu-assessment-app — Project Overview

This document gives a concise developer-friendly overview of the project structure, backend API surface, frontend architecture and how the pieces interact. It also contains quick start and troubleshooting notes.

## Quick summary
- Full-stack educational assessment portal.
- Backend: Python Flask microservice with SQLite (SQLAlchemy), JWT-based auth.
- Frontend: Angular 16 + Material-based single page app. Standalone components bootstrapped from `main.ts`.

## Repository layout (important files)
- backend/
  - app.py — Flask app and API routes (registered under `/edu/api`)
  - auth/ — authentication helpers and JWT validator
  - db/ — SQLite wrapper and DB helpers
  - others/ — feature modules: institutes, users, exams, questions (CRUD helpers)
- frontend/edu-UI/
  - src/main.ts — Angular bootstrap
  - src/app/ — Angular app (routing, modules, components)
  - package.json — frontend dependencies and scripts

## Backend API endpoints (from `backend/app.py`)
All endpoints are registered under `/edu/api`.

- POST /edu/api/register-institute — protected (jwt)
- GET  /edu/api/get-institutes — protected (jwt)
- GET  /edu/api/get-institute-list — protected (jwt)
- POST /edu/api/register-user — protected (jwt)
- GET  /edu/api/get-users — protected (jwt)
- GET  /edu/api/get-exams-list — protected (jwt) (optional query param: institute_id)
- GET  /edu/api/get-exams-details — protected (jwt) (optional query param: institute_id)
- GET  /edu/api/launch-exam — protected (jwt) (query params: exam_id, user_id)
- POST /edu/api/submit-exam — protected (jwt)
- POST /edu/api/add-exam — protected (jwt)
- POST /edu/api/add-question — protected (jwt)
- GET  /edu/api/get-questions-details — protected (jwt) (query params: institute_id, exam_id)
- POST /edu/api/login — public
- POST /edu/api/logout — protected (jwt)

Notes: The backend enforces JWT validation via the `auth.JWTValidator` helper. Login issues and token validation details are handled in `backend/auth/auth.py`.

## Frontend architecture
- `main.ts` bootstraps the Angular app using `AppModule`.
- `AppModule` imports `SharedModule`, `AppRoutingModule`, `BrowserAnimationsModule`, and `HttpClientModule`.
- The top-level layout is in `src/app/app.component.html`.
  - `app-navbar-main` — top navigation
  - `app-side-nav` — side navigation
  - `router-outlet` — main content (pages per role)

Key frontend modules and pages (high level)
- userrole/super-admin/institute — view/register/manage institutes
- userrole/admin — admin dashboards and user management
- exams — creation, scheduling, listing, and student runner
- questions — authoring and listing

## Authentication & session
- Login: POST /edu/api/login returns JWT and user metadata.
- Client stores token in sessionStorage/localStorage (check frontend code for exact key).
- Protected routes call backend with Authorization: Bearer <token> header.
- Logout: POST /edu/api/logout invalidates session entries server-side.

## How to run (local development)
1. Backend (Python)
   - Requires Python 3.11+ (project was developed on 3.11). Create a virtualenv and install dependencies used by backend modules (Flask, SQLAlchemy, PyJWT, cryptography, passlib, pandas, requests). Example (Windows PowerShell):

     python -m venv .venv; .\.venv\Scripts\Activate; pip install -r backend/requirements.txt

   - If there is no `requirements.txt`, install at least:
     Flask, Flask-Cors, PyJWT, SQLAlchemy, cryptography, passlib, pandas, requests

   - Run backend:

     python backend/app.py

   - By default the server listens on port 5001 and CORS allows `http://localhost:4200`.

2. Frontend (Angular)
   - Node.js 18+ and npm installed.
   - From `frontend/edu-UI`:

     npm install
     npm start

   - App serves on `http://localhost:4200` by default.

## Component & API mapping (common flows)
- Login page -> calls `/edu/api/login` -> stores token -> navigates to dashboard
- Super-admin -> Institutes list (`/get-institutes`) -> View details (in-template modal) shows many fields including city/state/pincode
- Admin -> Create user (`/register-user`) with role-specific fields
- Exams -> add/exam/list/launch/submit endpoints drive the exam lifecycle

## Frontend component map (where to look)
- Top-level layout: `src/app/app.component.html` (contains `<app-navbar-main>` and `<app-side-nav>`)
- Navbar: `src/app/shared/components/navbar-main/` (TS + SCSS)
- Side navigation: `src/app/shared/components/side-nav/` (menus and routing)
- Institutes (super-admin): `src/app/userrole/super-admin/institute/view-institutes/` and `institute-register/`
- User management (admin): `src/app/userrole/admin/` (register, list)
- Exams and Questions: `src/app/.../exams/` and `.../questions/` (search for `add-exam`, `add-question` components)


## Notes & caveats
- JWT decorator in `backend/app.py` currently has an early `return f(*args, **kwargs)` which bypasses validation — that looks like a bug; review the `jwt_required` decorator for correctness.
- Some parts use Django-style imports in `auth/auth.py` (`from django import db`) — ensure environment/setup is consistent or refactor to plain SQLAlchemy usage.
- Database file is `backend/db/edu.db` (SQLite). Back up before schema migrations.

## Next steps (suggested)
- Add a `backend/requirements.txt` capturing used Python packages.
- Add frontend `README.md` with npm scripts and environment variable instructions (API base URL etc.).
- Add automated smoke test script or Angular e2e tests to validate key flows.
- Fix the `jwt_required` decorator so validation is enforced.

## Security note: jwt_required decorator
During review a logic issue was found in `backend/app.py` where the `jwt_required` decorator returns the wrapped function early and bypasses validation. This makes protected endpoints public. Suggested quick fix:

Replace the decorator body with logic that validates first and only calls the wrapped function on success. Example (high level):

```python
def jwt_required(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    validation_result = initialize_jwt_validator(request)
    if validation_result != "Access granted":
      return jsonify({"status": False, "error": validation_result}), 401
    return f(*args, **kwargs)
  return decorated_function
```

After applying this change, run the backend and test login + a protected endpoint to confirm 401 is returned without a valid token.


For sequence diagrams and visual flows, see `DOCS/DIAGRAMS.md`.
