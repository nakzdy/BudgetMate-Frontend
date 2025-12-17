# Expense Tracking

## Overview
Complete expense management system for tracking spending, categorizing transactions, and monitoring budget usage.

---

## Features

**1. Add Expense**
- Amount input (numeric), category selection, date picker, description
- Validation: Required fields, numeric amount
- Endpoint: `POST /api/expenses`

**2. View Expenses**
- Full history sorted by date (newest first)
- Category filtering, date range filtering, search
- Endpoint: `GET /api/expenses`

**3. Edit Expense**
- Update amount, category, date, description
- Authorization: Owner or admin only
- Endpoint: `PUT /api/expenses/:id`

**4. Delete Expense**
- Confirmation dialog, permanent deletion, budget recalculation
- Authorization: Owner or admin only
- Endpoint: `DELETE /api/expenses/:id`

**5. Budget Calculations**
- Available balance, total spent, spend percentage, remaining budget

---

## Data Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  amount: Number (required),
  category: String (required),
  description: String,
  date: Date (default: Date.now),
  createdAt: Date
}
```

**Model:** `backend/models/Expense.js`

---

## Validation

**Frontend:** Immediate feedback, required fields  
**Backend:** express-validator (amount numeric, category required)  
**Database:** Mongoose schema validation  

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/expenses` | Get all user expenses | Yes |
| POST | `/api/expenses` | Add new expense | Yes |
| PUT | `/api/expenses/:id` | Update expense | Yes (Owner) |
| DELETE | `/api/expenses/:id` | Delete expense | Yes (Owner) |

---

## Key Files

**Frontend:** `app/(tabs)/home/add-expense.jsx`, `app/(tabs)/home/expense-history.jsx`  
**Backend:** `routes/expenseRoutes.js`, `models/Expense.js`, `middleware/validationMiddleware.js`
