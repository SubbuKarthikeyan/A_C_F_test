# Customer Feedback Intelligence
## Phase 8 — Feedback Details

### 1. Objective

Implement the **Feedback Details** experience for the Customer Feedback Intelligence application.

Phase 7 established the feedback management page with search, filters, sorting, and navigation to:

```text
/dashboard/feedback/[id]
```

Phase 8 now implements the actual detail page for an individual feedback record.

The goal is to provide a clear manager-oriented view of one complete feedback submission.

This phase is **view-only**.

---

# 2. Phase Scope

## Included

- Dynamic feedback detail route
- Fetch feedback by ID
- Full feedback information display
- Feedback metadata
- Category display
- Sentiment display
- Severity display
- Product display
- Feature display
- Issue display
- Full feedback body
- Sender information
- Received date
- Back navigation
- Not-found state
- Loading state
- Error state
- Responsive detail layout
- Navigation from feedback management
- Reusable detail components
- Validation using the Phase 4 data layer

## NOT Included

Do not implement:

- Edit feedback
- Delete feedback
- Create feedback
- Feedback form
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

Do not add a separate state-management library.

---

# 4. Detail Route

Implement:

```text
/dashboard/feedback/[id]
```

The dynamic:

```text
[id]
```

must identify a feedback record using its existing:

```ts
Feedback.id
```

Do not create a second identifier.

---

# 5. Data Source

Retrieve the feedback record using:

```ts
getFeedbackById(id)
```

from:

```text
lib/feedback.ts
```

Do not access localStorage directly from the detail UI.

The intended flow is:

```text
URL
 ↓
feedback ID
 ↓
getFeedbackById(id)
 ↓
Feedback | undefined
 ↓
Detail UI
```

---

# 6. No Direct Mock Data Access

Do not import:

```text
data/mock-feedback.ts
```

into the detail page.

The detail page must use the feedback service.

This preserves the abstraction established in Phase 4.

---

# 7. Authentication

The detail route must remain protected by the existing dashboard authentication.

Expected:

```text
Unauthenticated
      ↓
Sign In
      ↓
Dashboard
      ↓
Feedback Detail
```

Do not modify Clerk authentication.

Do not add role-based access control.

---

# 8. Detail Page Structure

Use a clear structure such as:

```text
Feedback Details

← Back to Feedback

┌──────────────────────────────────────────────┐
│ Subject                                      │
│                                              │
│ Category     Sentiment      Severity         │
│ Product                                      │
└──────────────────────────────────────────────┘

Sender Information

Name
Email

Feedback Information

Feature
Issue
Received Date

Message

Full feedback body
```

The exact visual layout may differ.

The information hierarchy should remain clear.

---

# 9. Required Fields

Display every field from the approved `Feedback` model:

```ts
id
receivedAt
name
email
subject
body
product
feature
issue
sentiment
category
severity
```

The internal ID does not necessarily need to be prominently displayed, but it must remain available for debugging/navigation if useful.

Do not omit approved feedback fields from the detail experience.

---

# 10. Subject

Display:

```ts
subject
```

as the primary page/detail heading.

Example:

```text
Dashboard takes too long to load
```

It should be visually prominent.

---

# 11. Sender Information

Display:

```text
Name
Email
```

Use:

```ts
name
email
```

from the feedback record.

Do not invent additional sender fields.

Do not display authentication information.

---

# 12. Received Date

Display:

```ts
receivedAt
```

as a readable date/time.

Example:

```text
September 12, 2026, 10:30 AM
```

The exact formatting can follow the application's existing date conventions.

Do not modify the stored ISO value.

---

# 13. Product

Display the:

```ts
product
```

value.

If:

```ts
product === null
```

display:

```text
Not Specified
```

Do not display:

```text
null
```

or:

```text
undefined
```

---

# 14. Feature

Display:

```ts
feature
```

If:

```ts
feature === null
```

display:

```text
Not Specified
```

Do not display raw null values.

---

# 15. Issue

Display:

```ts
issue
```

If:

```ts
issue === null
```

display:

```text
Not Specified
```

Do not display raw null values.

---

# 16. Category

Display the category using a readable label.

Internal values:

```text
bug
feature_request
complaint
praise
question
other
```

Display:

```text
Bug
Feature Request
Complaint
Praise
Question
Other
```

Do not modify the underlying category.

---

# 17. Sentiment

Display:

```text
Positive
Neutral
Negative
```

based on:

```ts
sentiment
```

Do not infer sentiment from the body.

Use the value stored in the feedback record.

---

# 18. Severity

Display:

```text
Low
Medium
High
Critical
```

based on:

```ts
severity
```

Do not calculate severity from the feedback body.

Use the stored value.

---

# 19. Full Feedback Body

Display the complete:

```ts
body
```

of the feedback.

Do not truncate the body on the detail page.

Preserve readable paragraphs and line breaks where possible.

Do not alter the user's feedback content.

---

# 20. Metadata Presentation

Use compact metadata elements for:

```text
Category
Sentiment
Severity
Product
```

Badges or labels may be used.

Example:

```text
Category
Bug

Sentiment
Negative

Severity
High

Product
Dashboard
```

Keep the presentation readable.

---

# 21. Semantic Meaning

Do not rely only on colors for:

```text
Category
Sentiment
Severity
```

Each value must include visible text.

For example:

```text
High
```

must remain understandable even without color.

---

# 22. Back Navigation

Provide a clear way to return to:

```text
/dashboard/feedback
```

Example:

```text
← Back to Feedback
```

Use normal Next.js navigation.

Do not rely only on browser history.

The user should have a predictable route back to feedback management.

---

# 23. Preserve Filter Context

Do not implement a complex filter-state persistence system.

If the user navigates from a filtered feedback page to a detail page, a simple:

```text
Back to Feedback
```

link to:

```text
/dashboard/feedback
```

is acceptable.

Do not add additional URL state unless explicitly required.

---

# 24. Invalid Feedback ID

If:

```ts
getFeedbackById(id)
```

returns:

```ts
undefined
```

show a clear not-found state.

Example:

```text
Feedback Not Found

The feedback record you are looking for does not exist.

Back to Feedback
```

Do not crash the page.

Do not show empty fake data.

---

# 25. Missing ID

If the route parameter is unavailable or invalid:

- Do not crash
- Show an appropriate not-found/error state
- Provide navigation back to feedback

---

# 26. Loading State

While the feedback record is being retrieved:

```text
Loading feedback...
```

Use the reusable loading-state foundation from Phase 3 where appropriate.

Do not show fake feedback content while loading.

---

# 27. Error State

If retrieving the record fails:

```text
Unable to load feedback.

Please try again.
```

Use the existing error-state foundation where appropriate.

Do not expose raw localStorage errors.

---

# 28. Responsive Design

The detail page must work on:

### Desktop

Use a comfortable two-column or structured layout where appropriate.

### Tablet

Maintain readable metadata and message sections.

### Mobile

Stack sections vertically.

Do not create horizontal overflow.

The full feedback body must remain readable on small screens.

---

# 29. Suggested Detail Layout

A practical structure:

```text
┌─────────────────────────────────────────────┐
│ ← Back to Feedback                          │
│                                             │
│ Dashboard takes too long to load            │
│                                             │
│ [Bug] [Negative] [High]                     │
│                                             │
│ Product: Dashboard                          │
└─────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────┐
│ Sender               │ Feedback Metadata   │
│                      │                      │
│ Name                 │ Product             │
│ Email                │ Feature             │
│                      │ Issue               │
│                      │ Received Date       │
└──────────────────────┴──────────────────────┘

┌─────────────────────────────────────────────┐
│ Message                                     │
│                                             │
│ Full feedback body...                       │
└─────────────────────────────────────────────┘
```

This is a recommendation, not a strict visual requirement.

---

# 30. Reusable Components

Suggested structure:

```text
components/
└── feedback/
    ├── feedback-detail.tsx
    ├── feedback-metadata.tsx
    ├── feedback-status-badges.tsx
    └── feedback-message.tsx
```

The exact filenames can differ.

Do not create excessive micro-components.

A component should exist when it provides clear reuse or keeps the detail page understandable.

---

# 31. Detail Page Composition

Keep:

```text
app/dashboard/feedback/[id]/page.tsx
```

focused primarily on:

- Route parameter
- Data retrieval
- Page composition
- Loading/error/not-found handling

Avoid putting all presentation markup and formatting logic into the page file.

---

# 32. Formatting Helpers

If label conversion is needed, use reusable helpers.

Examples:

```ts
bug → Bug
feature_request → Feature Request
```

Do not duplicate label-conversion logic across components.

A suitable location is:

```text
lib/utils.ts
```

or another existing utility file.

---

# 33. Data Integrity

The detail page must display the exact feedback record returned by:

```ts
getFeedbackById(id)
```

Do not:

- Modify the record
- Reclassify it
- Infer missing values
- Generate replacement content

Only presentation formatting is allowed.

---

# 34. No Edit Actions

Do not add:

```text
Edit
```

buttons.

Do not modify the feedback record from this page.

Editing is outside Phase 8.

---

# 35. No Delete Actions

Do not add:

```text
Delete
```

buttons.

Deletion UI is outside Phase 8.

---

# 36. No Create Actions

Do not add a feedback creation form.

The collection experience belongs to:

```text
Phase 9 — Feedback Collection
```

---

# 37. No AI Interpretation

Do not generate:

```text
AI summary
AI explanation
AI recommendations
AI classification
AI suggested response
```

The detail page displays stored feedback data only.

---

# 38. No Additional Fields

Do not add fields such as:

```text
priority
status
assignedTo
team
resolution
tags
source
customerId
userId
organizationId
```

unless explicitly approved later.

The approved feedback schema remains unchanged.

---

# 39. Accessibility

Ensure:

- Page has a clear main heading
- Metadata labels are semantic
- Links are keyboard accessible
- Back navigation has a meaningful label
- Badges contain visible text
- Long feedback body remains readable
- Focus states are visible
- Heading hierarchy is logical

---

# 40. Visual Requirements

The detail page should be:

- Clean
- Professional
- Manager-oriented
- Easy to scan
- Responsive
- Consistent with the existing dashboard

Use the existing Tailwind design language.

Do not redesign the whole application.

Do not introduce unnecessary animation.

---

# 41. Testing Strategy

Phase 8 must be validated against the actual Phase 4 feedback data.

Do not use hard-coded detail records.

---

# 42. Required Validation Tests

## Test 1 — Open Detail

From:

```text
/dashboard/feedback
```

click a feedback record.

Expected:

```text
/dashboard/feedback/[id]
```

loads successfully.

---

## Test 2 — Subject

Confirm the correct:

```text
subject
```

is displayed.

---

## Test 3 — Sender

Confirm:

```text
name
email
```

match the selected record.

---

## Test 4 — Product

Confirm:

```text
product
```

matches the record.

For null:

```text
Not Specified
```

must be shown.

---

## Test 5 — Feature

Confirm:

```text
feature
```

matches the record.

For null:

```text
Not Specified
```

must be shown.

---

## Test 6 — Issue

Confirm:

```text
issue
```

matches the record.

For null:

```text
Not Specified
```

must be shown.

---

## Test 7 — Category

Verify category label matches the stored category.

Test multiple categories:

```text
Bug
Feature Request
Complaint
Praise
Question
Other
```

---

## Test 8 — Sentiment

Verify:

```text
Positive
Neutral
Negative
```

matches the stored value.

---

## Test 9 — Severity

Verify:

```text
Low
Medium
High
Critical
```

matches the stored value.

---

## Test 10 — Date

Verify:

```text
receivedAt
```

is displayed correctly.

---

## Test 11 — Full Body

Verify the complete:

```text
body
```

is displayed.

Confirm the message is not unintentionally truncated.

---

## Test 12 — Invalid ID

Open a nonexistent route such as:

```text
/dashboard/feedback/does-not-exist
```

Expected:

```text
Feedback Not Found
```

with a working link back to:

```text
/dashboard/feedback
```

---

## Test 13 — Back Navigation

Click:

```text
Back to Feedback
```

Expected:

```text
/dashboard/feedback
```

---

## Test 14 — Responsive Layout

Test:

- Desktop
- Tablet
- Mobile

Confirm:

- No horizontal overflow
- Metadata remains readable
- Full message remains readable
- Back navigation remains accessible

---

## Test 15 — Authentication Regression

Confirm:

- Unauthenticated users cannot access the detail page
- Authenticated users can access it
- Sign-out continues to work

---

## Test 16 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 17 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 18 — Production Build

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

# 43. Definition of Done

Phase 8 is complete only when:

- [ ] `/dashboard/feedback/[id]` works
- [ ] Feedback is retrieved using `getFeedbackById()`
- [ ] Subject is displayed
- [ ] Name is displayed
- [ ] Email is displayed
- [ ] Product is displayed
- [ ] Feature is displayed
- [ ] Issue is displayed
- [ ] Category is displayed
- [ ] Sentiment is displayed
- [ ] Severity is displayed
- [ ] Received date is displayed
- [ ] Full feedback body is displayed
- [ ] Null product is handled
- [ ] Null feature is handled
- [ ] Null issue is handled
- [ ] Invalid IDs show a not-found state
- [ ] Loading state works
- [ ] Error state works
- [ ] Back navigation works
- [ ] Responsive layout works
- [ ] Accessibility basics are satisfied
- [ ] No edit UI was added
- [ ] No delete UI was added
- [ ] No creation form was added
- [ ] No AI functionality was added
- [ ] No new backend/database was introduced
- [ ] Clerk authentication remains intact
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 44. Explicit Stop Point

After completing and validating Phase 8:

**STOP.**

Do not begin Phase 9.

Do not implement:

- Feedback collection form
- Form validation
- New feedback creation
- LocalStorage write integration from UI
- Success/error submission states

The next phase will be:

```text
Phase 9 — Feedback Collection
```

Proceed to Phase 9 only after Phase 8 has been explicitly reviewed and approved.
