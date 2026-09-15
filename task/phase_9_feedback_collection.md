# Customer Feedback Intelligence
## Phase 9 — Feedback Collection

### 1. Objective

Implement the **Feedback Collection** experience for the Customer Feedback Intelligence application.

Phase 4 established the feedback data layer.
Phase 5 established KPI analytics.
Phase 6 established charts and analytics.
Phase 7 established feedback management.
Phase 8 established the feedback detail page.

Phase 9 now implements the form that allows a user to create a new feedback record.

The form must use the existing Phase 4 data model and persist submissions through the existing feedback service.

This remains a **frontend-only local prototype**.

---

# 2. Phase Scope

## Included

- Feedback collection page
- Feedback form
- Controlled form inputs
- Required-field validation
- Optional-field handling
- Product selection
- Feature input
- Issue input
- Category selection
- Sentiment selection
- Severity selection
- Description/body input
- Email validation
- Submission through `addFeedback()`
- Automatic ID generation through the data layer
- Automatic `receivedAt` timestamp
- Success state
- Error state
- Reset behavior
- Form loading/submission state
- Navigation after successful submission
- Responsive layout
- Accessibility basics
- Validation against the dashboard and feedback management pages

## NOT Included

Do not implement:

- Backend API
- Database
- MongoDB
- Server-side persistence
- AI/LLM
- Automatic classification
- AI-generated sentiment
- AI-generated category
- AI-generated severity
- RAG
- Embeddings
- Vector database
- n8n
- Gmail
- Google Sheets
- Notifications
- Role-based authorization
- Edit form
- Delete UI
- Bulk import

The application continues to use localStorage.

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

Do not introduce a form library unless explicitly approved.

For this phase, controlled React state and simple validation are sufficient.

---

# 4. Main Route

Use:

```text
/dashboard/collect
```

as the feedback collection page.

This route already exists as a placeholder from Phase 3.

Replace the placeholder with the actual feedback collection form.

---

# 5. Authentication

The feedback collection page must remain inside the authenticated dashboard.

Expected:

```text
Unauthenticated
      ↓
Sign In
      ↓
Dashboard
      ↓
Collect Feedback
```

Do not modify Clerk authentication.

Do not add role-based permissions.

---

# 6. Data Source

The form must submit through:

```ts
addFeedback()
```

from:

```text
lib/feedback.ts
```

Do not access:

```ts
localStorage
```

directly from the form.

The intended flow is:

```text
User enters form
       ↓
Client-side validation
       ↓
Create Feedback object
       ↓
addFeedback()
       ↓
LocalStorage
       ↓
Success
```

---

# 7. Feedback Schema

Use the existing `Feedback` model exactly.

```ts
export interface Feedback {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  product: Product | null;
  feature: string | null;
  issue: string | null;
  sentiment: Sentiment;
  category: Category;
  severity: Severity;
}
```

Do not add fields.

Do not rename fields.

Do not change the allowed values.

---

# 8. Form Fields

The form must provide these fields:

```text
Name
Email
Subject
Product
Feature
Issue
Category
Sentiment
Severity
Description
```

The form's:

```text
Description
```

field maps to:

```ts
body
```

in the feedback model.

Do not create a separate `description` field in the stored object.

---

# 9. Field Requirements

Use the following requirements.

### Name

Required.

Must not be empty.

---

### Email

Required.

Must not be empty.

Must have basic valid email formatting.

Example:

```text
user@example.com
```

Do not implement advanced email verification.

---

### Subject

Required.

Must not be empty.

---

### Product

Optional.

Allowed values:

```text
Chat Interface
Dashboard
E-commerce
```

Also allow:

```text
Not Specified
```

which must be stored as:

```ts
null
```

Do not store:

```text
"Not Specified"
```

as the product value.

---

### Feature

Optional.

If empty, store:

```ts
null
```

Do not store empty strings when a field is conceptually absent.

---

### Issue

Optional.

If empty, store:

```ts
null
```

Do not store empty strings when a field is conceptually absent.

---

### Category

Required.

Allowed values:

```text
bug
feature_request
complaint
praise
question
other
```

---

### Sentiment

Required.

Allowed values:

```text
positive
neutral
negative
```

---

### Severity

Required.

Allowed values:

```text
low
medium
high
critical
```

---

### Description

Required.

Maps to:

```ts
body
```

Must not be empty.

---

# 10. Product Selection

Display readable labels:

```text
Not Specified
Chat Interface
Dashboard
E-commerce
```

The internal value mapping must be:

```text
Not Specified → null
Chat Interface → "Chat Interface"
Dashboard → "Dashboard"
E-commerce → "E-commerce"
```

Do not modify the `Product` type.

---

# 11. Category Selection

Display:

```text
Bug
Feature Request
Complaint
Praise
Question
Other
```

Map them to:

```text
bug
feature_request
complaint
praise
question
other
```

Do not add additional categories.

---

# 12. Sentiment Selection

Display:

```text
Positive
Neutral
Negative
```

Store the corresponding existing sentiment value.

Do not infer sentiment from the message.

The user explicitly selects it in this phase.

---

# 13. Severity Selection

Display:

```text
Low
Medium
High
Critical
```

Store the corresponding existing severity value.

Do not calculate severity automatically.

---

# 14. Form State

Use controlled form state.

A practical form state can contain:

```text
name
email
subject
product
feature
issue
category
sentiment
severity
body
```

Do not store:

```text
id
receivedAt
```

as user-editable form fields.

Those are generated during submission.

---

# 15. ID Generation

Do not ask the user to provide an ID.

The feedback service/data layer is responsible for generating a unique ID when creating a new record.

Use the existing Phase 4 implementation.

Do not duplicate ID-generation logic in the form unless the service explicitly requires the ID.

---

# 16. Received Date

Do not ask the user to enter:

```text
receivedAt
```

When the form is submitted, create the timestamp automatically.

Use the current time and store it as an ISO string.

Example:

```ts
new Date().toISOString()
```

The final record must contain:

```ts
receivedAt: string
```

in ISO format.

---

# 17. Submission Object

After successful validation, construct a valid `Feedback` record.

Conceptually:

```ts
const feedback = {
  id: generatedId,
  receivedAt: new Date().toISOString(),
  name,
  email,
  subject,
  body,
  product,
  feature,
  issue,
  sentiment,
  category,
  severity,
};
```

However, if `addFeedback()` already generates the ID, do not generate the ID twice.

Follow the existing Phase 4 service contract.

---

# 18. Validation Strategy

Use simple client-side validation.

Do not add Zod or another validation framework.

Validation must happen before calling:

```ts
addFeedback()
```

---

# 19. Required Validation

At minimum validate:

```text
Name is not empty
Email is not empty
Email format is valid
Subject is not empty
Category is selected
Sentiment is selected
Severity is selected
Description/body is not empty
```

Optional fields may remain empty.

---

# 20. Whitespace Handling

Treat whitespace-only values as empty.

For example:

```text
"     "
```

should not pass required validation.

Use trimming where appropriate.

Do not accidentally remove meaningful whitespace from the stored feedback body.

---

# 21. Email Validation

Use a simple validation rule.

Example concept:

```text
name@domain.com
```

should pass.

Clearly malformed values such as:

```text
abc
abc@
@domain.com
```

should fail.

Do not attempt to prove that an email address actually exists.

---

# 22. Validation Error Display

Errors should be displayed close to the relevant field.

Example:

```text
Email
[ abc ]

Please enter a valid email address.
```

Do not show only one generic message at the top while hiding field-specific errors.

A general submission error may additionally be shown at the top.

---

# 23. Required Field Indicators

Clearly communicate required fields.

For example:

```text
Name *
Email *
Subject *
```

Optional fields can be labeled:

```text
Feature (optional)
Issue (optional)
```

Do not rely only on browser behavior to communicate required fields.

---

# 24. Browser Validation

You may use HTML attributes such as:

```text
required
type="email"
```

but do not rely exclusively on browser-native validation.

The application should have explicit validation logic so behavior remains predictable.

---

# 25. Submit Button

Provide:

```text
Submit Feedback
```

button.

While submitting, change the label to something such as:

```text
Submitting...
```

The button must be disabled while the submission is in progress.

---

# 26. Prevent Duplicate Submission

Prevent multiple rapid submissions.

When the form is submitting:

```text
Submit button → disabled
```

Do not create duplicate feedback records from repeated clicks.

---

# 27. Successful Submission

After:

```ts
addFeedback()
```

succeeds:

Show a clear success state.

Example:

```text
Feedback submitted successfully.
```

The user should have a clear next action.

---

# 28. Post-Submission Navigation

After successful submission, navigate to:

```text
/dashboard/feedback
```

This allows the user to verify that the new feedback appears in the feedback management page.

A brief success indication may be shown before navigation if practical.

Do not navigate to an unimplemented route.

---

# 29. Dashboard Update

After successful submission and navigation to:

```text
/dashboard/feedback
```

the new record must appear because the feedback management page reads from the same localStorage-backed data layer.

The dashboard analytics should also reflect the new record when refreshed.

The form must not maintain a separate feedback dataset.

---

# 30. Form Reset

If the application remains on the form after a successful submission for any reason, the form should reset.

However, the preferred flow is:

```text
Submit
  ↓
Success
  ↓
Navigate to /dashboard/feedback
```

Do not reset the form before a successful submission.

If submission fails, preserve the user's entered values.

---

# 31. Submission Error

If:

```ts
addFeedback()
```

fails:

- Keep the user's form values
- Display a clear error
- Re-enable the submit button
- Allow retry

Example:

```text
Unable to submit feedback.

Please try again.
```

Do not expose raw storage errors.

---

# 32. Form Layout

A simple layout is recommended:

```text
Collect Feedback

Personal Information

Name *
Email *

Feedback Information

Subject *
Product
Feature
Issue

Classification

Category *
Sentiment *
Severity *

Message

Description *

[Submit Feedback]
```

The exact visual layout may differ.

---

# 33. Responsive Design

The form must work on:

### Desktop

Use a comfortable form width.

### Tablet

Maintain readable spacing and field sizes.

### Mobile

Stack fields vertically.

Inputs must not overflow the viewport.

---

# 34. Two-Column Fields

On larger screens, related fields may use two columns.

For example:

```text
Name                 Email
Subject              Product
Feature              Issue
Category             Sentiment
Severity
```

On mobile:

```text
Name
Email
Subject
Product
Feature
Issue
Category
Sentiment
Severity
Description
```

Do not force two-column layouts on small screens.

---

# 35. Description Field

Use a:

```html
<textarea>
```

for:

```text
Description
```

It maps to:

```ts
body
```

Allow enough vertical space for a meaningful feedback message.

Do not impose an unnecessarily tiny character limit.

---

# 36. Optional Fields

The following are optional:

```text
Product
Feature
Issue
```

If they are left empty:

```ts
product → null
feature → null
issue → null
```

Do not store:

```text
""
```

for these absent values.

---

# 37. Form Defaults

Do not invent classifications.

A safe initial state is:

```text
Product: Not Specified
Category: unselected
Sentiment: unselected
Severity: unselected
```

Required classification fields should force an intentional user selection.

Do not silently default category, sentiment, or severity to a value.

---

# 38. Accessibility

Ensure:

- Every input has a visible label
- Labels are associated with inputs
- Required fields are clearly indicated
- Error messages are understandable
- Error messages are associated with their fields where practical
- Select controls are keyboard accessible
- Submit button has a meaningful label
- Disabled state is understandable
- Focus states are visible

Do not rely only on placeholder text as a label.

---

# 39. Reusable Components

Suggested structure:

```text
components/
└── forms/
    ├── feedback-form.tsx
    ├── form-field.tsx
    └── form-message.tsx
```

The exact filenames may differ.

Do not create excessive abstraction.

The primary reusable component should be:

```text
FeedbackForm
```

---

# 40. Validation Utility

If validation becomes large enough to justify separation, create:

```text
lib/feedback-validation.ts
```

A reusable function could be:

```ts
validateFeedbackForm(values)
```

It should return structured validation errors.

Do not introduce a validation framework.

---

# 41. Service Responsibility

The form is responsible for:

```text
Collecting input
Validating input
Constructing submission data
Calling addFeedback()
Showing UI state
```

The data service is responsible for:

```text
ID generation
Persistence
Storage validation
LocalStorage
```

Keep these responsibilities separated.

---

# 42. Data Integrity

The form must never create records with invalid domain values.

Before submission, ensure:

```text
category ∈ approved categories
sentiment ∈ approved sentiments
severity ∈ approved severities
product ∈ approved products OR null
```

Do not trust arbitrary values from the UI.

---

# 43. No Automatic Classification

Do not implement logic such as:

```text
If message contains "broken" → category = bug
```

or:

```text
If message sounds angry → sentiment = negative
```

The user explicitly provides:

```text
Category
Sentiment
Severity
```

in this phase.

Automatic classification is outside scope.

---

# 44. No Backend

Do not create:

```text
/api/feedback
```

or any backend endpoint.

Do not introduce server actions for persistence unless explicitly required by a later architecture decision.

Continue using:

```text
addFeedback()
```

with localStorage.

---

# 45. No Database

Do not introduce:

```text
MongoDB
PostgreSQL
Prisma
Mongoose
Redis
Chroma
```

or any other database.

---

# 46. Integration Requirements

After successful submission, verify the record appears in:

```text
/dashboard/feedback
```

Then open its detail page:

```text
/dashboard/feedback/[id]
```

and verify all submitted fields are present.

The same record should also affect:

```text
/dashboard
```

KPI and analytics calculations.

---

# 47. Testing Strategy

Phase 9 must be validated end-to-end through the existing frontend data flow.

Do not only test whether the form button changes state.

Test the complete path:

```text
Form
 ↓
Validation
 ↓
addFeedback()
 ↓
localStorage
 ↓
Feedback Management
 ↓
Feedback Details
 ↓
Dashboard Analytics
```

---

# 48. Required Validation Tests

## Test 1 — Open Form

Open:

```text
/dashboard/collect
```

Confirm:

- Form loads
- All required fields exist
- Optional fields are clearly identified
- Submit button exists

---

## Test 2 — Empty Submission

Submit without entering anything.

Expected:

- Validation errors appear
- No feedback record is created
- User remains on the form

---

## Test 3 — Invalid Email

Enter:

```text
invalid-email
```

Expected:

```text
Invalid email error
```

No record should be created.

---

## Test 4 — Required Fields

Leave each required field empty one at a time.

Confirm validation catches:

```text
Name
Email
Subject
Category
Sentiment
Severity
Description
```

---

## Test 5 — Optional Fields

Submit valid feedback with:

```text
Product: Not Specified
Feature: empty
Issue: empty
```

Expected stored values:

```ts
product: null
feature: null
issue: null
```

---

## Test 6 — Valid Submission

Submit a complete valid feedback record.

Expected:

- Validation passes
- Button enters submitting state
- Record is saved
- Success occurs
- User navigates to `/dashboard/feedback`

---

## Test 7 — New Record in Feedback Management

After submission:

```text
/dashboard/feedback
```

Expected:

- New record appears
- It appears near the top because `receivedAt` is current
- Result count increases by one

---

## Test 8 — New Record Detail

Open the newly created feedback.

Confirm:

- Name matches
- Email matches
- Subject matches
- Product matches
- Feature matches
- Issue matches
- Category matches
- Sentiment matches
- Severity matches
- Full body matches
- Received date exists

---

## Test 9 — Dashboard KPI Update

After creating feedback, refresh:

```text
/dashboard
```

Expected:

- Total Feedback increases by one
- Relevant category KPI increases by one

---

## Test 10 — Dashboard Analytics Update

After creating feedback, verify Phase 6 analytics update:

- Category chart
- Product chart
- Sentiment chart
- Severity chart
- Trend
- Top Issues when applicable
- Recent Feedback

---

## Test 11 — Duplicate Submission

Rapidly click:

```text
Submit Feedback
```

multiple times.

Expected:

- Only one record is created
- Submit button becomes disabled during submission

---

## Test 12 — Submission Failure

Simulate a storage failure if practical.

Expected:

- Error message appears
- Form values remain
- Submit button becomes available again
- User can retry

---

## Test 13 — Form Reset Behavior

After a successful submission:

- Confirm navigation occurs
- Return to `/dashboard/collect`
- Confirm a fresh form is displayed

---

## Test 14 — Responsive Form

Test:

- Desktop
- Tablet
- Mobile

Confirm:

- Fields remain readable
- Inputs fit viewport
- Buttons remain accessible
- No horizontal overflow

---

## Test 15 — Accessibility

Verify:

- Labels are associated with inputs
- Required fields are understandable
- Keyboard navigation works
- Errors are understandable
- Focus states are visible

---

## Test 16 — Authentication Regression

Confirm:

- Unauthenticated users cannot access `/dashboard/collect`
- Authenticated users can access it
- Sign-out continues to work

---

## Test 17 — TypeScript

Run:

```bash
npx tsc --noEmit
```

Expected:

```text
No TypeScript errors
```

---

## Test 18 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

---

## Test 19 — Production Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

No browser API, hydration, or TypeScript build errors should occur.

---

# 49. Definition of Done

Phase 9 is complete only when:

- [ ] `/dashboard/collect` contains the feedback form
- [ ] Name field works
- [ ] Email field works
- [ ] Subject field works
- [ ] Product field works
- [ ] Feature field works
- [ ] Issue field works
- [ ] Category field works
- [ ] Sentiment field works
- [ ] Severity field works
- [ ] Description/body field works
- [ ] Required validation works
- [ ] Email validation works
- [ ] Whitespace-only required values are rejected
- [ ] Optional empty fields become null
- [ ] Category values remain within the approved list
- [ ] Sentiment values remain within the approved list
- [ ] Severity values remain within the approved list
- [ ] Product values remain within the approved list or null
- [ ] ID generation is handled by the data layer
- [ ] `receivedAt` is generated automatically
- [ ] Submission uses `addFeedback()`
- [ ] localStorage is not accessed directly by the form
- [ ] Duplicate submission is prevented
- [ ] Loading/submitting state works
- [ ] Success state works
- [ ] Submission error state works
- [ ] Form values are preserved when submission fails
- [ ] Successful submission navigates to feedback management
- [ ] New record appears in feedback management
- [ ] New record appears correctly in feedback details
- [ ] KPI dashboard reflects the new record
- [ ] Analytics reflect the new record
- [ ] Responsive layout works
- [ ] Accessibility basics are satisfied
- [ ] Clerk authentication remains intact
- [ ] No backend/database was introduced
- [ ] No AI classification was introduced
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 50. Explicit Stop Point

After completing and validating Phase 9:

**STOP.**

Do not begin Phase 10.

Do not implement additional features beyond the approved project scope.

The final phase will be:

```text
Phase 10 — UI Polish & Final Validation
```

Proceed to Phase 10 only after Phase 9 has been explicitly reviewed and approved.
