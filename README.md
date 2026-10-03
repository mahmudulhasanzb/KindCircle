# KindCircle — Crowdfunding Platform

A modern, full-stack crowdfunding platform connecting creators and backers through an escrow-backed, tokenized credit economy. Supporters purchase credits via Stripe, back impactful campaigns, and climb community leaderboards, while creators manage campaigns, review pledges with automated refund safeguards, and request fiat withdrawals directly to Stripe or mobile financial services (bKash, Nagad, Rocket).

[![Live Application](https://img.shields.io/badge/Live-Demo-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white)](https://kindcircle.vercel.app)
[![Frontend Repo](https://img.shields.io/badge/GitHub-Frontend_Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mahmudulhasanzb/KindCircle.git)
[![Backend Repo](https://img.shields.io/badge/GitHub-Backend_Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mahmudulhasanzb/KindCircle-Server.git)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Campaign & Escrow Pipeline](#campaign--escrow-pipeline)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Architecture & Data Flow](#architecture--data-flow)
- [Component Reference](#component-reference)
- [Security & Access Control](#security--access-control)
- [Accessibility & Standards](#accessibility--standards)

---

## Overview

**KindCircle** reimagines community crowdfunding with a friction-free credit tokenization model. Instead of recurring small credit card fees for every micro-contribution, backers top up their balance in bulk via Stripe and allocate credits to initiatives they care about. 

Contributions enter an escrow state until reviewed by the creator. If rejected or cancelled, credits instantly revert to the supporter's wallet. Once campaigns reach their milestones, creators can convert accumulated credits to USD ($1 per 20 credits) and withdraw to bank accounts or local mobile wallets.

### Demo Credentials

Test the platform across all three role-based dashboard experiences:

| Role | Email | Password | Starter Balance | Primary Capabilities |
|---|---|---|---|---|
| **Admin** | `admin@gmail.com` | `Admin123` | N/A | Campaign moderation, user management, payout approvals, platform metrics |
| **Creator** | `creator@gmail.com` | `Creator123` | 20 Credits | Campaign drafting, pledge approvals/refunds, withdrawal requests, performance analytics |
| **Supporter** | `supporter@gmail.com` | `Supporter123` | 50 Credits | Credit top-ups via Stripe, project backing, contribution history, leaderboard rank |

*(Tip: Registering a new supporter account automatically grants 50 free starter credits.)*

---

## Tech Stack

| Layer | Technology | Version / Details |
|---|---|---|
| **Framework** | Next.js | 16.2.10 (App Router, Server Actions, Server Components) |
| **Frontend Library** | React | 19.2.4 |
| **Styling** | Tailwind CSS | v4 (`@tailwindcss/postcss`, CSS-first configuration) |
| **Component System** | HeroUI | v3.2 (`@heroui/react`, `@heroui/theme`, `@heroui/styles`) |
| **Icons & Motion** | Lucide React & Framer Motion | `@gravity-ui/icons`, dynamic micro-interactions |
| **Data Visualization** | Recharts | 3.9.2 (Responsive campaign & administrative analytics) |
| **Carousels** | Swiper | 14.0.5 (Hero discovery banner carousel) |
| **Backend API** | Express | 5.2.1 (Node.js, TypeScript, single-file server) |
| **Database** | MongoDB Atlas | Native Driver v7.5 (Direct collections, zero Mongoose overhead) |
| **Authentication** | Better Auth | 1.6.23 (MongoDB adapter + JWT + JWKS bridge + Google OAuth) |
| **Payments** | Stripe | Hosted Checkout Sessions (Credit bundle top-ups) |
| **Media Hosting** | imgBB API | Multipart image upload for campaign covers |
| **Feedback & Forms** | React Hook Form & React Hot Toast | Reactive validation and toast telemetry |
| **Deployment** | Vercel | Production CDN edge deployment |

---

## Features

- **3-Tier Role-Based Dashboards** — Tailored control consoles for Supporters (`/dashboard/supporter`), Creators (`/dashboard/creator`), and Admins (`/dashboard/admin`).
- **Tokenized Credit Economy** — Supporters buy packaged credit bundles (100, 300, 800, 1500 credits) with automated balance updates upon checkout confirmation.
- **Escrow Pledging & Instant Refunds** — Backer pledges remain in escrow until reviewed by the creator. Rejecting a pledge instantly refunds credits to the backer.
- **Automated Withdrawal Calculator** — Creators withdraw earnings at a fixed rate of **20 Credits = $1 USD** (minimum 200 credits / $10) via Stripe, bKash, Nagad, or Rocket.
- **Dynamic Campaign Discovery** — Full-text search, category filtering (Technology, Education, Community, etc.), and multi-field sorting (Date, Goal, Raised).
- **Admin Moderation & Audit Desk** — Full oversight desk for approving/rejecting new campaigns, managing user roles, inspecting reports, and processing payouts.
- **Interactive Recharts Analytics** — Visual progress tracking comparing fundraising goals with total raised amounts for creators and platform-wide donation statistics for admins.
- **Floating Notification Center** — Real-time notification popover with unread counter badges alerting users to pledge decisions, campaign approvals, and payouts.
- **Gamified Community Leaderboard** — Backer leaderboard celebrating top contributors with dynamic achievement badges (**Bronze**, **Silver**, **Gold**, **Platinum**).
- **Decoupled JWKS Authentication** — Client issues session tokens verified asymmetrically by Express backend microservices via public JWKS endpoints.
- **Direct imgBB Media Ingestion** — Automatic client-side campaign cover photo uploads directly to imgBB servers with instant preview.
- **Accessible & Responsive** — Dark-mode aesthetic, WCAG AA compliance, semantic HTML landmarks, and mobile-friendly tap targets.

---

## Project Structure

```
KindCircle/
├── public/                               # Static assets, branding, and favicons
├── src/
│   ├── app/                              # Next.js 16 App Router
│   │   ├── (auth)/                       # Authentication route group
│   │   │   ├── register/                 # Role-aware registration (Supporter / Creator)
│   │   │   └── signin/                   # Credential & Google OAuth login
│   │   ├── (dashboardLayout)/            # Authenticated workspace shell
│   │   │   └── dashboard/
│   │   │       ├── admin/                # Admin moderation, users, payouts & reports
│   │   │       │   ├── campaigns/        # Platform-wide campaign directory
│   │   │       │   ├── campaigns-approval/# Pending campaign approval desk
│   │   │       │   ├── home/             # Platform stats & donation trends
│   │   │       │   ├── reports/          # Campaign abuse reports console
│   │   │       │   ├── users/            # User role assignment & deletion
│   │   │       │   └── withdrawals/      # Creator payout processing
│   │   │       ├── creator/              # Creator project studio & finance
│   │   │       │   ├── add-campaign/     # Campaign creation form & imgBB upload
│   │   │       │   ├── history/          # Pledge decision & contribution log
│   │   │       │   ├── home/             # Creator fundraising charts & metrics
│   │   │       │   ├── my-campaigns/     # Active, pending & finished campaigns
│   │   │       │   └── withdrawals/      # Credit-to-fiat withdrawal requests
│   │   │       └── supporter/            # Backer dashboard & wallet
│   │   │           ├── contributions/    # Backed projects & pledge statuses
│   │   │           ├── history/          # Stripe purchase receipts & credit logs
│   │   │           ├── home/             # Wallet balance & supported causes
│   │   │           └── purchase/         # Stripe credit package checkout
│   │   ├── (mainLayout)/                 # Public marketing & discovery site
│   │   │   ├── about/                    # Mission statement & team
│   │   │   ├── campaigns/                # Public campaign explorer & detail views
│   │   │   ├── leaderboard/              # Top backer podium & achievement badges
│   │   │   ├── privacy/                  # Privacy policy documentation
│   │   │   └── terms/                    # Platform terms & escrow conditions
│   │   ├── api/auth/[...all]/            # Better Auth API handler route
│   │   ├── globals.css                   # Tailwind v4 theme & CSS variables
│   │   ├── layout.tsx                    # Root layout with font definitions
│   │   ├── loading.tsx                   # Global loading spinner
│   │   ├── not-found.tsx                 # Custom 404 page
│   │   └── providers.tsx                 # HeroUI & Theme provider wrapper
│   ├── components/
│   │   ├── layout/                       # Navbar, Footer, DashboardSideBar, NotificationPopup
│   │   └── ui/                           # Reusable UI cards, tables, forms, and charts
│   ├── lib/
│   │   ├── api/                          # Server actions & fetch mutations to backend
│   │   ├── auth.ts                       # Better Auth server configuration (Mongo Adapter)
│   │   ├── auth-client.ts                # Better Auth client hooks (`useSession`, `signIn`)
│   │   ├── types/                        # Shared TypeScript interfaces
│   │   └── uploadImage.ts                # imgBB multipart image upload helper
│   └── proxy.ts                          # Edge route protection & RBAC redirection
├── .env.example                          # Documented environment template
├── next.config.ts                        # Next.js configuration
├── package.json                          # Client dependencies & scripts
└── tsconfig.json                         # TypeScript configuration
```

---

## Campaign & Escrow Pipeline

```
[ Creator ] ──► Drafts Campaign (Title, Story, Goal, Cover via imgBB)
                     │
                     ▼
[ Admin Desk ] ─► Review & Moderation (Approves / Rejects)
                     │
                     ├─► [Rejected] ─► Notifies Creator
                     │
                     ▼ [Approved]
[ Discovery Catalog ] ─► Public Explorer (Search, Filter, Detail Page)
                              │
                              ▼
[ Supporter ] ─► Pledges Credits from Wallet (Stripe Top-Up)
                     │
                     ▼
          [ Credits Held in Escrow ]
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    [ Creator Approves ]   [ Creator Rejects ]
          │                     │
          ▼                     ▼
Funds Credited to Campaign  Credits Instantly Refunded
          │                 to Supporter Wallet
          ▼
Campaign Goal Reached
          │
          ▼
[ Creator Payout Request ] (20 Credits = $1 USD, min $10)
          │
          ▼
[ Admin Audits Payout ] ──► Payout Disbursed (Stripe / bKash / Nagad / Rocket)
```

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** or **pnpm**
- **MongoDB Atlas** database cluster
- **imgBB API Key** (for campaign cover uploads)
- **KindCircle-Server** running on `http://localhost:5000`

### 1. Backend Setup

```bash
cd KindCircle-Server
npm install
cp .env.example .env
npm run dev
```

*Server starts on `http://localhost:5000`.*

### 2. Frontend Setup

```bash
cd KindCircle
npm install
cp .env.example .env.local
npm run dev
```

*Client starts on `http://localhost:3000`.*

### Environment Variables

Configure `.env.local` in `KindCircle` using the template below:

```bash
# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Better Auth & Database
BETTER_AUTH_SECRET=your_better_auth_secret_here
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/KindCircle?retryWrites=true&w=majority
TRUSTED_ORIGINS=http://localhost:3000,http://localhost:5000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Upload (imgBB)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles optimized production bundle with type checking |
| `npm run start` | Boots production server |
| `npm run lint` | Runs Next.js ESLint validation |
| `npx tsc --noEmit` | Validates TypeScript types across the entire codebase |

---

## Architecture & Data Flow

### Session & Identity Bridge

```
Next.js Client (Browser)
    │  (Better Auth Session Cookie)
    ▼
Edge Middleware (`proxy.ts`)
    │  (Validates session token & role in < 20 ms)
    ▼
Next.js API Handler (`/api/auth/*`)
    │  (Exposes public JWKS endpoint)
    ▼
Express Microservice (`KindCircle-Server`)
    │  (Asymmetric token verification via `jose-cjs`)
    ▼
MongoDB Atlas Native Driver (Direct collections)
```

### Key Design Decisions

- **Single Source of Truth in Dashboards**: All role workspaces share the `(dashboardLayout)` shell, standardizing navigation and token headers.
- **Escrow-Backed Credit Protection**: Pledged credits are deducted from supporter balances and placed into pending escrow. Rejections trigger an immediate database reversal, guaranteeing supporters never lose credits on unfunded or declined pledges.
- **Layered API Boundary**: All mutations flow through `src/lib/api/` using Next.js Server Actions with automatic `revalidatePath()` calls to prevent stale client caches.
- **Direct imgBB Ingestion**: Media uploads are handled asynchronously without loading binary streams into the application server, saving bandwidth and compute resources.

---

## Component Reference

| Component | Location | Purpose |
|---|---|---|
| `Navbar` | `components/layout/Navbar.tsx` | Responsive header with auth status, wallet badge, and navigation links |
| `DashboardSideBar` | `components/layout/DashboardSideBar.tsx` | Dynamic sidebar adapting menu items to Supporter, Creator, or Admin roles |
| `NotificationPopup` | `components/layout/NotificationPopup.tsx` | Real-time notification popover with unread counter badges |
| `Footer` | `components/layout/Footer.tsx` | Accessible footer with semantic landmarks and quick platform links |
| `CampaignGrid` | `components/ui/CampaignGrid.tsx` | Searchable, filterable campaign catalog with real-time sort |
| `CampaignCard` | `components/ui/CampaignCard.tsx` | Progress card showing goal %, days left, category, and credit target |
| `AddCampaignForm` | `components/ui/AddCampaignForm.tsx` | Multi-field campaign creation form with direct imgBB integration |
| `ContributionForm` | `components/ui/ContributionForm.tsx` | Escrow pledge modal allowing supporters to back campaigns |
| `PendingContributionsTable` | `components/ui/PendingContributionsTable.tsx` | Creator pledge review desk with 1-click Approve and Refund actions |
| `WithdrawalForm` | `components/ui/WithdrawalForm.tsx` | Interactive credit-to-USD calculator and payout dispatcher |
| `CampaignApprovalTable` | `components/ui/CampaignApprovalTable.tsx` | Admin moderation table for approving or rejecting submitted campaigns |
| `UserManagementTable` | `components/ui/UserManagementTable.tsx` | Admin user console for editing roles and managing accounts |
| `CreatorStatsChart` | `components/ui/CreatorStatsChart.tsx` | Recharts bar visualization comparing campaign goals against amounts raised |
| `AdminStatsChart` | `components/ui/AdminStatsChart.tsx` | Administrative chart displaying platform-wide funding trends |

---

## Security & Access Control

- **Edge Route Protection:** All `/dashboard/*` paths evaluate authenticated session cookies at the edge via `proxy.ts`, redirecting unauthorized users or mismatched roles before executing page renders.
- **Role-Based Access Control (RBAC):** Strict boundaries prevent supporters from accessing creator tools, creators from accessing admin consoles, and unauthenticated visitors from accessing dashboards.
- **Cryptographic JWKS Bridge:** Next.js and Express communicate through asymmetric JWT signature verification using `jose-cjs` without sharing database secret keys.
- **Defensive Data Projections:** MongoDB database operations selectively project public fields, protecting sensitive user data.
- **Origin-Locked CORS:** Express server CORS policies are locked to designated application domains and local development origins.

---

## Accessibility & Standards

- **WCAG AA Compliance:** Color pairings exceed 4.5:1 contrast ratios across dark mode surfaces.
- **Semantic Landmarks:** Pages structured using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Keyboard Navigation:** High-contrast focus rings and visible `:focus-visible` styling applied across all buttons, inputs, and modals.
- **Touch-Friendly Targets:** All interactive links, buttons, and form inputs meet or exceed `44 × 44 px` dimensions.
- **Screen Reader Support:** Icon buttons feature explicit `aria-label` attributes, dynamic dialogs include `aria-modal="true"`, and dropdown menus reflect `aria-expanded` state.
