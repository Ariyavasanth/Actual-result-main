# Diagrams and Flowcharts

This file contains Mermaid diagrams for key flows: Authentication, Exam lifecycle, and Admin institute management. You can paste these into a Mermaid-enabled editor (VS Code Mermaid preview, GitHub markdown, or Mermaid Live Editor) to render diagrams.

## 1) Authentication flow

```mermaid
sequenceDiagram
  participant FE as Frontend (Browser)
  participant API as Backend (Flask)
  participant DB as SQLite

  FE->>API: POST /edu/api/login {email,password}
  API->>DB: query user and credential
  DB-->>API: user row + credential
  API->>API: verify password (argon2)
  API->>DB: insert AppSession (user_id, token)
  API-->>FE: 200 {token, user}
  FE->>FE: store token (sessionStorage/localStorage)
  FE->>API: GET /edu/api/get-institutes (Authorization: Bearer <token>)
  API->>API: validate token
  API->>DB: fetch institutes
  DB-->>API: institutes list
  API-->>FE: institutes payload
```

## 2) Exam lifecycle

```mermaid
sequenceDiagram
  participant Admin as Admin UI
  participant API as Backend (Flask)
  participant DB as SQLite
  participant Student as Student UI

  Admin->>API: POST /edu/api/add-exam {exam meta}
  API->>DB: insert exam
  DB-->>API: exam created
  API-->>Admin: 201 OK

  Student->>API: GET /edu/api/get-exams-list?institute_id=1
  API->>DB: select exams for institute
  DB-->>API: exams list
  API-->>Student: exams payload

  Student->>API: GET /edu/api/launch-exam?exam_id=123&user_id=456
  API->>DB: fetch exam+questions
  DB-->>API: exam details
  API-->>Student: exam data (questions, time etc.)

  Student->>API: POST /edu/api/submit-exam {answers, meta}
  API->>DB: save submissions and score
  DB-->>API: commit
  API-->>Student: submission confirmation
```

## 3) Institute management (view/edit)

```mermaid
flowchart TD
  A[Super-admin UI: View Institutes] -->|GET /edu/api/get-institutes| B[API]
  B --> C[DB]
  C --> B
  B --> A
  A -->|Click View| D[Detail modal]
  D -->|Edit (optional)| E[PUT/POST to /edu/api/register-institute? or /register-institute]
  E --> B
  B --> C
  C --> B
  B --> A
```

## How to render
- Use VS Code Mermaid preview extension, or open on mermaid.live to paste the diagrams.

