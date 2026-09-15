# Customer Feedback Intelligence
## Phase 4 — Feedback Data Layer

### 1. Objective

Implement the **frontend feedback data layer** for the Customer Feedback Intelligence application.

Phase 1 provides the project foundation, Phase 2 provides Clerk authentication, and Phase 3 provides the dashboard shell.

Phase 4 introduces the application's feedback data model and local prototype storage.

The goal is to create a clean data abstraction that allows the UI to:

- Read feedback
- Add feedback
- Update feedback
- Find feedback by ID
- Persist feedback locally
- Reset to initial mock data when local storage has no data

This is a **frontend-only local prototype**.

There is no backend or database in this phase.

---

# 2. Phase Scope

## Included

- Feedback TypeScript model
- Feedback category types
- Sentiment types
- Severity types
- Product values
- Mock feedback dataset
- LocalStorage-based persistence
- Feedback service abstraction
- Read feedback
- Add feedback
- Update feedback
- Get feedback by ID
- Delete feedback if required by the service design
- Safe localStorage handling
- Initial mock data loading
- Data validation at the application boundary
- Testing of the feedback data layer

## NOT Included

Do not implement:

- Dashboard KPI cards
- Charts
- Analytics
- Search UI
- Filters UI
- Feedback table UI
- Feedback detail UI
- Feedback collection form UI
- AI/LLM
- Gemini
- Groq
- OpenAI
- Mistral
- DeepSeek
- RAG
- Embeddings
- Vector database
- Hybrid search
- RRF
- LangChain
- LangGraph
- MCP
- n8n
- Gmail
- Google Sheets
- MongoDB
- Backend API
- Database
- Authentication changes
- Role-based authorization

Phase 4 is the **feedback data layer only**.

---

# 3. Technology Requirements

Continue using the existing stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- Recharts

Do not add a database.

Do not add a backend.

Do not introduce:

```text
Redux
Zustand
React Query
Axios
Prisma
Mongoose
MongoDB
PostgreSQL
Chroma
Redis
LangChain
Zod
```

unless explicitly approved.

For this phase, browser `localStorage` is sufficient.

---

# 4. Feedback Data Model

Create:

```text
types/feedback.ts
```

Use the following model exactly.

```ts
export type Product =
  | "Chat Interface"
  | "Dashboard"
  | "E-commerce";

export type Sentiment =
  | "positive"
  | "neutral"
  | "negative";

export type Category =
  | "bug"
  | "feature_request"
  | "complaint"
  | "praise"
  | "question"
  | "other";

export type Severity =
  | "low"
  | "medium"
  | "high"
  | "critical";

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

Do not add additional fields.

Do not rename these fields.

Do not change the allowed enum values.

---

# 5. Product Values

Products are exactly:

```text
Chat Interface
Dashboard
E-commerce
```

The `product` field can also be:

```ts
null
```

Do not add other products.

---

# 6. Category Values

Categories are exactly:

```text
bug
feature_request
complaint
praise
question
other
```

Do not add:

```text
suggestion
billing
technical
support
account
```

or any other category.

---

# 7. Sentiment Values

Allowed sentiment values:

```text
positive
neutral
negative
```

No additional sentiment values should be introduced.

---

# 8. Severity Values

Allowed severity values:

```text
low
medium
high
critical
```

No additional severity values should be introduced.

---

# 9. Mock Feedback Dataset

Create:

```text
data/mock-feedback.ts
```

Export a realistic initial dataset.

Example:

```ts
import type { Feedback } from "@/types/feedback";

export const mockFeedback: Feedback[] = [
  {
    id: "feedback-001",
    receivedAt: "2026-09-01T09:30:00.000Z",
    name: "Arun Kumar",
    email: "arun@example.com",
    subject: "Dashboard takes too long to load",
    body: "The dashboard takes several seconds to load when I open it.",
    product: "Dashboard",
    feature: "Dashboard loading",
    issue: "Slow page load",
    sentiment: "negative",
    category: "bug",
    severity: "high",
  },
];
```

The actual dataset should contain enough records to test:

- All categories
- All sentiment values
- All severity values
- All products
- Records with `null` product
- Records with `null` feature
- Records with `null` issue
- Different dates

Use realistic but fictional data.

Do not use real people's personal information.

Do not make all records artificially identical.

A useful prototype dataset should contain approximately **20–30 records**.

Do not generate thousands of records.

---

# 10. Mock Data Quality

The dataset should provide enough variation for later dashboard testing.

Ensure:

### Categories

At least one record for:

```text
bug
feature_request
complaint
praise
question
other
```

### Sentiment

At least one record for:

```text
positive
neutral
negative
```

### Severity

At least one record for:

```text
low
medium
high
critical
```

### Products

Include:

```text
Chat Interface
Dashboard
E-commerce
null
```

where appropriate.

### Dates

Use different `receivedAt` values across multiple dates.

This will allow Phase 5 and Phase 6 to test dynamic metrics and trends.

---

# 11. Local Storage Strategy

Use browser `localStorage` as the prototype persistence layer.

Use one clearly defined storage key.

For example:

```ts
const FEEDBACK_STORAGE_KEY = "customer-feedback-intelligence-feedback";
```

Keep the key centralized.

Do not scatter storage keys throughout components.

---

# 12. Data Layer Abstraction

Create:

```text
lib/feedback.ts
```

This file must act as the abstraction between UI components and local storage.

The UI should not directly manipulate:

```ts
localStorage
```

Instead, use service functions.

At minimum implement:

```ts
getFeedback()
getFeedbackById(id)
addFeedback(feedback)
updateFeedback(feedback)
```

A delete function may be implemented if useful for future CRUD support:

```ts
deleteFeedback(id)
```

Do not expose localStorage implementation details to UI components.

---

# 13. Suggested Service API

Use a simple API similar to:

```ts
export function getFeedback(): Feedback[];

export function getFeedbackById(
  id: string
): Feedback | undefined;

export function addFeedback(
  feedback: Feedback
): Feedback[];

export function updateFeedback(
  feedback: Feedback
): Feedback[];

export function deleteFeedback(
  id: string
): Feedback[];
```

The exact return shape may be adjusted if there is a clear engineering reason.

Do not introduce unnecessary classes or repository frameworks.

---

# 14. Browser Safety

Remember that:

```ts
localStorage
```

does not exist during server-side rendering.

Do not access localStorage at module initialization in a way that breaks Next.js server rendering.

Use browser-safe checks such as:

```ts
typeof window !== "undefined"
```

where required.

The implementation must not cause:

```text
ReferenceError: localStorage is not defined
```

during:

```bash
npm run build
```

---

# 15. Initial Data Loading

When local storage has no feedback data:

```text
localStorage empty
        ↓
Load mock feedback
        ↓
Persist mock feedback
        ↓
Return feedback
```

This allows the application to start with useful sample data.

When local storage already contains feedback:

```text
localStorage contains feedback
        ↓
Use stored feedback
```

Do not overwrite existing user-created feedback with mock data.

---

# 16. Data Persistence

When new feedback is added:

```text
addFeedback()
      ↓
Update in-memory collection
      ↓
Persist to localStorage
```

When feedback is updated:

```text
updateFeedback()
      ↓
Update matching record
      ↓
Persist to localStorage
```

When feedback is deleted, if delete functionality is implemented:

```text
deleteFeedback()
      ↓
Remove matching record
      ↓
Persist to localStorage
```

---

# 17. ID Handling

Every feedback record must have a unique:

```text
id
```

Mock IDs may be fixed.

New records must receive unique IDs.

Use a simple browser-safe ID generation approach.

Do not add another dependency just for ID generation.

For example, a combination of:

```ts
crypto.randomUUID()
```

with a safe fallback may be used where supported.

Do not use predictable sequential IDs for newly created records if avoidable.

---

# 18. Date Handling

The:

```text
receivedAt
```

field must be stored as an ISO 8601 string.

Example:

```text
2026-09-01T09:30:00.000Z
```

Do not store JavaScript `Date` objects directly in localStorage.

When serializing:

```ts
JSON.stringify()
```

must produce valid persisted data.

When reading:

```ts
JSON.parse()
```

must produce values matching the `Feedback` structure.

---

# 19. Input Validation

The service layer should protect against malformed feedback data.

At minimum verify:

- `id` exists
- `receivedAt` exists
- `name` is a string
- `email` is a string
- `subject` is a string
- `body` is a string
- `category` is valid
- `sentiment` is valid
- `severity` is valid
- `product` is either an allowed product or `null`
- `feature` is a string or `null`
- `issue` is a string or `null`

Do not introduce Zod or another validation library.

A small internal validation function is sufficient.

---

# 20. Handling Corrupted Local Storage

The application should not crash if the local storage value is invalid.

Example situation:

```text
localStorage
    ↓
Invalid JSON
```

Expected behavior:

```text
Invalid stored data
       ↓
Ignore invalid data
       ↓
Fall back to mock feedback
```

Do not allow malformed local storage to break the application.

---

# 21. Handling Empty Local Storage

If the storage key exists but contains:

```ts
[]
```

treat that as valid stored data.

Do not automatically replace an intentionally empty array with mock data.

Only use mock data when there is no valid stored feedback collection.

---

# 22. Error Handling

The data layer should fail gracefully.

Do not expose raw storage exceptions directly to the UI unless necessary.

Where appropriate:

```text
Storage unavailable
      ↓
Use safe fallback behavior
```

The application should remain usable during development even if localStorage is unavailable.

Do not build a complex logging framework.

---

# 23. Separation of Responsibilities

Keep responsibilities separated.

### `types/feedback.ts`

Defines:

```text
Feedback
Product
Category
Sentiment
Severity
```

### `data/mock-feedback.ts`

Contains:

```text
Initial mock feedback records
```

### `lib/feedback.ts`

Handles:

```text
Reading
Writing
Updating
Deleting
Validation
LocalStorage
```

Components should consume the service rather than implementing storage logic themselves.

---

# 24. No UI Implementation Yet

Do not implement:

- Feedback table
- Feedback cards
- Feedback details
- Search interface
- Filter controls
- Feedback form

The existing placeholder pages from Phase 3 may remain placeholders.

The goal is to make the data layer ready for those pages.

---

# 25. Authentication Relationship

Feedback data is local prototype data.

Do not create user-specific database relationships.

Do not modify Clerk.

Do not add:

```text
userId
ownerId
createdBy
organizationId
```

to the feedback model.

These fields were not approved and are not part of the current schema.

---

# 26. Future Backend Compatibility

Although localStorage is being used now, keep the service interface independent from storage implementation.

Future UI code should ideally call:

```ts
getFeedback()
addFeedback()
updateFeedback()
getFeedbackById()
```

rather than:

```ts
localStorage.getItem(...)
localStorage.setItem(...)
```

This allows the localStorage implementation to later be replaced by a backend API without rewriting the dashboard components.

Do not implement the backend now.

---

# 27. TypeScript Requirements

Use strict TypeScript.

Avoid:

```ts
any
```

unless technically unavoidable.

Prefer:

```ts
Feedback[]
Feedback | undefined
```

and explicit function return types.

Keep the data model centralized.

---

# 28. Testing Strategy

Phase 4 must be validated before moving to the next phase.

Testing can initially be done through a temporary development test mechanism if needed.

Do not build a permanent test UI just for this phase unless explicitly approved.

---

# 29. Required Validation Tests

## Test 1 — Build

Run:

```bash
npm run build
```

Expected:

```text
Build succeeds
```

There must be no server-side localStorage errors.

---

## Test 2 — Initial Data

Clear the application's local storage.

Load the application.

Call:

```ts
getFeedback()
```

Expected:

- Mock feedback is returned
- Mock feedback is persisted
- Dataset contains approximately 20–30 records

---

## Test 3 — All Categories

Verify the dataset contains:

```text
bug
feature_request
complaint
praise
question
other
```

---

## Test 4 — Sentiments

Verify the dataset contains:

```text
positive
neutral
negative
```

---

## Test 5 — Severity

Verify the dataset contains:

```text
low
medium
high
critical
```

---

## Test 6 — Products

Verify the dataset contains:

```text
Chat Interface
Dashboard
E-commerce
```

and appropriate `null` product values.

---

## Test 7 — Get By ID

Select an existing feedback ID.

Call:

```ts
getFeedbackById(id)
```

Expected:

```text
Correct feedback record returned
```

For a nonexistent ID:

```ts
getFeedbackById("does-not-exist")
```

Expected:

```text
undefined
```

---

## Test 8 — Add Feedback

Create a valid feedback object.

Call:

```ts
addFeedback(feedback)
```

Expected:

- New feedback exists
- New ID is unique
- Collection size increases by one
- localStorage is updated

Reload the application.

Expected:

- New feedback still exists

---

## Test 9 — Update Feedback

Modify an existing feedback record.

Call:

```ts
updateFeedback(updatedFeedback)
```

Expected:

- Existing record is changed
- Record count does not increase
- localStorage contains updated values

Reload the application.

Expected:

- Updated values remain

---

## Test 10 — Delete Feedback

If delete functionality is implemented:

```ts
deleteFeedback(id)
```

Expected:

- Matching record is removed
- Other records remain
- localStorage is updated

Reload the application.

Expected:

- Deleted record remains deleted

---

## Test 11 — Invalid Stored JSON

Manually place invalid JSON into the feedback localStorage key.

Reload the application.

Expected:

- Application does not crash
- Invalid storage is ignored
- Mock feedback is restored

---

## Test 12 — Empty Array

Store:

```json
[]
```

in the feedback storage key.

Reload the application.

Expected:

- Empty array is treated as valid data
- Mock feedback is not automatically reinserted

---

## Test 13 — Authentication Regression

Confirm Phase 2 still works:

- Sign in
- Access dashboard
- Sign out
- Dashboard remains protected

The data layer must not break authentication.

---

## Test 14 — Lint

Run:

```bash
npm run lint
```

Expected:

```text
No lint errors
```

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

# 30. Definition of Done

Phase 4 is complete only when:

- [ ] `Feedback` interface exists
- [ ] Product type is correct
- [ ] Category type is correct
- [ ] Sentiment type is correct
- [ ] Severity type is correct
- [ ] No unapproved fields were added
- [ ] Mock feedback dataset exists
- [ ] Dataset contains approximately 20–30 realistic records
- [ ] All categories are represented
- [ ] All sentiments are represented
- [ ] All severities are represented
- [ ] All products are represented
- [ ] Appropriate nullable values exist
- [ ] Dates vary across multiple dates
- [ ] LocalStorage persistence works
- [ ] Initial mock data loads correctly
- [ ] Existing stored data is not overwritten
- [ ] Empty array is handled correctly
- [ ] Invalid JSON is handled safely
- [ ] `getFeedback()` works
- [ ] `getFeedbackById()` works
- [ ] `addFeedback()` works
- [ ] `updateFeedback()` works
- [ ] Delete works if implemented
- [ ] IDs are unique
- [ ] Dates use ISO strings
- [ ] UI does not directly depend on localStorage
- [ ] Clerk authentication remains intact
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes

---

# 31. Explicit Stop Point

After completing and validating Phase 4:

**STOP.**

Do not begin Phase 5.

Do not implement:

- KPI cards
- Dashboard metrics
- Category counts
- Product counts
- Sentiment counts
- Severity counts
- Analytics
- Charts

The next phase will be:

```text
Phase 5 — KPI Dashboard
```

Proceed to Phase 5 only after Phase 4 has been explicitly reviewed and approved.
