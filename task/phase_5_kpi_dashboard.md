# Customer Feedback Intelligence
## Phase 5 — KPI Dashboard

### 1. Objective

Implement the **KPI dashboard layer** for the Customer Feedback Intelligence application.

Phase 4 has established the feedback data layer using TypeScript types, mock data, and localStorage persistence.

Phase 5 now connects that data to the dashboard and displays dynamically calculated KPI cards.

The key requirement is:

> **All KPI values must be calculated from the actual feedback data returned by the feedback data layer.**

Do not hard-code statistics.

---

# 2. Phase Scope

## Included

- Dashboard KPI section
- Dynamic KPI calculations
- Total Feedback KPI
- Bugs KPI
- Feature Requests KPI
- Complaints KPI
- Praise KPI
- Questions KPI
- Other KPI
- Reusable KPI card component
- KPI calculation utilities
- Loading state
- Empty-data handling
- Error handling where appropriate
- Responsive KPI layout
- Validation against the Phase 4 dataset

## NOT Included

Do not implement:

- Charts
- Recharts
- Feedback trend chart
- Sentiment chart
- Severity chart
- Product chart
- Top issues
- Recent feedback
- Search
- Filters
- Feedback table
- Feedback details
- Feedback form
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
- Role-based authorization

Charts and deeper analytics belong to:

```text
Phase 6 — Charts & Analytics
```

---

# 3. Existing Architecture

Continue using the existing architecture.

Relevant structure:

```text
app/
├── dashboard/
│   └── page.tsx
│
components/
├── layout/
├── sidebar/
├── header/
├── dashboard/
├── charts/
├── feedback/
├── forms/
└── ui/

data/
└── mock-feedback.ts

lib/
├── utils.ts
└── feedback.ts

types/
└── feedback.ts
```

Do not reorganize the entire project.

Add only the files required for Phase 5.

---

# 4. Data Source

The dashboard must use:

```ts
getFeedback()
```

from:

```text
lib/feedback.ts
```

Do not import the mock dataset directly into the dashboard.

Do not access:

```ts
localStorage
```

directly from dashboard components.

The data flow must be:

```text
Dashboard
    ↓
Feedback Service
    ↓
getFeedback()
    ↓
localStorage
    ↓
Feedback[]
```

This preserves the service abstraction created in Phase 4.

---

# 5. KPI Requirements

The dashboard must display exactly these KPIs:

```text
Total Feedback
Bugs
Feature Requests
Complaints
Praise
Questions
Other
```

Do not add additional KPI cards.

Do not remove any of these KPIs.

---

# 6. KPI Definitions

## Total Feedback

Count every feedback record.

Equivalent concept:

```ts
feedback.length
```

## Bugs

Count records where:

```ts
category === "bug"
```

## Feature Requests

Count records where:

```ts
category === "feature_request"
```

## Complaints

Count records where:

```ts
category === "complaint"
```

## Praise

Count records where:

```ts
category === "praise"
```

## Questions

Count records where:

```ts
category === "question"
```

## Other

Count records where:

```ts
category === "other"
```

---

# 7. KPI Calculation

Create a reusable calculation utility rather than placing all counting logic directly inside JSX.

A suitable location is:

```text
lib/dashboard.ts
```

or another clearly named dashboard utility.

Example concept:

```ts
export interface FeedbackKpis {
  total: number;
  bugs: number;
  featureRequests: number;
  complaints: number;
  praise: number;
  questions: number;
  other: number;
}
```

Then provide a calculation function:

```ts
export function calculateFeedbackKpis(
  feedback: Feedback[]
): FeedbackKpis
```

The exact implementation may vary, but the responsibility must remain clear.

---

# 8. KPI Calculation Rules

KPI values must always be derived from the supplied:

```ts
Feedback[]
```

Do not use:

```text
hard-coded numbers
static counters
mock KPI constants
```

For example, this is NOT acceptable:

```ts
const total = 25;
```

Instead:

```ts
const total = feedback.length;
```

and category values must be derived from the actual records.

---

# 9. Consistency Requirement

The following relationship must always be true:

```text
Bugs
+ Feature Requests
+ Complaints
+ Praise
+ Questions
+ Other
= Total Feedback
```

Because every feedback record must have exactly one category.

If this relationship fails, investigate the data or calculation logic.

Do not silently compensate by modifying the KPI values.

---

# 10. KPI Card Component

Create a reusable KPI card component.

Suggested location:

```text
components/dashboard/kpi-card.tsx
```

Example conceptual API:

```tsx
<KpiCard
  title="Total Feedback"
  value={kpis.total}
/>
```

The component should support at minimum:

```text
title
value
```

Additional presentation props may be introduced only if they are genuinely useful.

Do not create seven completely separate KPI components.

---

# 11. KPI Dashboard Section

Create a reusable dashboard KPI section.

Suggested structure:

```text
components/
└── dashboard/
    ├── kpi-card.tsx
    └── kpi-grid.tsx
```

The dashboard page should compose these components.

Example concept:

```tsx
<KpiGrid kpis={kpis} />
```

Keep calculation logic separate from presentation logic.

---

# 12. Dashboard Layout

The dashboard should now contain:

```text
Dashboard

┌────────────┬────────────┬────────────┬────────────┐
│ Total      │ Bugs       │ Feature    │ Complaints │
│ Feedback   │            │ Requests   │            │
└────────────┴────────────┴────────────┴────────────┘

┌────────────┬────────────┬────────────┐
│ Praise     │ Questions  │ Other      │
└────────────┴────────────┴────────────┘
```

The exact visual arrangement can be responsive.

Do not implement charts underneath the KPI section yet.

A simple placeholder can remain below the KPI section:

```text
Analytics will appear here in Phase 6.
```

---

# 13. Responsive Layout

The KPI grid must work on:

### Desktop

Prefer a compact multi-column layout.

### Tablet

Reduce the number of columns as needed.

### Mobile

Cards should stack or use a small-column layout without horizontal scrolling.

Use Tailwind responsive utilities.

Do not add a separate responsive framework.

---

# 14. KPI Card Visual Requirements

Cards should be:

- Easy to scan
- Consistent
- Professional
- Clearly labeled
- Responsive
- Visually separated

Each card should show:

```text
KPI Label
KPI Value
```

Example:

```text
Total Feedback
24
```

Do not add unnecessary descriptions.

Do not add trend percentages yet.

Do not add arrows such as:

```text
↑ 12%
↓ 4%
```

There is no previous-period calculation in this phase.

---

# 15. Number Formatting

KPI values are integer counts.

For example:

```text
24
```

Do not display unnecessary decimal places.

If the count becomes large, basic readable number formatting may be used, but do not introduce unnecessary formatting complexity.

---

# 16. Loading State

Because feedback is read through the client-side localStorage data layer, handle the initial loading state appropriately.

While feedback data is being loaded, display a simple loading state.

Example:

```text
Loading dashboard...
```

Use the reusable UI loading component created in Phase 3 where appropriate.

Do not show fake KPI values while loading.

---

# 17. Empty Data State

If the feedback dataset is valid but contains:

```ts
[]
```

the dashboard must remain functional.

Expected KPI values:

```text
Total Feedback: 0
Bugs: 0
Feature Requests: 0
Complaints: 0
Praise: 0
Questions: 0
Other: 0
```

Do not replace a valid empty dataset with mock data in the dashboard.

Phase 4 already defines how initial data is loaded.

---

# 18. Error State

If the feedback service fails to provide usable data:

- Do not render misleading KPI values.
- Display the existing error-state UI where appropriate.
- Provide a clear message.

Example:

```text
Unable to load feedback data.

Please try again.
```

Do not expose implementation details or storage errors directly to the user.

---

# 19. Data Refresh

The dashboard should be able to reflect updated local feedback data.

For this phase, a simple page/component refresh is sufficient.

Do not implement:

- WebSockets
- polling
- real-time synchronization
- backend subscriptions

Those are outside the current project scope.

---

# 20. Client-Side Considerations

Because Phase 4 uses browser localStorage, make sure the dashboard implementation respects Next.js rendering behavior.

Do not perform browser-only operations during server rendering.

Avoid patterns that cause:

```text
localStorage is not defined
```

or hydration errors.

If a client component is required to consume the feedback service, use the appropriate:

```tsx
"use client";
```

boundary.

Keep client components limited to where they are actually needed.

---

# 21. Authentication

Do not modify Clerk authentication.

The dashboard remains protected exactly as established in Phase 2.

Expected flow:

```text
Unauthenticated
      ↓
Sign In
      ↓
Dashboard
      ↓
KPI data
```

Do not add role checks.

Do not add manager/admin authorization.

---

# 22. No Charts

Do not use Recharts in Phase 5.

Do not create:

```text
BarChart
PieChart
LineChart
AreaChart
```

or any other chart.

Phase 6 will implement analytics and charts.

---

# 23. No Feedback Management

Do not implement:

- Feedback table
- Search
- Filters
- Detail view
- Category pages
- Edit UI
- Delete UI

The sidebar navigation may continue to point to the placeholder pages from Phase 3.

---

# 24. No Hard-Coded Dashboard Numbers

Do not use static values such as:

```ts
const kpis = {
  total: 30,
  bugs: 8,
  featureRequests: 6,
};
```

unless the values are being generated by a function from:

```ts
Feedback[]
```

The dashboard must remain correct if feedback records are added or removed.

---

# 25. Example Data Flow

The intended architecture is:

```text
Clerk
  │
  └── Authenticated User
          │
          ▼
      Dashboard Page
          │
          ▼
      getFeedback()
          │
          ▼
       Feedback[]
          │
          ▼
 calculateFeedbackKpis()
          │
          ▼
     FeedbackKpis
          │
          ▼
       KpiGrid
          │
          ▼
       KpiCard[]
```

Keep this separation.

---

# 26. Testing Strategy

Phase 5 must be validated using the actual Phase 4 data layer.

Do not validate the KPI calculations using manually entered hard-coded KPI values.

---

# 27. Required Validation Tests

## Test 1 — Initial Dashboard

Sign in and open:

```text
/dashboard
```

Confirm:

- Dashboard loads
- KPI cards appear
- Values are numeric
- No hydration errors occur

---

## Test 2 — Total Feedback

Compare:

```text
Total Feedback
```

against the number of records returned by:

```ts
getFeedback()
```

They must match exactly.

---

## Test 3 — Category Counts

Manually verify the number of records in:

```text
bug
feature_request
complaint
praise
question
other
```

against the displayed KPI cards.

All values must match.

---

## Test 4 — Category Sum

Verify:

```text
Bugs
+ Feature Requests
+ Complaints
+ Praise
+ Questions
+ Other
```

equals:

```text
Total Feedback
```

---

## Test 5 — Add Feedback

Using the Phase 4 data layer, add a new feedback record.

Reload or refresh the dashboard.

Expected:

- Total Feedback increases by one
- The matching category KPI increases by one
- Other category KPI values remain unchanged

---

## Test 6 — Update Feedback Category

Change an existing feedback record from one category to another through the data layer.

Refresh the dashboard.

Expected:

- Original category decreases by one
- New category increases by one
- Total Feedback remains unchanged

---

## Test 7 — Delete Feedback

If the delete function from Phase 4 is implemented:

Delete one record.

Refresh the dashboard.

Expected:

- Total Feedback decreases by one
- Its category count decreases by one

---

## Test 8 — Empty Dataset

Temporarily store:

```json
[]
```

as the feedback dataset.

Reload the dashboard.

Expected:

```text
Total Feedback: 0
Bugs: 0
Feature Requests: 0
Complaints: 0
Praise: 0
Questions: 0
Other: 0
```

---

## Test 9 — Responsive Layout

Test:

- Desktop
- Tablet
- Mobile

Confirm:

- Cards fit correctly
- Labels remain readable
- Values remain visible
- No horizontal overflow occurs

---

## Test 10 — Authentication Regression

Confirm:

- Unauthenticated users cannot access `/dashboard`
- Authenticated users can access `/dashboard`
- Sign-out continues to work

---

## Test 11 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 12 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 13 — Production Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

---

# 28. Code Quality Requirements

Follow these principles:

- KPI calculations belong in a reusable utility
- UI components should focus on presentation
- Feedback service remains the data source
- Do not duplicate counting logic
- Do not access localStorage directly from KPI components
- Keep components small
- Keep TypeScript types explicit
- Avoid unnecessary dependencies
- Avoid premature abstraction

Do not over-engineer the KPI system.

---

# 29. Definition of Done

Phase 5 is complete only when:

- [ ] Dashboard reads feedback through `getFeedback()`
- [ ] KPI calculation utility exists
- [ ] Total Feedback KPI works
- [ ] Bugs KPI works
- [ ] Feature Requests KPI works
- [ ] Complaints KPI works
- [ ] Praise KPI works
- [ ] Questions KPI works
- [ ] Other KPI works
- [ ] KPI values are dynamically calculated
- [ ] No KPI value is hard-coded
- [ ] Category counts add up to Total Feedback
- [ ] Reusable KPI card component exists
- [ ] Responsive KPI grid works
- [ ] Loading state works
- [ ] Empty dataset displays zero values correctly
- [ ] Error handling is reasonable
- [ ] LocalStorage is not accessed directly by presentation components
- [ ] Clerk authentication remains intact
- [ ] No charts were implemented
- [ ] No feedback management UI was implemented
- [ ] No new backend/database was introduced
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 30. Explicit Stop Point

After completing and validating Phase 5:

**STOP.**

Do not begin Phase 6.

Do not implement:

- Feedback by Category chart
- Feedback by Product chart
- Sentiment Distribution chart
- Severity Distribution chart
- Feedback Trend chart
- Top Issues
- Recent Feedback analytics

The next phase will be:

```text
Phase 6 — Charts & Analytics
```

Proceed to Phase 6 only after Phase 5 has been explicitly reviewed and approved.
