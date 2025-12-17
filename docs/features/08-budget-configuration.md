# Budget Configuration

## Overview
Personalized budget setup and management for tracking income, expenses, and savings.

---

## Features

**1. Onboarding Flow (First-time users)**
- 4-step setup process:
  1. Welcome screen
  2. Income setup (monthly income, payment frequency)
  3. Spending & savings configuration (categories, savings rate)
  4. Goal setting (emergency fund, annual savings)
- Guided walkthrough for new users

**2. Income Configuration**
- Monthly income amount input
- Payment frequency selection (Weekly, Bi-weekly, Monthly)
- Used for budget calculations

**3. Spending Categories**
- Select primary expense categories
- Multi-select interface
- Custom category support
- Examples: Food, Transportation, Entertainment, Bills, Savings

**4. Savings Goals**
- Target savings rate (percentage of income)
- Estimated monthly savings calculation
- Emergency fund goal amount
- Annual savings goal amount

**5. Budget Calculations**
- Available balance = Income - Total Expenses
- Total spent = Sum of all expenses
- Spend percentage = (Total Spent / Income) × 100
- Remaining budget = Income - Total Spent
- Savings progress = Current Savings / Target

**6. Edit Budget Settings**
- Update all budget parameters anytime
- Real-time recalculation
- Endpoint: `PUT /api/budget/settings`

---

## Data Storage

**AsyncStorage (Local):**
- Key: `userBudget`
- Stores budget settings for offline access

**Backend (User Model):**
- `monthlyIncome`, `paymentFrequency`, `spendingCategories`
- `targetSavingsRate`, `emergencyFundGoal`, `annualSavingsGoal`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/budget/settings` | Get user budget settings | Yes |
| PUT | `/api/budget/settings` | Update budget settings | Yes |

---

## Key Files

**Frontend:** `app/onboarding/BudgetOnboarding.jsx`, `app/(tabs)/profile/edit-budget.jsx`  
**Backend:** `routes/budgetRoutes.js`, `models/User.js` (budget fields)
