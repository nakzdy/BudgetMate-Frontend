# Financial Goals

## Overview
Set, track, and achieve financial goals including emergency funds and savings targets.

---

## Features

**1. Create Goals**
- Goal name, target amount, target date, category
- Initial amount (optional)
- Endpoint: `POST /api/goals`

**2. Track Progress**
- Current amount vs. target, percentage completion
- Visual progress bars, estimated completion date
- Endpoint: `GET /api/goals`

**3. Update Goals**
- Add to current amount, modify target, change date
- Endpoint: `PUT /api/goals/:id`

**4. Delete Goals**
- Remove completed/cancelled goals
- Endpoint: `DELETE /api/goals/:id`

**5. Emergency Fund (Special Feature)**
- Dedicated screen with detailed tracking
- Monthly average savings, estimated months to goal
- Motivational messages, savings transaction history
- Quick add to savings button

---

## Data Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  name: String (required),
  targetAmount: Number (required),
  currentAmount: Number (default: 0),
  category: String (default: "General"),
  targetDate: Date,
  createdAt: Date
}
```

**Model:** `backend/models/Goal.js`

---

## Validation

**Frontend:** Required fields, numeric amounts, date validation  
**Backend:** express-validator (name, targetAmount required)  
**Database:** Mongoose schema validation  

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/goals` | Get all user goals | Yes |
| POST | `/api/goals` | Create new goal | Yes |
| PUT | `/api/goals/:id` | Update goal | Yes (Owner) |
| DELETE | `/api/goals/:id` | Delete goal | Yes (Owner) |

---

## Key Files

**Frontend:** `app/(tabs)/home/index.jsx`, `app/(tabs)/profile/emergency-fund.jsx`  
**Backend:** `routes/goalRoutes.js`, `models/Goal.js`, `middleware/validationMiddleware.js`
