# Customer Feedback Intelligence
## Phase 6 — Charts & Analytics

### 1. Objective

Implement the **analytics and chart layer** for the Customer Feedback Intelligence dashboard.

Phase 4 established the feedback data layer.
Phase 5 established dynamically calculated KPI cards.

Phase 6 now adds visual analytics using the existing feedback dataset.

The key requirement is:

> **Every chart and analytical metric must be dynamically calculated from the actual feedback data.**

Do not hard-code chart values.

---

# 2. Phase Scope

## Included

- Feedback by Category chart
- Feedback by Product chart
- Sentiment Distribution chart
- Severity Distribution chart
- Feedback Trend Over Time chart
- Top Issues section
- Recent Feedback section
- Reusable chart components
- Analytics calculation utilities
- Dynamic data transformation
- Responsive chart layout
- Loading states
- Empty states
- Basic error handling
- Validation using the Phase 4 local feedback data

## NOT Included

Do not implement:

- Search
- Feedback filters
- Feedback table management
- Feedback detail page
- Feedback form
- Feedback CRUD UI
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

Those belong to later phases or remain out of scope.

---

# 3. Existing Stack

Continue using:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- Recharts

Recharts is the charting library for this phase.

Do not introduce another charting library.

Do not add unnecessary dependencies.

---

# 4. Data Source

All analytics must use:

```ts
getFeedback()
```

from:

```text
lib/feedback.ts
```

Do not import:

```text
mock-feedback.ts
```

directly into dashboard analytics components.

Do not access:

```ts
localStorage
```

directly from chart components.

The intended flow is:

```text
Dashboard
    ↓
getFeedback()
    ↓
Feedback[]
    ↓
Analytics calculations
    ↓
Chart components
```

---

# 5. Dashboard Analytics Layout

The dashboard should now conceptually contain:

```text
Dashboard

[KPI CARDS]
Total Feedback | Bugs | Feature Requests | Complaints
Praise | Questions | Other


[CHARTS]

Feedback by Category
Feedback by Product

Sentiment Distribution
Severity Distribution

Feedback Trend Over Time


[OTHER ANALYTICS]

Top Issues
Recent Feedback
```

The exact grid arrangement should be responsive.

Do not create an unnecessarily complicated dashboard layout.

---

# 6. Chart 1 — Feedback by Category

Create a chart showing the number of feedback records in each category.

Categories must be exactly:

```text
bug
feature_request
complaint
praise
question
other
```

Recommended chart:

```text
Bar Chart
```

The chart must be calculated from:

```ts
Feedback[]
```

Example conceptual data:

```ts
[
  { category: "bug", count: 5 },
  { category: "feature_request", count: 7 },
  { category: "complaint", count: 4 },
  { category: "praise", count: 6 },
  { category: "question", count: 3 },
  { category: "other", count: 2 },
]
```

The values above are examples only.

Do not hard-code them.

---

# 7. Chart 2 — Feedback by Product

Create a chart showing feedback distribution by product.

Products:

```text
Chat Interface
Dashboard
E-commerce
```

Feedback where:

```ts
product === null
```

must also be handled.

Recommended representation:

```text
Bar Chart
```

or another simple chart that clearly communicates comparison.

Do not silently discard `null` product records.

Represent them as:

```text
Unknown / Not Specified
```

only for chart display.

Do not change the underlying data model.

---

# 8. Chart 3 — Sentiment Distribution

Create a chart showing:

```text
positive
neutral
negative
```

Recommended representation:

```text
Pie Chart
```

or:

```text
Donut-style Pie Chart
```

The values must come from the actual feedback data.

Do not hard-code percentages.

Percentages, if displayed, must be calculated from the counts.

---

# 9. Chart 4 — Severity Distribution

Create a chart showing:

```text
low
medium
high
critical
```

Recommended representation:

```text
Bar Chart
```

The chart must dynamically calculate counts from:

```ts
Feedback[]
```

Do not hard-code severity counts.

---

# 10. Chart 5 — Feedback Trend Over Time

Create a time-series chart showing feedback volume over time.

Recommended representation:

```text
Line Chart
```

The source field is:

```ts
receivedAt
```

Group feedback by date.

Example conceptual structure:

```ts
[
  {
    date: "2026-09-01",
    count: 3,
  },
  {
    date: "2026-09-02",
    count: 5,
  },
]
```

These values must be calculated dynamically.

---

# 11. Trend Date Handling

Use the `receivedAt` ISO string from the feedback model.

Convert it into a display-friendly date for grouping.

The trend calculation must be consistent.

Avoid grouping the same calendar date into different buckets because of inconsistent formatting.

Use a stable date representation such as:

```text
YYYY-MM-DD
```

for the internal aggregation key.

Display formatting may be more human-readable.

---

# 12. Trend Ordering

The trend chart must be chronologically ordered.

Example:

```text
Oldest → Newest
```

Do not depend on the original order of records.

Sort the aggregated dates before passing data to Recharts.

---

# 13. Trend Empty Dates

Do not invent zero-value dates across a large period unless there is a clear reason.

If there is no feedback for a date, it is acceptable for that date to be absent from the aggregated dataset.

Keep the implementation simple.

---

# 14. Top Issues

Create a **Top Issues** analytics section.

Use the existing:

```ts
issue
```

field.

Only meaningful non-null/non-empty issue values should be included.

Group identical issue values.

Count occurrences.

Sort by highest frequency first.

Example conceptual result:

```text
Top Issues

Slow page load          8
Login problem           5
Search results          4
Payment failure         3
```

The actual values must come from the feedback dataset.

Do not hard-code the issues.

---

# 15. Top Issues Limit

Display a reasonable small number of issues.

Recommended:

```text
Top 5 Issues
```

Do not display the entire issue list on the dashboard.

The calculation should sort all valid issues first and then take the top five.

---

# 16. Null Issues

Records where:

```ts
issue === null
```

must not appear as a top issue.

Do not display:

```text
null
```

or:

```text
undefined
```

as an issue.

---

# 17. Recent Feedback

Create a **Recent Feedback** section.

It should display the most recent feedback records based on:

```ts
receivedAt
```

Sort newest first.

Recommended:

```text
5 most recent feedback records
```

The section should show enough information to identify the feedback quickly.

At minimum display:

```text
Subject
Category
Sentiment
Date
```

Additional existing fields may be shown if useful.

Do not create a full feedback management table yet.

---

# 18. Recent Feedback Limit

Display:

```text
5
```

most recent records.

Do not display the entire dataset on the dashboard.

The calculation must:

1. Sort by `receivedAt`
2. Select the newest records
3. Return the top five

---

# 19. Recent Feedback Navigation

If practical, the recent feedback items may link to the existing future detail route:

```text
/dashboard/feedback/[id]
```

However, do not implement the actual detail page in Phase 6.

If the route does not exist yet, a non-functional or simple link is acceptable only if it does not cause broken UX.

Do not build Phase 8 functionality early.

---

# 20. Analytics Utility

Keep data transformation logic separate from chart presentation.

A suitable file is:

```text
lib/analytics.ts
```

Create reusable calculation functions.

Suggested functions:

```ts
calculateCategoryDistribution(feedback)
calculateProductDistribution(feedback)
calculateSentimentDistribution(feedback)
calculateSeverityDistribution(feedback)
calculateFeedbackTrend(feedback)
calculateTopIssues(feedback)
getRecentFeedback(feedback)
```

The exact function names can differ, but responsibilities should remain clearly separated.

---

# 21. Suggested Analytics Types

Create explicit types for transformed chart data where useful.

Example:

```ts
export interface DistributionItem {
  label: string;
  count: number;
}
```

For trend data:

```ts
export interface TrendItem {
  date: string;
  count: number;
}
```

For top issues:

```ts
export interface IssueCount {
  issue: string;
  count: number;
}
```

Do not create unnecessary types if existing types already provide the required clarity.

---

# 22. Category Labels

The internal category values are:

```text
bug
feature_request
complaint
praise
question
other
```

For display, use readable labels such as:

```text
Bug
Feature Request
Complaint
Praise
Question
Other
```

Do not modify the underlying `Category` type.

---

# 23. Sentiment Labels

Internal values:

```text
positive
neutral
negative
```

Display labels:

```text
Positive
Neutral
Negative
```

Do not modify the underlying data.

---

# 24. Severity Labels

Internal values:

```text
low
medium
high
critical
```

Display labels:

```text
Low
Medium
High
Critical
```

Do not modify the underlying data.

---

# 25. Product Labels

Display:

```text
Chat Interface
Dashboard
E-commerce
Not Specified
```

Use:

```text
Not Specified
```

only when the original `product` value is `null`.

Do not modify the stored feedback.

---

# 26. Reusable Chart Components

Create reusable chart components.

Suggested structure:

```text
components/
└── charts/
    ├── feedback-by-category.tsx
    ├── feedback-by-product.tsx
    ├── sentiment-distribution.tsx
    ├── severity-distribution.tsx
    └── feedback-trend.tsx
```

The exact filenames can vary.

Each component should focus primarily on presentation.

Do not place large amounts of data aggregation logic inside chart JSX.

---

# 27. Chart Container

Use a consistent visual container for charts.

Each chart should have:

```text
Title
Chart
```

Example:

```text
Feedback by Category
────────────────────
[ Bar Chart ]
```

Keep chart cards visually consistent.

---

# 28. Recharts Responsiveness

Charts must work across:

- Desktop
- Tablet
- Mobile

Use Recharts responsive capabilities appropriately.

Charts must not overflow their containers.

Avoid fixed widths that break mobile layouts.

---

# 29. Chart Dimensions

Use responsive containers rather than hard-coded viewport widths.

Avoid patterns such as:

```text
width: 1000px
```

when they would cause horizontal overflow.

The chart should adapt to its parent container.

---

# 30. Chart Accessibility

Provide useful labels where supported.

At minimum:

- Chart container has a meaningful title
- Axis labels are understandable where applicable
- Tooltips provide useful values
- The chart does not rely solely on visual color differences

Keep accessibility practical and consistent with Recharts capabilities.

---

# 31. Tooltip Requirements

Charts should provide useful tooltips.

For example:

```text
Bug
Count: 8
```

or:

```text
2026-09-10
Feedback: 4
```

Do not expose raw object structures in tooltips.

---

# 32. Legend Requirements

Use legends where they improve clarity, especially for:

- Sentiment
- Product
- Severity

Do not add legends unnecessarily to simple single-series charts.

---

# 33. Color Handling

Use a consistent visual system.

Do not assign arbitrary colors separately in every component.

If chart colors are needed, centralize the presentation mapping.

Do not modify the underlying semantic values.

Avoid excessive decorative colors.

---

# 34. No Hard-Coded Analytics

This is a strict requirement.

Do not write:

```ts
const categoryData = [
  { category: "bug", count: 8 },
];
```

unless those values are generated from actual feedback.

Do not hard-code:

- Chart counts
- Percentages
- Trend values
- Top issues
- Recent feedback

Everything must come from:

```ts
Feedback[]
```

---

# 35. Dashboard Data Flow

The intended architecture is:

```text
Clerk Authentication
        ↓
Dashboard
        ↓
getFeedback()
        ↓
Feedback[]
        ↓
analytics functions
        ↓
┌───────────────────────────────┐
│ Category Distribution         │
│ Product Distribution          │
│ Sentiment Distribution        │
│ Severity Distribution         │
│ Trend                         │
│ Top Issues                    │
│ Recent Feedback               │
└───────────────────────────────┘
        ↓
Reusable UI components
        ↓
Charts / Analytics Sections
```

Keep this separation.

---

# 36. Dashboard Composition

The dashboard page should primarily compose sections.

Avoid turning `app/dashboard/page.tsx` into a large file containing:

- aggregation logic
- sorting logic
- chart configuration
- UI markup
- localStorage access

Keep responsibilities separated.

---

# 37. Loading State

While feedback data is loading:

```text
Loading dashboard analytics...
```

Use the existing reusable loading state where appropriate.

Do not display fake chart data.

---

# 38. Empty Dataset

If:

```ts
feedback.length === 0
```

all analytics sections must handle the condition gracefully.

Examples:

```text
No category data available.
```

```text
No trend data available.
```

```text
No issues available.
```

Do not display broken charts.

Do not invent sample values.

---

# 39. Empty Chart Data

Each chart should safely handle:

```ts
[]
```

The chart component should not crash if there are no records.

Use the reusable empty-state component created earlier where appropriate.

---

# 40. Error Handling

If feedback loading fails:

- Do not display misleading analytics
- Show a clear error state
- Do not expose raw storage implementation details

Example:

```text
Unable to load dashboard analytics.

Please try again.
```

Keep error handling simple.

---

# 41. Authentication

Do not change Clerk authentication.

The dashboard remains protected.

Expected:

```text
Unauthenticated
      ↓
Sign In
      ↓
Dashboard
      ↓
Analytics
```

Do not add role-based authorization.

---

# 42. Performance

The dataset is intentionally small.

Do not introduce complex optimization.

For approximately 20–30 records:

- Simple array operations are sufficient
- `filter`
- `map`
- `reduce`
- `sort`

are acceptable.

Avoid premature memoization unless it solves an actual rendering issue.

Do not introduce a state management library.

---

# 43. Date Sorting

When sorting `receivedAt`, compare actual timestamps rather than display strings where necessary.

Example concept:

```ts
new Date(a.receivedAt).getTime()
```

Ensure invalid dates do not crash the dashboard.

The Phase 4 data should contain valid ISO dates.

---

# 44. Analytics Consistency

The following analytics should be mathematically consistent with the KPI dashboard:

```text
Category Distribution
```

must correspond to:

```text
Bugs
Feature Requests
Complaints
Praise
Questions
Other
```

The sum of category chart counts must equal:

```text
Total Feedback
```

Product distribution should account for every record, including:

```text
Not Specified
```

Sentiment distribution should account for every record.

Severity distribution should account for every record.

---

# 45. Dashboard Layout Recommendation

A simple layout is recommended:

```text
Dashboard

[KPI GRID]

[Feedback by Category] [Feedback by Product]

[Sentiment Distribution] [Severity Distribution]

[Feedback Trend Over Time]

[Top Issues] [Recent Feedback]
```

Use responsive grid behavior.

Do not force this exact layout if the existing dashboard shell requires a better arrangement.

---

# 46. No Search or Filters

Do not add:

```text
Search
Category filter
Product filter
Sentiment filter
Severity filter
Date filter
```

Those belong to feedback management functionality.

Analytics in this phase operate on the complete feedback dataset.

---

# 47. No Pagination

Do not implement pagination.

The dashboard only displays:

```text
Top 5 Issues
5 Recent Feedback
```

while charts use aggregated data.

---

# 48. TypeScript Requirements

Use strict TypeScript.

Avoid:

```ts
any
```

unless genuinely unavoidable.

Use explicit types for:

- Analytics results
- Chart data
- Component props

Do not use untyped chart data when a simple interface can make the structure clear.

---

# 49. Code Quality

Follow these principles:

- Keep analytics calculations separate from UI
- Keep chart components reusable
- Avoid duplicated aggregation logic
- Use the Phase 4 service
- Keep dashboard page composition-focused
- Keep components small
- Use clear names
- Avoid unnecessary dependencies
- Avoid premature optimization

---

# 50. Required Validation Tests

## Test 1 — Dashboard Loads

Sign in and open:

```text
/dashboard
```

Confirm:

- KPI cards still work
- Charts render
- Analytics sections render
- No runtime errors occur

---

## Test 2 — Category Chart

Verify the category chart matches the actual feedback dataset.

Check:

```text
bug
feature_request
complaint
praise
question
other
```

The sum must equal:

```text
Total Feedback
```

---

## Test 3 — Product Chart

Verify:

```text
Chat Interface
Dashboard
E-commerce
Not Specified
```

counts against the dataset.

The sum must equal:

```text
Total Feedback
```

---

## Test 4 — Sentiment Chart

Verify:

```text
positive
neutral
negative
```

counts against the dataset.

The sum must equal:

```text
Total Feedback
```

---

## Test 5 — Severity Chart

Verify:

```text
low
medium
high
critical
```

counts against the dataset.

The sum must equal:

```text
Total Feedback
```

---

## Test 6 — Trend

Verify:

- Dates are grouped correctly
- Dates are chronological
- Counts match feedback records
- No duplicate date buckets exist

---

## Test 7 — Top Issues

Verify:

- Null issues are excluded
- Empty issues are excluded
- Duplicate issues are grouped
- Highest counts appear first
- Maximum of five issues is displayed

---

## Test 8 — Recent Feedback

Verify:

- Records are sorted newest first
- Maximum five records are displayed
- Dates match `receivedAt`
- The newest feedback appears first

---

## Test 9 — Add Feedback

Use the Phase 4 data layer to add a record.

Refresh the dashboard.

Expected:

- Relevant KPI changes
- Relevant category chart changes
- Product chart changes when applicable
- Sentiment chart changes
- Severity chart changes
- Trend changes
- Top issues changes if the issue is relevant
- Recent feedback changes if the new record is among the five newest

---

## Test 10 — Update Feedback

Modify an existing feedback record.

Refresh the dashboard.

Expected analytics should reflect the updated record.

---

## Test 11 — Delete Feedback

If Phase 4 delete functionality exists:

Delete a record.

Refresh the dashboard.

Expected analytics should decrease accordingly.

---

## Test 12 — Empty Dataset

Set feedback storage to:

```json
[]
```

Reload the dashboard.

Confirm:

- KPI values are zero
- Charts show appropriate empty states
- Top Issues shows an empty state
- Recent Feedback shows an empty state
- No chart crashes occur

---

## Test 13 — Responsive Layout

Test:

- Desktop
- Tablet
- Mobile

Confirm:

- Charts fit their containers
- No horizontal overflow
- Titles remain readable
- Tooltips remain usable
- KPI cards remain functional

---

## Test 14 — Authentication Regression

Confirm:

- Unauthenticated users cannot access `/dashboard`
- Authenticated users can access the dashboard
- Sign-out still works

---

## Test 15 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 16 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 17 — Production Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

There must be no:

```text
localStorage is not defined
```

or hydration errors.

---

# 51. Definition of Done

Phase 6 is complete only when:

- [ ] Dashboard consumes actual feedback data
- [ ] Feedback by Category chart works
- [ ] Feedback by Product chart works
- [ ] Sentiment Distribution chart works
- [ ] Severity Distribution chart works
- [ ] Feedback Trend Over Time chart works
- [ ] Top Issues works
- [ ] Recent Feedback works
- [ ] All chart values are dynamically calculated
- [ ] No analytics values are hard-coded
- [ ] Category totals match KPI totals
- [ ] Product totals account for null products
- [ ] Sentiment totals match Total Feedback
- [ ] Severity totals match Total Feedback
- [ ] Trend dates are correctly grouped
- [ ] Trend dates are chronologically ordered
- [ ] Top Issues excludes null/empty issues
- [ ] Top Issues is limited to five
- [ ] Recent Feedback is limited to five
- [ ] Recent Feedback is sorted newest first
- [ ] Charts are responsive
- [ ] Empty datasets are handled
- [ ] Loading states work
- [ ] Error states work
- [ ] Clerk authentication remains intact
- [ ] No search/filter functionality was added
- [ ] No feedback CRUD UI was added
- [ ] No backend/database was introduced
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 52. Explicit Stop Point

After completing and validating Phase 6:

**STOP.**

Do not begin Phase 7.

Do not implement:

- Full feedback management table
- Search
- Category filters
- Product filters
- Sentiment filters
- Severity filters
- Date filters
- Feedback management interactions

The next phase will be:

```text
Phase 7 — Feedback Management
```

Proceed to Phase 7 only after Phase 6 has been explicitly reviewed and approved.
