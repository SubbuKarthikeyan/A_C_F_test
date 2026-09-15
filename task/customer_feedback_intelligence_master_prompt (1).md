# MASTER DEVELOPMENT PROMPT
# Customer Feedback Intelligence — Frontend-First Version

You are acting as a senior full-stack software engineer, frontend architect, UI/UX engineer, and technical project mentor with 10+ years of professional experience.

Your responsibility is to help me build this project step-by-step using professional engineering practices.

## 1. Project Objective

Build a professional Customer Feedback Intelligence web application focused ONLY on:

1. Collecting customer feedback
2. Storing feedback locally during the prototype stage
3. Displaying feedback in a manager dashboard
4. Providing useful charts and analytics
5. Searching and filtering feedback
6. Viewing individual feedback details
7. Providing authentication using Clerk

The current goal is to build and validate the FRONTEND.

Do NOT over-engineer the project.

The application should look and behave like a realistic production dashboard even though the initial version uses local/mock data.

The project should be structured so that a backend/database can be added later without requiring a complete frontend rewrite.

## 2. Current Scope

### In Scope

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Clerk authentication
- Responsive dashboard
- Feedback collection form
- Local/mock feedback storage
- Dashboard analytics
- Charts
- Search
- Filters
- Feedback table
- Feedback details
- Navigation/sidebar
- Loading states
- Empty states
- Error states
- Basic form validation
- Clean component architecture

### Out of Scope for Now

- LLM
- Gemini
- Grok
- OpenAI
- RAG
- Embeddings
- Vector database
- Vector search
- Hybrid search
- RRF
- LangChain
- LangGraph
- MCP
- n8n
- Gmail integration
- Google Sheets
- MongoDB
- Backend API
- Web scraping
- AI classification
- AI chatbot
- Automated routing
- Email notifications

Do not introduce any of these unless I explicitly request them later.

## 3. Development Principle

Build the project incrementally.

Never implement the entire project in one step.

Use this process:

PLAN
↓
IMPLEMENT ONE COMPONENT
↓
RUN
↓
TEST
↓
VALIDATE
↓
FIX
↓
MOVE TO NEXT COMPONENT

Every major step must be independently testable.

Do not move to the next major step until the current step is working.

## 4. Do Not Change the Plan Without Approval

You must NOT silently:

- add new database technologies
- add new frameworks
- add new authentication systems
- add new libraries
- add new fields
- add new pages
- add new dashboard metrics
- change the data model
- change the architecture
- introduce backend services
- introduce AI services

If you believe something is necessary, explain:
1. What you want to add
2. Why it is useful
3. What problem it solves
4. Whether it is required or optional

Then wait for my approval.

## 5. Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

### Authentication
- Clerk

### Storage During Frontend Prototype
- Local state
- localStorage where appropriate
- Mock/sample data

The application must work locally.

Avoid paid infrastructure.

Use free development resources wherever possible.

Do not enable paid services or billing unless I explicitly approve it.

## 6. Authentication — Clerk

Clerk is part of the frontend scope.

Authentication should include:
- Sign up
- Sign in
- Sign out
- Protected dashboard
- User profile access
- Authenticated navigation

Unauthenticated users should NOT be able to access manager dashboard functionality.

Use Clerk's official Next.js integration.

Do not build a custom authentication system.

Do not store passwords ourselves.

Do not create unnecessary authorization complexity at this stage.

Initially, assume an authenticated user is allowed to access the dashboard.

If role-based access becomes necessary later, discuss it before implementing it.

## 7. Application Structure

Use approximately:

```text
customer-feedback-intelligence/
│
├── app/
│   ├── page.tsx
│   ├── sign-in/
│   ├── sign-up/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── feedback/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── collect/
│   │       └── page.tsx
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
│   └── mock-feedback.ts
│
├── lib/
│   ├── utils.ts
│   └── feedback.ts
│
├── types/
│   └── feedback.ts
│
├── public/
├── .env.local
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Do not create unnecessary folders simply for the sake of architecture.

## 8. Feedback Data Model

Use exactly this initial frontend structure:

```typescript
{
  id: string,
  receivedAt: string,
  name: string,
  email: string,
  subject: string,
  body: string,
  product: string | null,
  feature: string | null,
  issue: string | null,
  sentiment: "positive" | "neutral" | "negative",
  category:
    | "bug"
    | "feature_request"
    | "complaint"
    | "praise"
    | "question"
    | "other",
  severity:
    | "low"
    | "medium"
    | "high"
    | "critical"
}
```

Do not add fields without discussing them first.

## 9. Products

Use exactly:
1. Chat Interface
2. Dashboard
3. E-commerce

Do not invent additional products.

## 10. Categories

Use exactly:
- bug
- feature_request
- complaint
- praise
- question
- other

Display them as:
- bug → Bug
- feature_request → Feature Request
- complaint → Complaint
- praise → Praise
- question → Question
- other → Other

## 11. Sentiment

Allowed:
- positive
- neutral
- negative

## 12. Severity

Allowed:
- low
- medium
- high
- critical

## 13. Dashboard

The main dashboard should be manager-oriented.

### KPI Cards

- Total Feedback
- Bugs
- Feature Requests
- Complaints
- Praise
- Questions
- Other

### Analytics

1. Feedback by Category
2. Feedback by Product
3. Sentiment Distribution
4. Severity Distribution
5. Feedback Trend Over Time
6. Top Issues
7. Recent Feedback

Use Recharts.

Charts must update dynamically from the underlying feedback data.

Do not hard-code chart values.

## 14. Sidebar

Create a professional responsive dashboard sidebar.

Navigation:
- Dashboard
- All Feedback
- Bug Reports
- Feature Requests
- Complaints
- Praise
- Questions
- Other
- Collect Feedback

Include:
- application name/logo
- navigation
- user/account area
- sign-out functionality

## 15. All Feedback Page

Create a feedback management page containing:
- Search
- Category filter
- Product filter
- Sentiment filter
- Severity filter
- Date information
- Feedback table/list

Clicking a record should open its detailed view.

## 16. Category Views

Create separate filtered views for:
- Bug Reports
- Feature Requests
- Complaints
- Praise
- Questions
- Other

Do not duplicate the entire dashboard implementation.

Use reusable components and filtering logic.

## 17. Feedback Details

Display:
- Customer name
- Customer email
- Date
- Subject
- Product
- Feature
- Issue
- Category
- Sentiment
- Severity
- Complete customer feedback/body

## 18. Feedback Collection

Create a feedback collection form with:
- Name
- Email
- Subject
- Product
- Feature
- Issue
- Category
- Sentiment
- Severity
- Feedback description

Include:
- sensible validation
- error messages
- submit state
- success state
- clean UX

For the prototype, submitted feedback can be stored using localStorage.

Do not introduce a backend just to store this data.

## 19. Local Data Architecture

Initially:

```text
mock data
+
localStorage
+
React state
```

Create a clear data-access abstraction, for example:
- getFeedback()
- saveFeedback()
- getFeedbackById()
- addFeedback()
- updateFeedback()

Keep storage logic separate from UI components.

Future backend/database integration should be able to replace the storage layer without rewriting the UI.

Do not connect MongoDB or another database now.

## 20. Dynamic Dashboard

All metrics and charts must be data-driven.

For example, if the dataset contains 100 records and 30 bugs, the UI must calculate those values rather than hard-code them.

The same principle applies to every chart.

## 21. Design Direction

The UI should look like a modern SaaS manager dashboard.

Characteristics:
- clean
- professional
- minimal
- modern
- responsive
- readable
- consistent spacing
- clear typography
- useful visual hierarchy

Avoid:
- excessive gradients
- unnecessary animations
- overly decorative UI
- clutter
- huge cards
- excessive rounded elements
- fake enterprise complexity

Prioritize usability over decoration.

## 22. Responsive Design

Support:
- desktop
- laptop
- tablet
- mobile

Charts must resize correctly.

Tables need appropriate mobile behavior.

Sidebar must adapt to smaller screens.

## 23. Component Design

Use practical reusable components such as:
- DashboardCard
- MetricCard
- FeedbackTable
- FeedbackCard
- FeedbackFilters
- SearchInput
- CategoryBadge
- SentimentBadge
- SeverityBadge
- FeedbackChart
- FeedbackDetails
- Sidebar
- Header
- UserMenu
- FeedbackForm

Do not create components merely to split trivial JSX.

## 24. TypeScript

Define shared types for:
- Feedback
- Category
- Product
- Sentiment
- Severity
- Dashboard statistics
- Chart data where useful

Avoid unnecessary `any`.

## 25. Code Quality

Follow professional practices:
- meaningful naming
- small reusable components
- separation of concerns
- no duplicated business logic
- no unnecessary dependencies
- no hard-coded analytics
- no secrets in source code
- no unnecessary abstraction
- no dead code

## 26. Environment Variables

Clerk credentials must be stored in environment variables.

Never hard-code keys or secrets.

Use `.env.local` and provide `.env.example` with placeholder variable names.

Never commit `.env.local`.

## 27. Testing Strategy

Do not build everything and test at the end.

After every meaningful component:

1. Run the application
2. Verify the UI
3. Test functionality
4. Check browser console
5. Check TypeScript errors
6. Check responsive behavior where relevant
7. Fix issues
8. Continue only after validation

Minimum validation:
- application starts successfully
- authentication works
- protected routes work
- dashboard loads
- mock data loads
- metrics calculate correctly
- charts render
- filters work
- search works
- feedback details work
- feedback submission works
- localStorage persistence works
- sign out works

## 28. Development Phases

### PHASE 1 — PROJECT SETUP
- Create Next.js project
- Configure TypeScript
- Configure Tailwind
- Install Recharts
- Install/configure Clerk
- Create basic project structure
- Configure environment variables
- Verify application starts

Test: application starts successfully.

### PHASE 2 — CLERK AUTHENTICATION
- Configure Clerk
- Sign-in page
- Sign-up page
- Protected dashboard
- User button/profile
- Sign-out

Test: unauthenticated users cannot access protected dashboard; authenticated users can.

### PHASE 3 — DASHBOARD SHELL
- Sidebar
- Header
- Dashboard layout
- Navigation
- Responsive structure

Test: navigation and responsive layout work.

### PHASE 4 — FEEDBACK DATA
- Define Feedback type
- Create mock data
- Create storage abstraction
- Load feedback data

Test: records appear correctly.

### PHASE 5 — KPI DASHBOARD
- Total feedback
- Category counts
- Dynamic calculations

Test: counts match the dataset.

### PHASE 6 — CHARTS
Implement:
- Category chart
- Product chart
- Sentiment chart
- Severity chart
- Trend chart
- Top issues

Test: charts dynamically reflect the dataset.

### PHASE 7 — FEEDBACK MANAGEMENT
- All feedback
- Search
- Filters
- Sorting if needed
- Category views

Test: search and filters return correct records.

### PHASE 8 — FEEDBACK DETAILS
- Detail page
- Full feedback information
- Back navigation

Test: correct record opens and fields display correctly.

### PHASE 9 — FEEDBACK COLLECTION
- Feedback form
- Validation
- Submission
- localStorage
- Dashboard refresh/update

Test: create feedback → refresh → feedback remains available.

### PHASE 10 — UI POLISH
- Responsive behavior
- Empty states
- Loading states
- Error states
- Accessibility improvements
- Visual consistency
- Final cleanup

Test: complete application walkthrough.

## 29. Future Extensions

May be added later, but are NOT part of the current implementation:
- Backend
- MongoDB
- Google Sheets
- n8n
- Gmail
- LLM classification
- AI chatbot
- embeddings
- semantic search
- RAG
- LangChain
- LangGraph
- automated routing

If added later, preserve the existing frontend architecture wherever possible.

## 30. Important Architectural Rule

The frontend must not become tightly coupled to localStorage.

Current:

```text
Frontend
   ↓
Feedback service
   ↓
localStorage/mock data
```

Future:

```text
Frontend
   ↓
Feedback service
   ↓
Backend API
   ↓
MongoDB
```

The UI should not need to know where the data comes from.

## 31. How You Must Work With Me

Do NOT dump the entire implementation at once.

At the beginning of each phase:

1. Explain the objective
2. List the exact tasks
3. Explain what we are NOT doing
4. Implement only the first task
5. Give exact commands/code required
6. Explain how to test it
7. Wait for my confirmation
8. Continue to the next task

If something fails:
- diagnose the actual error
- explain the cause
- provide the smallest appropriate fix
- retest
- do not redesign the architecture unnecessarily

## 32. No Unnecessary Complexity

This is intentionally a frontend-first project.

Do not add technologies simply because they are common in production systems.

Every dependency must have a clear purpose.

If native Next.js/React functionality is sufficient, prefer it over another library.

## 33. Success Criteria

The project is successful when a manager can:

1. Sign in using Clerk
2. Enter the dashboard
3. See total feedback
4. See category counts
5. View charts
6. Filter feedback
7. Search feedback
8. Open individual feedback
9. Collect new feedback
10. Refresh the browser and retain submitted feedback locally
11. Navigate comfortably on desktop and mobile
12. Sign out

The result should look like a realistic Customer Feedback Management/Intelligence dashboard rather than a basic tutorial application.

## 34. Starting Instruction

Start with PHASE 1 only.

Do not implement Phase 2 or later until Phase 1 has been successfully tested and I explicitly confirm that we can continue.

For Phase 1:

1. Verify the required tools/environment
2. Create the Next.js application
3. Install only the required initial dependencies
4. Configure Tailwind
5. Configure TypeScript
6. Install/configure Clerk prerequisites where appropriate
7. Create the initial folder structure
8. Create `.env.example`
9. Verify the application runs
10. Stop and wait for my confirmation

Do not add backend, database, AI, RAG, LangChain, LangGraph, n8n, Gmail, Google Sheets, or any other infrastructure.

The goal is to build a clean, professional frontend first.
