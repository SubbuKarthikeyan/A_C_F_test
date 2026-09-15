# Customer Feedback Intelligence

A modern, responsive, manager-oriented web application for collecting, exploring, triaging, and analyzing customer feedback in real time.

---

## Overview

**Customer Feedback Intelligence** provides product and customer operations teams with a unified workspace to monitor incoming feedback, track key sentiment and severity metrics, triage reports, inspect detailed submissions, and collect new feedback with instant dashboard synchronization.

The application operates as a full-featured frontend prototype utilizing browser `localStorage` for responsive client-side persistence and mock data seeding.

---

## Features

- **Authenticated Dashboard Shell**:
  - Protected navigation routes integrated with **Clerk Authentication**.
  - Persistent sidebar navigation with category-specific sub-links (`Bug Reports`, `Feature Requests`, `Complaints`, `Praise`, `Questions`, `Other`).
  - Account menu and responsive mobile navigation drawer.

- **KPI Metrics Dashboard (`/dashboard`)**:
  - Seven real-time KPI indicator cards: *Total Feedback*, *Bugs*, *Feature Requests*, *Complaints*, *Praise*, *Questions*, and *Other*.
  - Dynamic calculations derived reactively from stored feedback data.

- **Visual Analytics & Trend Charts**:
  - **Category Distribution**: Bar chart breakdown across feedback categories.
  - **Product Distribution**: Bar chart comparing feedback across product lines (*Chat Interface*, *Dashboard*, *E-commerce*, *Not Specified*).
  - **Sentiment Distribution**: Positive, Neutral, and Negative proportions.
  - **Severity Distribution**: Low, Medium, High, and Critical severity triage levels.
  - **Feedback Trend Over Time**: Chronological area chart tracking submissions by calendar day.
  - **Top Issues & Recent Submissions**: Highlighting top friction points and the latest incoming feedback.

- **Feedback Management (`/dashboard/feedback`)**:
  - Multi-faceted filtering by Category, Product, Sentiment, Severity, and Date Range (`From` / `To`).
  - Real-time search across Customer Name, Email, Subject, Body, Feature, and Issue.
  - Desktop data table and mobile card views with styled status badges and active result counts.
  - Seamless filter resetting and synchronization with URL category parameters.

- **Feedback Detail View (`/dashboard/feedback/[id]`)**:
  - Comprehensive inspection of individual submissions including sender information, product context, category/sentiment/severity classifications, received timestamp, and full untruncated message body.
  - Handles missing optional fields with clean `"Not Specified"` fallbacks and provides graceful loading and not-found states with return navigation.

- **Feedback Collection (`/dashboard/collect`)**:
  - Controlled feedback submission form with client-side field validation and email format checking.
  - Optional field mapping (`product`, `feature`, `issue`) to `null`.
  - Automatic unique ID generation and ISO timestamping via the feedback service layer (`addFeedback()`).
  - Duplicate click prevention and instant redirection to feedback management upon submission.

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [@clerk/nextjs](https://clerk.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Data Persistence**: Browser `localStorage` with initial mock seeding

---

## Project Structure

```text
customer-feedback-intelligence/
├── app/
│   ├── layout.tsx                # Root layout with ClerkProvider
│   ├── page.tsx                  # Public landing page
│   ├── sign-in/[[...sign-in]]/   # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/   # Clerk sign-up page
│   └── dashboard/
│       ├── layout.tsx            # Protected dashboard shell layout
│       ├── page.tsx              # KPI overview & analytics dashboard
│       ├── feedback/
│       │   ├── page.tsx          # Feedback management & filter list
│       │   └── [id]/page.tsx     # Feedback detail inspection page
│       └── collect/
│           └── page.tsx          # Feedback collection form page
├── components/
│   ├── charts/                   # Recharts data distribution components
│   ├── dashboard/                # KPI grid and summary cards
│   ├── feedback/                 # Management table, filters, cards, detail view
│   ├── forms/                    # Feedback collection form and fields
│   ├── header/                   # Authenticated topbar with Clerk UserButton
│   ├── layout/                   # Dashboard main containers and shell
│   ├── sidebar/                  # Sidebar navigation and group config
│   └── ui/                       # Loading, empty, and error state components
├── data/
│   └── mock-feedback.ts          # Initial seed dataset (24 feedback items)
├── lib/
│   ├── analytics.ts              # Distribution, trend, and issue calculators
│   ├── dashboard.ts              # KPI aggregation functions
│   ├── feedback.ts               # Storage service (get, add, update, delete, reset)
│   ├── feedback-filters.ts       # Filter, search, and sorting logic
│   ├── feedback-formatters.ts    # Label and date presentation formatters
│   ├── feedback-validation.ts    # Form validation and input transformer
│   └── utils.ts                  # Shared helper utilities
├── types/
│   └── feedback.ts               # TypeScript data definitions and domain enums
├── .env.example                  # Environment variable template
└── package.json
```

---

## Local Development & Setup

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher
- **npm** (or pnpm / yarn)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file by copying `.env.example`:
```bash
cp .env.example .env.local
```

Populate the required Clerk API keys in `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Validation Commands

To verify code quality, typing, and production build integrity:

```bash
# TypeScript Typecheck
npx tsc --noEmit

# ESLint Code Quality
npm run lint

# Next.js Production Build
npm run build
```

---

## Prototype Scope Note

This application is built as a complete **frontend prototype**. Feedback records are stored and modified within browser `localStorage` and automatically synchronize across tabs using storage events without requiring a backend database server.

**There is no backend or database in this version.** All data is client-side only.

---

## Current Scope

| Feature | Status |
|---|---|
| Clerk Authentication | ✅ Implemented |
| KPI Dashboard | ✅ Implemented |
| Analytics Charts | ✅ Implemented |
| Feedback Management | ✅ Implemented |
| Feedback Details | ✅ Implemented |
| Feedback Collection | ✅ Implemented |
| Backend API | ❌ Not implemented |
| Database persistence | ❌ Not implemented |
| AI classification | ❌ Not implemented |
| Email notifications | ❌ Not implemented |

