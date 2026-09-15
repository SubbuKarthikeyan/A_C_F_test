# Customer Feedback Intelligence
## Phase 2 — Clerk Authentication

### Objective
Implement Clerk authentication for the existing Customer Feedback Intelligence frontend.

### Scope
- Clerk sign-up
- Clerk sign-in
- Clerk sign-out
- Protected `/dashboard`
- Clerk session/user handling
- Clerk account UI
- Authentication validation

### Out of Scope
Do not implement dashboard functionality, feedback data/forms/tables, charts, analytics, search, filters, mock data, LocalStorage feedback storage, backend/API, database, AI/LLM, RAG, embeddings, vector DB, n8n, Gmail, Google Sheets, MongoDB, custom authentication, custom passwords/JWT/session handling, or role-based authorization.

## 1. Technology
Use the existing stack:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk

Use the official `@clerk/nextjs` package. Do not add another authentication library or unnecessary dependencies.

## 2. Clerk Integration
Use the current official Clerk integration for Next.js. Verify the current Clerk documentation before implementation. If the current version requires `proxy.ts`, middleware, or another routing/protection approach, use the current official approach rather than outdated examples. Do not invent configuration or environment-variable names.

## 3. Environment Variables
Use `.env.local` for real local Clerk credentials and `.env.example` for placeholders. Never commit `.env.local` or hard-code credentials. Environment-variable names must match the current official Clerk documentation for the installed version.

## 4. Public Routes
Keep these public:
```text
/
/sign-in
/sign-up
```
The root page should have simple `Sign In` and `Create Account` actions. Do not redesign the landing page.

## 5. Sign-In
Create `/app/sign-in/page.tsx` using Clerk's official prebuilt sign-in component. Do not build a custom authentication form. Clerk handles credentials, verification, sessions, errors, and password handling.

## 6. Sign-Up
Create `/app/sign-up/page.tsx` using Clerk's official prebuilt sign-up component. Do not implement custom registration logic.

## 7. Protected Dashboard
Protect `/dashboard`. Unauthenticated users must be redirected to the appropriate Clerk sign-in flow according to the current official implementation. The dashboard itself is only a placeholder such as:
```text
Dashboard
You are authenticated.
```
Do not build actual dashboard features.

## 8. User Account UI
Use Clerk's official authenticated user/account component and sign-out functionality. Do not create a custom profile or authentication system.

## 9. Authentication State
Clerk is the source of truth for authentication state. Do not create a separate authentication system and do not use localStorage, sessionStorage, custom cookies, or custom JWTs for authentication.

## 10. Temporary Authenticated Layout
A minimal authenticated header may be created for testing, containing items such as:
```text
Customer Feedback Intelligence
Dashboard
User Account
```
Do not build the final sidebar/navigation. That belongs to Phase 3.

## 11. Expected Routing
Unauthenticated:
```text
/ → Sign In / Create Account
/dashboard → Sign In / authentication required
```
Authenticated:
```text
/sign-in → authenticated Clerk flow
/sign-up → authenticated Clerk flow
/dashboard → accessible
```
Sign-out must return the user to an unauthenticated state, and `/dashboard` must again require authentication.

## 12. Architecture
Clerk is responsible for:
- Authentication
- Sessions
- User identity
- Sign in
- Sign up
- Sign out
- Account management

The application is responsible for:
- Protected routing
- Application UI
- Authenticated page rendering

Do not duplicate Clerk's responsibilities.

## 13. Relevant File Structure
After Phase 2, the relevant structure should approximately be:
```text
customer-feedback-intelligence/
│
├── app/
│   ├── page.tsx
│   ├── sign-in/
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── ...
├── public/
├── .env.local
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```
If the current Clerk version requires a root-level `proxy.ts` or another protection file, add it according to the official documentation. Do not create unnecessary files.

## 14. Root Layout
Configure the root layout with Clerk's provider according to the current official Clerk Next.js setup. Keep business logic out of the root layout.

## 15. Styling
Use the existing Tailwind CSS setup. Sign-in and sign-up pages should be clean, centered, responsive, and consistent with the basic project style. Do not spend time on final visual polish.

## 16. TypeScript
Use TypeScript throughout. Avoid `any` unless technically necessary. Prefer Clerk-provided types/APIs.

## 17. Validation
Complete all of these tests before declaring Phase 2 complete.

### Test 1 — Development Server
```bash
npm run dev
```
Application starts without errors.

### Test 2 — Landing Page
Open `/`. Confirm the page loads and Sign In/Create Account actions work.

### Test 3 — Sign Up
Open `/sign-up`, create a test Clerk account, confirm authentication succeeds, and confirm `/dashboard` is accessible.

### Test 4 — Sign In
Sign out, open `/sign-in`, sign in with the test account, and confirm `/dashboard` is accessible.

### Test 5 — Protected Route
Sign out and directly open `/dashboard`. Confirm unauthenticated access is blocked and the user is sent through the appropriate authentication flow.

### Test 6 — User Account
While authenticated, open the Clerk account UI and confirm the current user and account controls work.

### Test 7 — Sign Out
Sign out and then attempt to open `/dashboard`. It must require authentication again.

### Test 8 — TypeScript
```bash
npx tsc --noEmit
```
Expected: no TypeScript errors.

### Test 9 — Lint
```bash
npm run lint
```
Expected: no lint errors.

### Test 10 — Production Build
```bash
npm run build
```
Expected: successful build.

## 18. Security Requirements
Never:
- Store passwords manually
- Store Clerk secrets in source code
- Commit `.env.local`
- Implement custom JWT authentication
- Implement custom sessions
- Log authentication secrets
- Expose secret keys to the client

Use Clerk's official security model.

## 19. Code Quality
- Keep components small
- Use clear naming
- Keep authentication logic through Clerk
- Avoid duplicate protection logic
- Avoid unnecessary dependencies
- Keep implementation easy to understand
- Do not over-engineer Phase 2

## 20. Definition of Done
- [ ] Clerk package installed and configured
- [ ] Environment variables correctly configured
- [ ] Root layout uses Clerk correctly
- [ ] `/sign-in` works
- [ ] `/sign-up` works
- [ ] `/dashboard` is protected
- [ ] Authenticated users can access `/dashboard`
- [ ] Unauthenticated users cannot access `/dashboard`
- [ ] Clerk user/account UI works
- [ ] Sign-out works
- [ ] Sign-out removes dashboard access
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Production build passes
- [ ] No authentication secrets are committed
- [ ] No custom authentication system was introduced

## 21. Explicit Stop Point
After completing and validating Phase 2:

**STOP.**

Do not begin Phase 3. Do not implement dashboard shell, sidebar, dashboard navigation, KPI cards, charts, feedback tables, feedback forms, or analytics.

The next phase is:
```text
Phase 3 — Dashboard Shell
```
Proceed to Phase 3 only after Phase 2 has been explicitly reviewed and approved.
