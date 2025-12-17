# BudgetMate - Features Summary

**Platform:** React Native (Expo) Mobile Application  
**Target Users:** Gen Z (18-30 years old)

---

## Overview

Personal finance management app combining budget tracking, financial education, earning opportunities, and community support with a modern cyberpunk/neon aesthetic.

**Stats:** 5 tabs | 8+ features | 8 database collections | 40+ API endpoints

---

## Tab-by-Tab Features

### 🏠 Home Tab
**Central dashboard for financial tracking**

- **Hero Card** - Available balance, spend percentage, budget vs actual
- **Quick Actions** - Add expense, view history
- **Financial Goals** - Emergency fund progress, savings rate tracker
- **Analytics** - Spending charts, category breakdown
- **Recent Transactions** - Last 3 transactions preview

**Data:** User budget settings, Expenses, Goals collections

---

### 📚 Learn Tab
**Financial literacy education hub**

- **Resource Library** - Curated articles, external links, category filtering
- **Topics:** Budgeting basics, emergency funds, investing, debt management, smart shopping
- **Features:** Search, category filtering, admin-managed content

**Data:** Articles collection (admin-curated)

---

### 💼 Earn Tab
**Side-hustle and income opportunities**

- **Job Listings** - Scrollable cards, category/difficulty filtering, pay transparency
- **Categories:** Virtual Assistant, Freelance/Remote, Part-time, Other gigs
- **Job Details** - Full description, requirements, pay range, "How to Start" guide
- **Earnings Tracker** - Log extra income, track sources, monthly charts
- **Filters:** Job type, difficulty (Easy/Medium/Hard)

**Data:** Jobs collection, Earnings collection, OnlineJobs.ph API

---

### 👥 Community Tab
**Social space for financial discussions**

- **Discussion Feed** - Posts with avatars (DiceBear), categories, likes/comments
- **Categories:** Budgeting, Savings, Side Hustles, Investing, Debt, Goals, Questions
- **Interactions:** Like posts, comment, delete (owner/admin)
- **Create Post** - FAB button, title/content/category form

**Data:** Posts collection (embedded comments), Users collection

---

### 👤 Profile Tab
**Account management and settings**

- **Profile Header** - Avatar (DiceBear), name, email
- **Account Settings** - Edit personal info, change password
- **Finance Settings** - Edit budget (income, categories, savings goals), emergency fund details
- **Admin Panel** (admin only) - Manage articles, jobs, categories
- **Logout** - Clear storage, redirect to login

**Data:** User collection, Goals, Expenses

---

## Core Functionalities

### 💰 Expense Management
- **CRUD Operations:** Add, view, edit, delete expenses
- **Features:** Amount, category, date, description, validation
- **Analytics:** Category breakdown, spending trends

**Backend:** `expenseRoutes.js` | **Model:** `Expense.js`

---

### 💵 Income Tracking
- **CRUD Operations:** Add, view, edit, delete earnings
- **Features:** Amount, source, date, description
- **Analytics:** Monthly charts, source breakdown

**Backend:** `earningRoutes.js` | **Model:** `Earning.js`

---

### 🎯 Financial Goals
- **CRUD Operations:** Create, track, update, delete goals
- **Features:** Goal name, target amount, current amount, target date, category
- **Emergency Fund:** Dedicated screen, progress tracking, motivational messages

**Backend:** `goalRoutes.js` | **Model:** `Goal.js`

---

### 📊 Budget Configuration
- **Onboarding:** 4-step setup (welcome, income, spending/savings, goals)
- **Settings:** Monthly income, payment frequency, spending categories, savings rate
- **Calculations:** Available balance, spend percentage, remaining budget

**Backend:** `budgetRoutes.js` | **Storage:** AsyncStorage + User model

---

## Authentication & Security

### 🔐 Authentication
- **Registration:** Email/password, username, avatar seed generation
- **Login:** Email OR username, JWT tokens (7-day expiration)
- **Google OAuth:** One-tap sign-in, automatic account creation
- **Password Security:** Bcrypt hashing (10 rounds), no plain-text storage

**Endpoints:** `/api/auth/*` (signup, login, profile, password change)

---

### 🛡️ Security
- **JWT Tokens:** Bearer token authorization, 7-day expiration
- **Password Hashing:** bcrypt with 10 salt rounds
- **Validation:** express-validator middleware for all inputs
- **Access Control:** Role-based (user/admin), resource ownership checks

---

## Admin Features

### 🛡️ Admin Panel
**Access:** Admin role required, protected by adminMiddleware

**Article Management:**
- Create/edit/delete articles
- Title, description, content, URL, category
- Publish/unpublish control

**Job Management:**
- Create/edit/delete job listings
- Title, description, difficulty, pay range, requirements
- Category assignment, external URL

**Category Management:**
- Add/delete spending categories
- Unique name validation

**Frontend:** `app/(tabs)/profile/admin-panel.jsx`

---

## Technical Stack

**Frontend:**
- React Native (Expo), Expo Router, AsyncStorage, Axios
- Icons: @expo/vector-icons, Charts: react-native-chart-kit

**Backend:**
- Node.js, Express.js, MongoDB, Mongoose v8.20.0
- JWT, bcrypt, express-validator, CORS

**External:**
- DiceBear API (avatars), OnlineJobs.ph (jobs), Google OAuth

---

## Design System

**Colors:**
- Background: `#141326` (Dark Purple)
- Cards: `#433DA3` (Light Purple)
- Primary: `#E3823C` (Orange)
- Accent: `#FFC107` (Yellow)

**Typography:** Poppins (Bold, SemiBold, Medium, Regular)

**Components:** Custom buttons, inputs, cards, modals, toasts, progress bars, charts

---

## Project Structure

```
BudgetMate/
├── backend/
│   ├── models/          # 8 Mongoose schemas
│   ├── routes/          # 9 API route files
│   └── middleware/      # Auth, admin, validation
│
└── mobile/
    ├── app/
    │   ├── (tabs)/     # 5 main tabs
    │   └── auth/       # Login, signup
    └── src/            # Reusable components
```

---

## Navigation Structure

**Tabs (Bottom Navigation):**
1. Home - Budget tracking
2. Learn - Education
3. Earn - Jobs
4. Community - Forum
5. Profile - Settings

**Auth Screens:** Login, Signup  
**Onboarding:** 4-step budget setup  
**Sub-screens:** Add expense, history, emergency fund, admin panel, personal info

---

**For detailed technical documentation, see:**
- [Documentation.md](./Documentation.md) - Complete technical reference
- [Database-Schema.md](./Database-Schema.md) - All 8 schemas with inline comments
- [mobile-app-documentation.md](./mobile-app-documentation.md) - Mobile app implementation

---

**Last Updated:** December 17, 2025 | **Version:** 1.0
