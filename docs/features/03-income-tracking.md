# Income Tracking (Earnings)

## Overview
Track additional income from side hustles, freelance work, and other earning sources.

---

## Features

**1. Add Earnings**
- Amount input, source field, date selection, description
- Validation: Required fields, numeric amount
- Endpoint: `POST /api/earnings`

**2. View Earnings**
- Earnings history sorted by date
- Source categorization, total earnings calculation
- Endpoint: `GET /api/earnings`

**3. Edit/Delete Earnings**
- Update earning records, delete entries, recalculate totals
- Endpoints: `PUT /api/earnings/:id`, `DELETE /api/earnings/:id`

**4. Visual Analytics**
- Monthly earnings chart (bar chart)
- Source breakdown, trend analysis
- React Native Chart Kit

**5. Data Isolation**
- Earnings stored per-user (`earnings_${userId}`)
- Privacy protection for shared devices

---

## Data Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  amount: Number (required),
  source: String (required),
  description: String,
  date: Date (default: Date.now),
  createdAt: Date
}
```

**Model:** `backend/models/Earning.js`

---

## Validation

**Frontend:** Required fields, numeric amount  
**Backend:** express-validator (amount, source required)  
**Database:** Mongoose schema validation  

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/earnings` | Get all user earnings | Yes |
| POST | `/api/earnings` | Add new earning | Yes |
| PUT | `/api/earnings/:id` | Update earning | Yes (Owner) |
| DELETE | `/api/earnings/:id` | Delete earning | Yes (Owner) |

---

## Key Files

**Frontend:** `app/(tabs)/earn/index.jsx`  
**Backend:** `routes/earningRoutes.js`, `models/Earning.js`, `middleware/validationMiddleware.js`
