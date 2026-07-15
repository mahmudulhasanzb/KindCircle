# KindCircle — Crowdfunding Platform

KindCircle is a production-ready, full-stack crowdfunding platform built with Next.js, React, Node.js, Express, and MongoDB. The platform empowers creators to raise funds (credits) for their projects while enabling supporters to securely pledge credits, purchase credits via Stripe, view dynamic statistics, and earn ranking badges.

* **Live Site URL:** [https://kindcircle.vercel.app](https://kindcircle.vercel.app)
* **Client-Side GitHub Repository:** [https://github.com/mahmudulhasanzb/KindCircle](https://github.com/mahmudulhasanzb/KindCircle)
* **Server-Side GitHub Repository:** [https://github.com/mahmudulhasanzb/KindCircle-Server](https://github.com/mahmudulhasanzb/KindCircle-Server)

---

## 🔑 Demo Credentials

Test the platform under 3 distinct user roles:

### 👤 Admin User
* **Email:** `admin@gmail.com`
* **Password:** `Admin123`

### 👤 Creator User
* **Email:** `creator@gmail.com`
* **Password:** `Creator123`

### 👤 Supporter User
* **Email:** `supporter@gmail.com`
* **Password:** `Supporter123` *(Or register a new supporter account to receive 50 free credits)*

---

## 🌟 Key Features

1. **Role-Based Authentication & Authorization**: Three tailored layouts and dashboard panels matching the permissions of Supporters, Creators, and Admins.
2. **JWT-Secure Backend Middleware**: Complete session verification built on top of Better Auth JWKS endpoints and `jose-cjs` signature verification on the Express server.
3. **Responsive Premium UI/UX Design**: Sleek dark-mode aesthetic built with Tailwind CSS, custom fonts (Inter), and Hero UI, fully optimized for mobile, tablet, and desktop viewports.
4. **Stripe Payment Integration**: Secure purchasing flows allowing supporters to buy packages of 100, 300, 800, or 1500 credits with real-time balance updates.
5. **Dynamic Campaign Discovery**: Comprehensive Explore page featuring real-time fuzzy text search, category filtering, and multi-field sorting options.
6. **Creator Campaign Pipeline**: Form builder allowing creators to upload covers via imgBB API, outline goals, and submit pending campaigns for admin approval.
7. **Pledge Approval & Refund Flow**: Creators can approve or reject pledges. Rejecting a pledge automatically refunds the supporter's credits instantly.
8. **Withdrawal System (20 Credits = $1)**: Automated calculator converting credits to USD ($10 minimum/200 credits) with options for Stripe, Nagad, Bkash, and Rocket payouts.
9. **Interactive Dashboard Charts**: Responsive Recharts implementations visualizing campaign progress (goals vs. raised amounts) and administrative donation trends.
10. **Floating Notification System**: Real-time notifications popover alert with unread count badges keeping users updated on campaign status, payout successes, and new contributions.
11. **Gamified Leaderboard & Badges**: Community podium showcasing top supporters and achievements (Bronze, Silver, Gold, Platinum badges) based on total approved backing.
12. **Admin Moderation Desk**: Complete control panel for managing users (roles/deletion), deleting campaigns, reviewing campaign reports, and processing payouts.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Hero UI, Framer Motion, Swiper.
* **Backend**: Node.js, Express.js, TypeScript, Better Auth, MongoDB, Mongoose, Jose, Stripe API.
* **Media hosting**: imgBB API for user and campaign images.

---

## 🚀 Setup & Execution

### Client-side Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Configure `.env` with Stripe Publishable Key, Better Auth secret, and API URLs.
4. Run development server: `npm run dev`

### Server-side Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Configure `.env` with MongoDB URI, Stripe Secret Key, and Port.
4. Start Express server: `npm run dev`
