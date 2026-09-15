# PHASE 1 — PROJECT SETUP & FOUNDATION
## Customer Feedback Intelligence — Frontend-First Version

You are continuing development of the Customer Feedback Intelligence project.

Act as a senior frontend engineer, Next.js architect, UI/UX engineer, and technical mentor with 10+ years of professional experience.

Your job in this phase is ONLY to establish the frontend project foundation.

Do not implement dashboard features, feedback functionality, charts, or backend functionality yet.

---

## 1. PHASE OBJECTIVE

The objective of Phase 1 is to create a clean, working Next.js frontend foundation with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Clerk authentication dependency/configuration
- Clean folder structure
- Environment variable structure
- Basic application shell
- Successful local development server

At the end of this phase, the project must start successfully and be ready for Phase 2.

---

## 2. IMPORTANT SCOPE RULE

ONLY work on Phase 1.

Do NOT implement:

- Dashboard
- Dashboard cards
- Charts
- Feedback table
- Feedback form
- Feedback filters
- Search
- Feedback details
- localStorage feedback system
- Mock feedback data
- Backend
- MongoDB
- Google Sheets
- n8n
- Gmail
- LLM
- Gemini
- Grok
- OpenAI
- RAG
- Embeddings
- Vector search
- Hybrid search
- RRF
- LangChain
- LangGraph
- MCP
- AI chatbot
- Automated routing
- Email notifications

These belong to future phases.

Do not introduce them during Phase 1.

---

## 3. TECHNOLOGY STACK

Use exactly:

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

### Authentication
- Clerk

### Package manager
Use the package manager already present in the project.

If creating a new project and no package manager has been selected, use npm.

Do not add additional libraries unless there is a clear Phase 1 requirement.

If another dependency appears necessary, STOP and explain why before adding it.

---

## 4. PROJECT CREATION

If the project does not exist yet, create a new Next.js application.

Recommended configuration:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- src directory: No
- Import alias: `@/*`

The project should use the Next.js App Router.

Do not use the Pages Router.

---

## 5. INITIAL PROJECT STRUCTURE

Create the foundation using this structure:

```text
customer-feedback-intelligence/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── sidebar/
│   ├── header/
│   ├── dashboard/
│   ├── charts/
│   ├── feedback/
│   ├── forms/
│   └── ui/
│
├── data/
│
├── lib/
│
├── types/
│
├── public/
│
├── .env.local
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

Do not create unnecessary folders simply for the sake of architecture.

Only create files that are required at this phase.

---

## 6. DEPENDENCIES

Install the required dependencies.

Required:

```text
@clerk/nextjs
recharts
```

Next.js, React, TypeScript, Tailwind CSS, and ESLint should already be configured by the Next.js project setup.

Do not install:

- axios
- redux
- zustand
- react-query
- prisma
- mongoose
- mongodb
- langchain
- zod
- framer-motion
- lucide-react
- shadcn/ui
- any chart library other than Recharts

unless explicitly approved later.

The goal is to keep the initial dependency set small.

---

## 7. CLERK CONFIGURATION

Clerk is part of this project from the beginning.

Install the official Clerk package for Next.js:

```text
@clerk/nextjs
```

Configure Clerk using environment variables.

Do NOT hard-code Clerk credentials.

Use:

```text
.env.local
```

The `.env.example` file must contain placeholders only.

Use the current Clerk-required environment variable names from the official Clerk Next.js documentation.

Do not invent environment variable names if the current Clerk documentation specifies different names.

Never commit:

```text
.env.local
```

---

## 8. CLERK ARCHITECTURE

Do not build custom authentication.

Clerk will handle:

- Sign in
- Sign up
- Sign out
- Session management
- User identity
- User profile

Phase 1 only needs the Clerk foundation/configuration.

Do NOT build the complete authentication UX yet.

The detailed authentication implementation belongs to Phase 2.

---

## 9. NEXT.JS ROOT LAYOUT

Create a clean root layout.

It should:

- define the HTML structure
- include the body
- configure basic metadata
- provide the Clerk provider where required by the current Clerk Next.js integration

Do not build dashboard navigation inside the root layout yet.

Do not create a sidebar yet.

Do not create a dashboard header yet.

---

## 10. HOME PAGE

Create a very simple initial landing page.

The page should communicate:

```text
Customer Feedback Intelligence

A manager-focused application for collecting and understanding customer feedback.

Sign in to continue.
```

This is only a temporary foundation page.

Do not build the final dashboard design yet.

The landing page can contain a simple link/button leading toward authentication.

Do not create a full marketing website.

---

## 11. GLOBAL STYLING

Configure the global stylesheet.

Establish only basic foundations:

- box sizing
- body margin
- font rendering
- basic background
- basic text defaults

Do not design the final dashboard yet.

Do not introduce complex design tokens.

Do not introduce a complete design system.

---

## 12. TYPESCRIPT CONFIGURATION

Maintain strict TypeScript configuration.

Do not disable strict mode.

Avoid:

```typescript
any
```

unless there is a genuinely unavoidable technical reason.

Do not create the Feedback type yet.

Feedback types belong to Phase 4.

---

## 13. ENVIRONMENT FILES

Create:

```text
.env.example
```

This file should show the environment variables required by the project.

Use the actual current Clerk variable names during implementation.

Never put real credentials into `.env.example`.

If `.env.local` is created, it must remain local and must not be committed.

---

## 14. GITIGNORE

Ensure `.gitignore` excludes sensitive/local files, especially:

```text
.env.local
.env*.local
node_modules
.next
```

Do not remove existing useful Next.js ignore rules.

---

## 15. README

Create/update the README with only the basic project information.

Include:

### Project Name

Customer Feedback Intelligence

### Current Purpose

Frontend-first customer feedback collection and manager dashboard.

### Current Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Clerk

### Current Phase

Phase 1 — Project Setup & Foundation

### Local Development

Document the command needed to start the development server.

Do not document future backend/AI architecture as implemented.

---

## 16. CODE QUALITY RULES

Follow these rules:

- Use meaningful filenames
- Use meaningful variable names
- Keep components small
- Avoid unnecessary abstraction
- Avoid duplicated configuration
- Avoid unused imports
- Avoid unused variables
- Do not create dead code
- Do not hard-code secrets
- Do not disable TypeScript rules to hide errors
- Do not disable ESLint rules unnecessarily

Keep the project easy to understand.

---

## 17. DESIGN RULES

Phase 1 is NOT the final UI design phase.

Therefore:

Do:

- clean
- simple
- readable
- responsive
- professional foundation

Do NOT:

- spend significant time designing charts
- create dashboard cards
- create complex animations
- create elaborate navigation
- create a full design system
- install UI libraries unnecessarily

Visual polish will happen later.

---

## 18. RESPONSIVE DESIGN

The basic foundation should work on:

- desktop
- laptop
- tablet
- mobile

Do not build desktop-only UI.

---

## 19. REQUIRED VALIDATION

After implementation, run:

```bash
npm run dev
```

Verify that the application starts successfully.

Then verify:

### Test 1 — Application Startup

Expected:

```text
Next.js development server starts successfully.
```

### Test 2 — Home Page

Open the local application.

Expected:

```text
Customer Feedback Intelligence
```

is visible.

### Test 3 — TypeScript

Run the appropriate project type-check/build validation.

There must be no TypeScript errors.

### Test 4 — ESLint

Run:

```bash
npm run lint
```

Fix actual lint issues.

Do not suppress errors unnecessarily.

### Test 5 — Production Build

Run:

```bash
npm run build
```

The project must build successfully.

### Test 6 — Clerk Configuration

Verify that the Clerk package is installed and the project is structured correctly for Clerk integration.

If real Clerk credentials are not yet available, do not invent them.

Do not claim authentication is working until real Clerk configuration has been tested.

---

## 20. DEFINITION OF DONE

Phase 1 is complete ONLY when:

- Next.js project exists
- App Router is configured
- TypeScript is working
- Tailwind CSS is working
- Recharts is installed
- Clerk package is installed
- Clerk environment structure exists
- `.env.local` is ignored
- `.env.example` exists
- Basic project structure exists
- Home page renders
- Development server starts
- ESLint passes
- TypeScript validation passes
- Production build passes

---

## 21. WHAT MUST NOT EXIST YET

At the end of Phase 1, do NOT implement:

```text
Dashboard
Feedback Analytics
Feedback Form
Feedback Table
Feedback Filters
Feedback Details
Mock Feedback Data
localStorage Feedback Service
Charts
Search
Category Pages
Backend
Database
AI
RAG
LLM
Chatbot
n8n
Google Sheets
Gmail
MongoDB
LangChain
LangGraph
Embeddings
Vector Search
```

These will be implemented later.

---

## 22. DEVELOPMENT WORKFLOW

Follow this exact workflow:

STEP 1
Inspect the current project/environment.

STEP 2
Determine whether the project already exists.

STEP 3
If it exists, do NOT recreate it.

STEP 4
If it does not exist, create the Next.js application.

STEP 5
Install only Phase 1 dependencies.

STEP 6
Create the required foundation structure.

STEP 7
Configure Clerk prerequisites.

STEP 8
Configure environment files.

STEP 9
Create the basic landing page.

STEP 10
Run the application.

STEP 11
Run lint/type/build validation.

STEP 12
Fix only Phase 1 issues.

STEP 13
Report the exact validation results.

STEP 14
STOP.

Do not automatically start Phase 2.

Wait for my confirmation.

---

## 23. IMPORTANT RULE FOR ERRORS

If an error occurs:

1. Read the actual error.
2. Identify the root cause.
3. Explain the cause briefly.
4. Make the smallest appropriate change.
5. Run the relevant test again.
6. Confirm the result.

Do not redesign the application because of a small error.

Do not add dependencies as a first response to an error.

---

## 24. IMPORTANT RULE FOR EXISTING PROJECTS

Before changing anything:

Inspect the existing project.

If files or configuration already exist:

- do not overwrite blindly
- do not delete working code
- do not recreate configuration unnecessarily
- explain what already exists
- modify only what is required for Phase 1

Preserve working code.

---

## 25. FINAL RESPONSE AFTER PHASE 1

After completing Phase 1, report:

### Completed

List only what was actually implemented.

### Files Created/Modified

List the important files.

### Dependencies

List dependencies actually installed.

### Validation

Report:

```text
Dev server: PASS/FAIL
TypeScript: PASS/FAIL
ESLint: PASS/FAIL
Production build: PASS/FAIL
Clerk setup: PASS/FAIL/NOT TESTED
```

### Next Phase

State:

```text
Phase 1 is complete.
Waiting for approval to begin Phase 2 — Clerk Authentication.
```

Do not begin Phase 2 automatically.

---

# START NOW

Begin with Phase 1.

First inspect the current project/environment.

Do not implement anything beyond Phase 1.
