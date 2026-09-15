# Customer Feedback Intelligence
## Phase 3 — Dashboard Shell

### 1. Objective

Build the **frontend dashboard shell** for the Customer Feedback Intelligence application.

Phase 2 authentication is already completed and must remain intact.

The goal of this phase is to create the reusable application layout that later phases will use for feedback analytics and management.

This phase focuses ONLY on:

- Dashboard layout
- Sidebar navigation
- Header
- Responsive structure
- Authenticated user area
- Page routing/navigation
- Reusable layout components
- Basic loading/empty/error UI foundations

Do not implement feedback data, analytics, charts, KPI calculations, or feedback management yet.

---

# 2. Phase Scope

## Included

- Authenticated dashboard layout
- Sidebar
- Header/top bar
- Main content area
- Responsive desktop/tablet/mobile behavior
- Navigation links
- Active navigation state
- Clerk user/account UI
- Sign-out through Clerk
- Basic placeholder pages
- Reusable layout components
- Basic loading state
- Basic empty state
- Basic error state
- Accessibility basics

## NOT Included

Do not implement:

- Feedback data model
- Mock feedback data
- LocalStorage feedback
- Feedback service
- Feedback collection form
- Feedback table
- Feedback details
- KPI calculations
- Charts
- Recharts
- Analytics
- Search
- Filters
- AI/LLM
- RAG
- Embeddings
- Vector database
- Backend/API
- MongoDB
- n8n
- Gmail
- Google Sheets
- Automated classification
- Role-based permissions
- Admin/manager authorization
- Final visual polish

Phase 3 is the **application shell only**.

---

# 3. Existing Stack

Continue using the existing stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- Recharts dependency may already exist from Phase 1, but do not use it in this phase.

Do not introduce unnecessary dependencies.

Do not add a UI framework unless explicitly approved.

---

# 4. Authentication Requirement

Phase 2 authentication must continue working.

The dashboard shell must be available only to authenticated users.

Do not replace or rewrite the Clerk authentication implementation unless required by the current Clerk/Next.js version.

Clerk remains responsible for:

- Authentication
- Session
- User identity
- Sign out
- Account management

The dashboard shell is responsible only for application layout and navigation.

---

# 5. Dashboard Layout

Create the main authenticated application structure:

```text
┌──────────────────────────────────────────────┐
│ Header / User Area                            │
├───────────────┬──────────────────────────────┤
│               │                              │
│   Sidebar     │       Main Content           │
│               │                              │
│   Navigation  │                              │
│               │                              │
└───────────────┴──────────────────────────────┘
```

The layout must be reusable across dashboard pages.

Avoid duplicating the sidebar and header in every page.

---

# 6. Sidebar Navigation

Create a reusable sidebar.

The sidebar should contain the planned application navigation:

```text
Dashboard

All Feedback

Bug Reports
Feature Requests
Complaints
Praise
Questions
Other

Collect Feedback
```

Use appropriate routes:

```text
/dashboard
/dashboard/feedback
/dashboard/feedback?category=bug
/dashboard/feedback?category=feature_request
/dashboard/feedback?category=complaint
/dashboard/feedback?category=praise
/dashboard/feedback?category=question
/dashboard/feedback?category=other
/dashboard/collect
```

Important:

These routes are only navigation targets during Phase 3.

Do not implement their actual feedback functionality yet.

If a route is needed for navigation testing, create a simple placeholder page.

Do not create separate duplicated implementations for each category.

Later phases will implement reusable filtered feedback views.

---

# 7. Sidebar Design

The sidebar should:

- Be clearly separated from the main content
- Show the application name
- Show navigation items
- Indicate the active route
- Be usable with keyboard navigation
- Work on smaller screens

Example structure:

```text
Customer Feedback
Intelligence

Dashboard

Feedback
  All Feedback
  Bug Reports
  Feature Requests
  Complaints
  Praise
  Questions
  Other

Collect Feedback
```

The exact visual design can be simple.

Do not spend time on advanced animations.

---

# 8. Header

Create a reusable dashboard header.

The header should provide:

- Page/application context
- Authenticated user area
- Clerk user/account component

Use Clerk's official user/account UI.

Do not build a custom profile menu.

Do not manually implement sign-out.

---

# 9. User Area

The authenticated user area should use Clerk.

It should allow the user to:

- View their account
- Access account management
- Sign out

Do not create custom user data storage.

Do not store:

```text
password
session
JWT
authentication token
```

in application state or localStorage.

---

# 10. Main Content Area

Create a reusable main content container.

It should support pages with:

- Page title
- Optional page description
- Content sections
- Cards
- Tables later
- Charts later

For Phase 3, use placeholder content only.

Example:

```text
Dashboard

Customer feedback overview will appear here.
```

The actual dashboard will be implemented in later phases.

---

# 11. Responsive Behavior

The shell must work on:

### Desktop

```text
Sidebar + Header + Main Content
```

### Tablet

The sidebar may become narrower or collapsible.

### Mobile

Use a mobile-friendly navigation approach such as:

```text
Header
  Menu button

Main content
```

The sidebar should not permanently consume most of the mobile screen.

Do not add a complex third-party drawer library.

Use simple responsive Tailwind CSS behavior.

---

# 12. Mobile Navigation

On small screens:

- Sidebar should be hidden or collapsed by default
- A menu button should allow access to navigation
- Navigation should close after selecting a route when appropriate
- Main content should remain usable without horizontal scrolling

Keep the implementation simple.

Do not add unnecessary animation libraries.

---

# 13. Active Navigation

The current route should be visually identifiable.

For example:

```text
Dashboard        ← active
All Feedback
Bug Reports
Feature Requests
```

The active state should update automatically based on the current route.

Do not hard-code the active item.

Use Next.js routing utilities appropriate to the current App Router implementation.

---

# 14. Navigation Architecture

Create navigation from a centralized configuration where practical.

For example:

```ts
const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "All Feedback",
    href: "/dashboard/feedback",
  },
];
```

The category navigation can use the same feedback route with query parameters.

Do not duplicate entire pages for:

```text
Bug Reports
Feature Requests
Complaints
Praise
Questions
Other
```

Later phases will use the category parameter to filter the same feedback view.

---

# 15. Component Architecture

Create reusable components where they provide clear value.

Suggested structure:

```text
components/
├── layout/
│   ├── dashboard-layout.tsx
│   ├── dashboard-header.tsx
│   └── dashboard-main.tsx
│
├── sidebar/
│   ├── dashboard-sidebar.tsx
│   ├── sidebar-nav.tsx
│   └── navigation-config.ts
│
└── ui/
    ├── loading-state.tsx
    ├── empty-state.tsx
    └── error-state.tsx
```

The exact filenames may differ if the existing project architecture has a better equivalent.

Do not create components only for the sake of increasing the number of files.

---

# 16. Dashboard Route

Keep:

```text
/dashboard
```

as the primary authenticated dashboard route.

Replace the Phase 2 authentication placeholder with a simple dashboard shell demonstration.

Example:

```text
Dashboard

Welcome to Customer Feedback Intelligence.

Dashboard analytics will be added in later phases.
```

Do not implement analytics.

---

# 17. Placeholder Routes

Create only the routes needed to validate navigation.

At minimum:

```text
/dashboard
/dashboard/feedback
/dashboard/collect
```

For category navigation, use the reusable feedback route:

```text
/dashboard/feedback?category=bug
/dashboard/feedback?category=feature_request
/dashboard/feedback?category=complaint
/dashboard/feedback?category=praise
/dashboard/feedback?category=question
/dashboard/feedback?category=other
```

The feedback page can display:

```text
Feedback Management

This section will be implemented in a later phase.
```

The collect page can display:

```text
Collect Feedback

The feedback form will be implemented in a later phase.
```

Do not create actual forms or tables.

---

# 18. URL Query Parameters

The sidebar category links should use the planned query parameter:

```text
category
```

Examples:

```text
/dashboard/feedback?category=bug
/dashboard/feedback?category=feature_request
/dashboard/feedback?category=complaint
```

Do not implement filtering logic yet.

The purpose of this phase is to establish the navigation structure.

---

# 19. Loading State

Create a reusable basic loading state.

Example:

```text
Loading...
```

Use Next.js App Router loading conventions where appropriate.

The component should be reusable by later phases.

Do not build skeleton screens yet unless they are trivial.

---

# 20. Empty State

Create a reusable empty-state component.

Example:

```text
No data available

There is nothing to display yet.
```

This will later be used for feedback and analytics sections.

Do not connect it to real data in Phase 3.

---

# 21. Error State

Create a basic reusable error state compatible with the Next.js App Router error handling approach.

Example:

```text
Something went wrong.

Try again.
```

The retry behavior should follow normal Next.js conventions.

Do not build a complex error-reporting system.

---

# 22. Accessibility

Implement basic accessibility:

- Use semantic HTML
- Use accessible button labels
- Ensure menu buttons have accessible names
- Ensure navigation is keyboard accessible
- Maintain reasonable focus behavior
- Do not rely only on color to communicate active navigation
- Use appropriate heading hierarchy

Do not over-engineer accessibility infrastructure.

---

# 23. Styling

Use Tailwind CSS.

The visual direction should be:

- Clean
- Professional
- Manager-oriented
- Minimal
- Responsive
- Easy to scan

Use a consistent spacing system.

Avoid:

- Excessive gradients
- Excessive animations
- Decorative effects that do not improve usability
- Large amounts of custom CSS

Final visual polish is a later phase.

---

# 24. No Data Layer Yet

Do not create:

```text
types/feedback.ts
data/mock-feedback.ts
lib/feedback.ts
```

unless one of them is genuinely required by existing Phase 2/3 implementation.

The feedback data layer belongs to:

```text
Phase 4 — Feedback Data Layer
```

Do not create fake analytics values.

---

# 25. No Hard-Coded Analytics

Do not add:

```text
Total Feedback: 245
Bugs: 32
Positive: 110
```

or any other fake KPI values.

No charts should be rendered in this phase.

No Recharts components should be implemented.

---

# 26. TypeScript Requirements

Use TypeScript throughout.

Avoid:

```ts
any
```

unless technically unavoidable.

Keep component props explicitly typed.

Do not introduce unnecessary global types.

---

# 27. Code Quality

Follow these principles:

- Reuse components
- Avoid duplicated layout code
- Keep navigation configuration centralized
- Keep components focused
- Use meaningful names
- Keep routing predictable
- Avoid unnecessary dependencies
- Keep the architecture understandable

Do not over-engineer the dashboard shell.

---

# 28. Validation / Testing

Phase 3 is not complete until the following tests pass.

## Test 1 — Development Server

Run:

```bash
npm run dev
```

Confirm:

- Application starts
- No runtime errors

---

## Test 2 — Authentication

Confirm Phase 2 still works:

- Sign in
- Access `/dashboard`
- Sign out
- `/dashboard` becomes protected again

Do not break Clerk authentication while implementing the shell.

---

## Test 3 — Dashboard Shell

Open:

```text
/dashboard
```

Confirm:

- Sidebar appears
- Header appears
- Main content appears
- User/account UI appears
- Dashboard content renders

---

## Test 4 — Sidebar Navigation

Test every navigation item:

```text
Dashboard
All Feedback
Bug Reports
Feature Requests
Complaints
Praise
Questions
Other
Collect Feedback
```

Confirm each navigation action reaches the expected route.

---

## Test 5 — Category Routes

Confirm these URLs load:

```text
/dashboard/feedback?category=bug
/dashboard/feedback?category=feature_request
/dashboard/feedback?category=complaint
/dashboard/feedback?category=praise
/dashboard/feedback?category=question
/dashboard/feedback?category=other
```

No filtering functionality is required yet.

---

## Test 6 — Active Navigation

Navigate between pages.

Confirm:

- Active navigation item changes
- Active state is not hard-coded
- Category navigation behaves consistently

---

## Test 7 — Mobile Layout

Test a mobile viewport.

Confirm:

- Sidebar does not permanently occupy the screen
- Menu can be opened
- Navigation remains usable
- Main content fits the viewport
- No unnecessary horizontal scrolling

---

## Test 8 — Tablet/Desktop Layout

Test tablet and desktop widths.

Confirm:

- Sidebar layout works
- Header works
- Main content remains readable
- No overlapping components

---

## Test 9 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 10 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 11 — Production Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

---

# 29. Phase 3 Definition of Done

Phase 3 is complete only when:

- [ ] Dashboard shell exists
- [ ] Sidebar exists
- [ ] Header exists
- [ ] Main content area exists
- [ ] Clerk user/account UI still works
- [ ] Sign-out still works
- [ ] Dashboard remains protected
- [ ] Navigation is reusable
- [ ] Active navigation state works
- [ ] All planned navigation links work
- [ ] Category URLs use the `category` query parameter
- [ ] Feedback and collect pages are simple placeholders
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Loading state foundation exists
- [ ] Empty state foundation exists
- [ ] Error state foundation exists
- [ ] Basic accessibility requirements are satisfied
- [ ] No feedback data layer was implemented
- [ ] No analytics were implemented
- [ ] No charts were implemented
- [ ] No fake KPI values were added
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 30. Explicit Stop Point

After completing and validating Phase 3:

**STOP.**

Do not begin Phase 4.

Do not implement:

- Feedback types
- Mock feedback data
- LocalStorage
- Feedback service
- Feedback CRUD
- KPI calculations
- Charts
- Analytics
- Feedback table
- Feedback form

The next phase will be:

```text
Phase 4 — Feedback Data Layer
```

Proceed to Phase 4 only after Phase 3 has been explicitly reviewed and approved.
