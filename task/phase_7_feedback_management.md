# Customer Feedback Intelligence
## Phase 7 — Feedback Management

### 1. Objective

Implement the **Feedback Management** interface for the Customer Feedback Intelligence application.

Phase 4 established the feedback data layer.
Phase 5 established KPI analytics.
Phase 6 established dashboard charts and analytics.

Phase 7 now provides managers with a complete interface to **view, search, filter, and navigate feedback records**.

The main goal is to create one reusable feedback management experience rather than separate duplicated pages for every category.

---

# 2. Phase Scope

## Included

- All Feedback page
- Feedback table/list
- Search
- Category filter
- Product filter
- Sentiment filter
- Severity filter
- Date filtering
- Combined filters
- Clear filters
- Result count
- Empty results state
- Loading state
- Error state
- Responsive feedback presentation
- Category navigation integration
- Row/card navigation to feedback details
- Reusable feedback management components
- Dynamic data from the Phase 4 service

## NOT Included

Do not implement:

- Feedback detail page functionality
- Feedback editing UI
- Feedback deletion UI
- Feedback collection form
- New feedback creation UI
- AI/LLM
- Automated classification
- RAG
- Embeddings
- Vector database
- Backend/API
- MongoDB
- n8n
- Gmail
- Google Sheets
- Notifications
- Role-based authorization

Feedback details belong to:

```text
Phase 8 — Feedback Details
```

Feedback collection belongs to:

```text
Phase 9 — Feedback Collection
```

---

# 3. Existing Stack

Continue using:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- Recharts

Do not add unnecessary dependencies.

Do not introduce a new table library.

Do not introduce a state-management library.

---

# 4. Data Source

All feedback records must come from:

```ts
getFeedback()
```

in:

```text
lib/feedback.ts
```

Do not import the mock dataset directly.

Do not access `localStorage` directly from UI components.

The intended flow is:

```text
Feedback Management
        ↓
getFeedback()
        ↓
Feedback[]
        ↓
Search / Filter / Sort
        ↓
Display results
```

---

# 5. Main Route

Use:

```text
/dashboard/feedback
```

as the main feedback management page.

This page must support all feedback records and category-specific views.

Do not create separate duplicated pages for:

```text
Bug Reports
Feature Requests
Complaints
Praise
Questions
Other
```

These must use the same reusable feedback management implementation.

---

# 6. Category Navigation

The sidebar category links established in Phase 3 should continue using:

```text
/dashboard/feedback?category=bug
/dashboard/feedback?category=feature_request
/dashboard/feedback?category=complaint
/dashboard/feedback?category=praise
/dashboard/feedback?category=question
/dashboard/feedback?category=other
```

The page must read the `category` query parameter and use it as an initial filter.

For:

```text
/dashboard/feedback
```

show all feedback.

---

# 7. Category Query Parameter

Supported values are exactly:

```text
bug
feature_request
complaint
praise
question
other
```

If the query parameter is invalid or unknown:

- Do not crash
- Ignore the invalid category
- Fall back to all feedback

Do not create new category values.

---

# 8. Feedback Table

On desktop, display feedback in a table.

Recommended columns:

```text
Date
Subject
Name
Product
Category
Sentiment
Severity
```

Do not display the full feedback body in the table.

The table should be easy to scan.

---

# 9. Table Data

Every row must come from an actual `Feedback` record.

Do not hard-code rows.

Example conceptual record:

```text
2026-09-12
Dashboard takes too long to load
Arun Kumar
Dashboard
Bug
Negative
High
```

The actual displayed data must come from the feedback service.

---

# 10. Date Display

Use:

```text
receivedAt
```

for the feedback date.

Convert the ISO string into a readable date for display.

Example:

```text
Sep 12, 2026
```

Do not modify the stored ISO string.

---

# 11. Search

Add a search input.

Search should work across useful text fields:

```text
name
email
subject
body
product
feature
issue
```

Search should be case-insensitive.

Example:

```text
Search feedback...
```

If the user searches:

```text
dashboard
```

feedback containing "dashboard" in any supported searchable field should be returned.

---

# 12. Search Behavior

Search should update the displayed result set.

It should not modify the underlying data.

Use a controlled React input.

Do not add a backend search API.

Do not implement fuzzy search or AI-powered search.

Simple case-insensitive text matching is sufficient.

---

# 13. Category Filter

Provide a category filter with:

```text
All Categories
Bug
Feature Request
Complaint
Praise
Question
Other
```

The internal values must remain:

```text
bug
feature_request
complaint
praise
question
other
```

The filter should be dynamically applied to the feedback dataset.

---

# 14. Product Filter

Provide a product filter:

```text
All Products
Chat Interface
Dashboard
E-commerce
Not Specified
```

`Not Specified` represents:

```ts
product === null
```

Do not modify the underlying feedback data.

---

# 15. Sentiment Filter

Provide:

```text
All Sentiments
Positive
Neutral
Negative
```

Use the existing sentiment values:

```text
positive
neutral
negative
```

---

# 16. Severity Filter

Provide:

```text
All Severities
Low
Medium
High
Critical
```

Use the existing severity values:

```text
low
medium
high
critical
```

---

# 17. Date Filter

Add date filtering.

The implementation must allow the manager to restrict feedback by date.

A simple range filter is recommended:

```text
From
To
```

Use:

```text
receivedAt
```

as the source.

The date filtering should be based on calendar dates rather than arbitrary text matching.

---

# 18. Combined Filters

All filters must work together.

Example:

```text
Search: dashboard
Category: bug
Product: Dashboard
Sentiment: negative
Severity: high
From: 2026-09-01
To: 2026-09-15
```

The result must satisfy **all active conditions**.

Do not implement filters independently in a way that causes one filter to overwrite another.

---

# 19. Filter Pipeline

A clear filtering pipeline is recommended:

```text
All Feedback
      ↓
Category Filter
      ↓
Product Filter
      ↓
Sentiment Filter
      ↓
Severity Filter
      ↓
Date Filter
      ↓
Search
      ↓
Filtered Results
```

The exact order may vary because the operations are filtering operations, but the final result must satisfy every active filter.

---

# 20. Clear Filters

Provide a clear/reset action.

Example:

```text
Clear Filters
```

When activated:

- Search is cleared
- Category becomes All
- Product becomes All
- Sentiment becomes All
- Severity becomes All
- From date is cleared
- To date is cleared

If the page was opened using:

```text
/dashboard/feedback?category=bug
```

the category filter should also be cleared when the user explicitly chooses to clear filters.

---

# 21. Result Count

Display the number of currently visible results.

Example:

```text
24 feedback items
```

or:

```text
Showing 8 of 24 feedback items
```

The count must be calculated dynamically.

Do not hard-code it.

---

# 22. No Results State

If filters/search return no records, show a clear empty state.

Example:

```text
No feedback found

Try adjusting your search or filters.
```

Do not display an empty table with no explanation.

---

# 23. No Data State

If the underlying feedback dataset itself is empty:

```text
[]
```

show an appropriate empty state.

Example:

```text
No feedback available

Feedback will appear here when records are available.
```

Do not confuse:

```text
No data
```

with:

```text
No search results
```

---

# 24. Sorting

The default feedback ordering should be:

```text
Newest first
```

Sort using:

```text
receivedAt
```

Do not rely on localStorage insertion order.

Do not add complex multi-column sorting unless explicitly required.

---

# 25. Row Navigation

Each feedback row should provide a way to open the feedback detail page.

The planned route is:

```text
/dashboard/feedback/[id]
```

The row or subject can be clickable.

Phase 7 only needs to establish navigation.

Do not implement the detail page itself.

If the detail page does not yet exist, the navigation may temporarily point to the planned route without implementing its content.

---

# 26. Responsive Design

The feedback management UI must work on:

### Desktop

Use a proper table.

### Tablet

The table should remain usable without excessive compression.

### Mobile

Do not force a huge table that becomes unreadable.

A responsive card/list representation may be used for smaller screens.

The same feedback records and filters must be used.

Do not create a separate data implementation for mobile.

---

# 27. Mobile Feedback Card

If using cards on mobile, show key fields such as:

```text
Subject
Date
Category
Product
Sentiment
Severity
```

The full body does not need to be displayed.

The card should navigate to the same detail route.

---

# 28. Filter UI Layout

A reasonable layout:

```text
Feedback

[ Search feedback... ]

[Category] [Product] [Sentiment] [Severity]

[From] [To] [Clear Filters]

Showing 12 results

-----------------------------------------
Feedback table/list
-----------------------------------------
```

The exact arrangement can be adjusted for responsive behavior.

Keep it simple.

---

# 29. Reusable Components

Suggested structure:

```text
components/
└── feedback/
    ├── feedback-table.tsx
    ├── feedback-card.tsx
    ├── feedback-filters.tsx
    ├── feedback-search.tsx
    └── feedback-list.tsx
```

The exact filenames may differ.

Avoid creating components that contain only a few meaningless lines.

---

# 30. Filtering Logic

Filtering logic should not be duplicated across UI components.

A suitable location is:

```text
lib/feedback-filters.ts
```

or:

```text
lib/feedback.ts
```

if the existing service organization makes that clearer.

A reusable function could conceptually look like:

```ts
filterFeedback(
  feedback,
  filters
)
```

The exact API may vary.

Keep the filtering logic testable and separate from JSX.

---

# 31. Filter Type

Create a clear filter type.

Conceptually:

```ts
interface FeedbackFilters {
  search: string;
  category: Category | "all";
  product: Product | "all" | "not_specified";
  sentiment: Sentiment | "all";
  severity: Severity | "all";
  fromDate: string;
  toDate: string;
}
```

Use existing domain types where possible.

Do not modify the `Feedback` data model to accommodate filters.

---

# 32. URL and Filter State

The initial category may come from:

```text
?category=
```

Other filters may remain local component state unless there is a clear reason to synchronize them with the URL.

Do not unnecessarily create a complex URL state-management system.

The primary requirement is that category sidebar navigation works.

---

# 33. Search and Filter Reset

When the user clears filters, the displayed result set must return to the full feedback dataset.

Expected:

```text
All Feedback
```

sorted newest first.

---

# 34. Filter Persistence

Do not persist filter values to localStorage.

Filters are temporary UI state.

When the page is reloaded, only the explicitly provided URL category should be used.

---

# 35. Loading State

While feedback data is being loaded:

```text
Loading feedback...
```

Use the reusable loading-state foundation from Phase 3.

Do not show fake feedback rows.

---

# 36. Error State

If feedback cannot be loaded:

```text
Unable to load feedback.

Please try again.
```

Use the existing error-state foundation where appropriate.

Do not expose raw localStorage errors.

---

# 37. Authentication

Do not modify Clerk.

The feedback management route remains protected by the existing dashboard authentication.

Expected:

```text
Unauthenticated
      ↓
Sign In
      ↓
Dashboard
      ↓
All Feedback
```

---

# 38. No Editing

Do not add:

```text
Edit
```

buttons.

Do not modify feedback records from this page.

Editing is not part of the current approved scope.

---

# 39. No Deleting

Do not add:

```text
Delete
```

buttons.

The Phase 4 data layer may contain delete functionality for future use, but Phase 7 should not expose it through the UI.

---

# 40. No Creating

Do not add a feedback creation form here.

The existing:

```text
Collect Feedback
```

navigation remains the entry point for the future collection form.

That belongs to Phase 9.

---

# 41. No AI Search

Do not implement:

- semantic search
- embeddings
- vector search
- RAG
- natural-language filtering
- LLM-powered search

Search is simple client-side text matching.

---

# 42. Performance

The prototype contains approximately 20–30 records.

Simple client-side filtering is sufficient.

Do not add:

- server-side pagination
- database queries
- caching libraries
- virtualized tables
- complex memoization

unless a real performance problem appears.

---

# 43. Data Integrity

Filtering must never mutate the original:

```ts
Feedback[]
```

Use derived arrays.

Do not directly modify feedback records during filtering or sorting.

When sorting, avoid mutating the original dataset.

For example, use a copied array where required.

---

# 44. Category Counts

Do not add new KPI calculations to this page.

The dashboard KPI section remains responsible for global KPI counts.

Feedback management only displays:

```text
Filtered result count
```

and feedback records.

---

# 45. Accessibility

Ensure:

- Search input has a label or accessible name
- Select controls are accessible
- Date inputs are accessible
- Clear Filters button has an accessible name
- Table headers are semantic
- Interactive rows/links are keyboard accessible
- Focus states are visible
- Do not rely only on color for category/sentiment/severity meaning

---

# 46. Visual Requirements

The page should be:

- Professional
- Clean
- Manager-oriented
- Easy to scan
- Responsive

Use existing Tailwind styling.

Do not introduce unnecessary animations.

Do not redesign the entire application.

---

# 47. Testing Strategy

Phase 7 must be validated against the actual Phase 4 feedback dataset.

Do not use hard-coded test results.

---

# 48. Required Validation Tests

## Test 1 — All Feedback

Open:

```text
/dashboard/feedback
```

Confirm:

- Feedback loads
- All records are displayed
- Newest feedback appears first
- Result count matches the dataset

---

## Test 2 — Category Navigation

Open:

```text
/dashboard/feedback?category=bug
```

Confirm only bug feedback is shown.

Repeat for:

```text
feature_request
complaint
praise
question
other
```

---

## Test 3 — Invalid Category

Open:

```text
/dashboard/feedback?category=invalid
```

Expected:

- Page does not crash
- All feedback is displayed

---

## Test 4 — Search

Search for a known word from:

```text
subject
```

Expected:

- Matching records appear

Search using a term from:

```text
body
```

Expected:

- Matching records appear

Search using:

```text
name
email
product
feature
issue
```

Expected:

- Matching records appear when applicable

---

## Test 5 — Case Insensitivity

Search:

```text
Dashboard
```

Then:

```text
dashboard
```

Expected:

- Same relevant results

---

## Test 6 — Category Filter

Select:

```text
Bug
```

Expected:

- Only bug records appear

Select:

```text
All Categories
```

Expected:

- All records return

---

## Test 7 — Product Filter

Test:

```text
Chat Interface
Dashboard
E-commerce
Not Specified
```

Confirm results match the actual data.

---

## Test 8 — Sentiment Filter

Test:

```text
Positive
Neutral
Negative
```

Confirm results match the actual data.

---

## Test 9 — Severity Filter

Test:

```text
Low
Medium
High
Critical
```

Confirm results match the actual data.

---

## Test 10 — Date Range

Choose a valid:

```text
From
To
```

range.

Confirm only records within the selected range are displayed.

Test:

- Same-day range
- Multi-day range
- Range containing no feedback

---

## Test 11 — Combined Filters

Use multiple filters simultaneously.

Example:

```text
Category: Bug
Product: Dashboard
Sentiment: Negative
Severity: High
```

Confirm every displayed record satisfies all conditions.

---

## Test 12 — Search + Filters

Use:

```text
Search + Category + Product
```

Confirm all conditions are applied together.

---

## Test 13 — Clear Filters

Apply several filters.

Click:

```text
Clear Filters
```

Expected:

- Search clears
- Category resets
- Product resets
- Sentiment resets
- Severity resets
- Date range clears
- All feedback returns

---

## Test 14 — Result Count

Apply filters.

Confirm displayed result count equals the actual filtered array length.

---

## Test 15 — Sorting

Verify feedback is ordered:

```text
Newest → Oldest
```

based on `receivedAt`.

---

## Test 16 — Empty Search Result

Search for:

```text
this-does-not-exist
```

Expected:

```text
No feedback found
```

No broken table should appear.

---

## Test 17 — Empty Dataset

Set the stored feedback data to:

```json
[]
```

Reload the page.

Expected:

```text
No feedback available
```

---

## Test 18 — Responsive UI

Test:

- Desktop
- Tablet
- Mobile

Confirm:

- Filters remain usable
- Search remains usable
- Table/card layout remains readable
- No horizontal overflow
- Navigation works

---

## Test 19 — Detail Navigation

Click a feedback subject/row.

Expected:

```text
/dashboard/feedback/[id]
```

is requested.

The actual detail page implementation is not required until Phase 8.

---

## Test 20 — Authentication Regression

Confirm:

- Unauthenticated users cannot access feedback management
- Authenticated users can access it
- Sign-out still works

---

## Test 21 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 22 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 23 — Production Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

No hydration or browser API errors should occur.

---

# 49. Definition of Done

Phase 7 is complete only when:

- [ ] `/dashboard/feedback` works
- [ ] Feedback records come from `getFeedback()`
- [ ] Desktop table works
- [ ] Mobile presentation works
- [ ] Search works
- [ ] Search is case-insensitive
- [ ] Search checks the approved searchable fields
- [ ] Category filter works
- [ ] Product filter works
- [ ] Sentiment filter works
- [ ] Severity filter works
- [ ] Date range filter works
- [ ] Filters work together
- [ ] Clear Filters works
- [ ] Result count is dynamic
- [ ] Newest-first sorting works
- [ ] Category query parameter works
- [ ] Invalid category query does not crash
- [ ] Empty search results have an appropriate state
- [ ] Empty dataset has an appropriate state
- [ ] Loading state works
- [ ] Error state works
- [ ] Feedback rows/cards can navigate to the planned detail route
- [ ] No edit UI was added
- [ ] No delete UI was added
- [ ] No collection form was added
- [ ] No AI search was added
- [ ] No backend/database was introduced
- [ ] Clerk authentication remains intact
- [ ] Responsive behavior works
- [ ] Accessibility basics are satisfied
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 50. Explicit Stop Point

After completing and validating Phase 7:

**STOP.**

Do not begin Phase 8.

Do not implement:

- Feedback detail page
- Full feedback body view
- Detail metadata layout
- Detail-page navigation logic beyond what is necessary for the existing link

The next phase will be:

```text
Phase 8 — Feedback Details
```

Proceed to Phase 8 only after Phase 7 has been explicitly reviewed and approved.
