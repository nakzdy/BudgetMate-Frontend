# BudgetMate - Technical Documentation

**Complete technical reference for the BudgetMate personal finance management application.**

---

## 1. System Functionalities

### Overview
BudgetMate is a React Native (Expo) mobile app with Node.js/Express backend and MongoDB database, targeting Gen Z users (18-30) for personal finance management.

### Implemented Features (8+)

| Feature | Description | Backend | Frontend |
|---------|-------------|---------|----------|
| **Authentication** | Email/password + Google OAuth, JWT tokens, bcrypt hashing | `authRoutes.js` | `app/auth/` |
| **Expense Tracking** | Add/edit/delete expenses, category-based, visual analytics | `expenseRoutes.js` | `app/(tabs)/home/` |
| **Income Tracking** | Track earnings from side hustles | `earningRoutes.js` | `app/(tabs)/home/` |
| **Financial Goals** | Set savings goals, track progress, emergency fund | `goalRoutes.js` | `app/(tabs)/home/`, `profile/emergency-fund.jsx` |
| **Educational Content** | Financial literacy articles (admin-managed) | `articleRoutes.js` | `app/(tabs)/learn/` |
| **Job Opportunities** | Side-hustle listings with filtering | `jobRoutes.js` | `app/(tabs)/earn/` |
| **Community Forum** | Posts, likes, comments, peer support | `postRoutes.js` | `app/(tabs)/community/` |
| **Admin Panel** | Content management for articles/jobs/categories | `adminMiddleware.js` | `app/(tabs)/profile/admin-panel.jsx` |

**Key Endpoints:**
- **Auth:** `/api/auth/*` - signup, login, profile, password change
- **Expenses:** `/api/expenses/*` - CRUD operations
- **Earnings:** `/api/earnings/*` - CRUD operations
- **Goals:** `/api/goals/*` - CRUD operations
- **Articles:** `/api/articles/*` - CRUD (admin only)
- **Jobs:** `/api/jobs/*` - CRUD (admin only)
- **Posts:** `/api/posts/*` - CRUD, like, comment
- **Budget:** `/api/budget/settings` - GET/PUT budget configuration

---

## 2. CRUD Operations

All CRUD operations are fully implemented with proper authorization.

### Expenses CRUD Example

**Create:**
```javascript
POST /api/expenses
Body: { amount, category, description, date }
Auth: Required (JWT token)
```

**Read:**
```javascript
GET /api/expenses
Returns: All user's expenses sorted by date (newest first)
Auth: Required
```

**Update:**
```javascript
PUT /api/expenses/:id
Body: { amount, category, description, date }
Auth: Required + ownership check
```

**Delete:**
```javascript
DELETE /api/expenses/:id
Auth: Required + ownership check
```

### CRUD Summary

| Resource | Create | Read | Update | Delete | Authorization |
|----------|--------|------|--------|--------|---------------|
| Expenses | ✅ | ✅ | ✅ | ✅ | User ownership |
| Earnings | ✅ | ✅ | ✅ | ✅ | User ownership |
| Goals | ✅ | ✅ | ✅ | ✅ | User ownership |
| Articles | ✅ | ✅ | ✅ | ✅ | Admin only (C/U/D) |
| Jobs | ✅ | ✅ | ✅ | ✅ | Admin only (C/U/D) |
| Posts | ✅ | ✅ | ✅* | ✅ | User ownership |
| Categories | ✅ | ✅ | N/A | ✅ | Admin only |
| Users | ✅ | ✅ | ✅ | N/A | Self only |

*Posts update via like/comment operations

---

## 3. Data Collections & Model Design

**Database:** MongoDB with Mongoose ODM  
**Collections:** 8

For detailed schemas with inline comments, see: [Database-Schema.md](./Database-Schema.md)

### Collections Summary

1. **Users** - Authentication, profiles, budget settings
2. **Expenses** - Spending transactions (user reference)
3. **Earnings** - Income records (user reference)
4. **Goals** - Financial goals tracking (user reference)
5. **Categories** - Spending categories (unique names)
6. **Articles** - Educational content (admin-created)
7. **Jobs** - Job opportunities (admin-created)
8. **Posts** - Community discussions (embedded comments)

### Relationships

```
Users (1) ──→ (Many) Expenses, Earnings, Goals, Posts
Users (1) ──→ (Many) Articles, Jobs (admin only)
Users (Many) ←→ (Many) Posts (via likes array)
Posts (1) ──→ (Many) Comments (embedded)
```

### Design Decisions

**Why MongoDB?**
- Flexible schema for varying budget settings
- Document model fits expense/earning records
- Embedded documents (comments) reduce joins
- JSON-native with Node.js and React Native

**Embedded vs Referenced:**
- **Embedded:** Comments in Posts (always retrieved together, 1 query)
- **Referenced:** User in Expenses (data changes independently, no duplication)

---

## 4. Security & Validation

### Authentication

**JWT Tokens:**
```javascript
// Token creation (7-day expiration)
jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Token verification (authMiddleware.js)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select("-password");
```

**Password Security:**
```javascript
// Hashing on signup (10 salt rounds)
const hash = await bcrypt.hash(password, 10);

// Comparison on login
const isMatch = await bcrypt.compare(password, user.password);
```

### Validation

**Express-Validator Middleware:**
- `validateSignup` - Email format, password length (6+), username required
- `validateExpense` - Amount numeric, category required, date format
- `validateBudget` - All numeric fields, array type checking
- `validateGoal` - Title required, amounts numeric, date format
- `validateEarning` - Amount numeric, source required
- `validatePost` - Content required

**Manual Validation:**
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password length: minimum 6 characters
- Password confirmation matching

### Access Control

**Auth Middleware:**
```javascript
// Protects routes requiring authentication
router.get("/", authMiddleware, async (req, res) => {...})
```

**Admin Middleware:**
```javascript
// Checks user role for admin-only operations
if (!req.user || req.user.role !== 'admin') {
  return res.status(403).json({ message: "Access denied" });
}
```

**Resource Ownership:**
```javascript
// Verifies user owns the resource before modification
if (expense.user.toString() !== req.user.id) {
  return res.status(401).json({ msg: "Not authorized" });
}
```

**Protected Routes:**
- All expense/earning/goal operations (user ownership)
- Article/job create/update/delete (admin only)
- Post delete (owner or admin)
- Profile updates (self only)

---

## 5. Documentation & Presentation

### Documentation Files

**Main Documentation:**
1. **Documentation.md** (this file) - Complete technical reference
2. **Database-Schema.md** - All 8 schemas with inline comments
3. **app-features-summary.md** - Features overview by tab
4. **mobile-app-documentation.md** - Mobile app implementation

**Feature Documentation:**
- 9 feature-specific guides in `features/` folder
- Each covers functionality, logic, data models, API endpoints

### Setup Instructions

**Backend:**
1. `cd backend && npm install`
2. Create `.env` with MongoDB URI, JWT secret, Google OAuth
3. `npm run seed` (optional - sample data)
4. `npm run dev` (development) or `npm start` (production)

**Mobile:**
1. `cd mobile && npm install`
2. Create `.env` with API URLs
3. `npm start` (Expo Go) or `eas build` (APK)

**Full deployment guide:** See [../README.md](../../README.md)

### Design Decisions Explained

**MongoDB Choice:**
- Flexible schema for user budget settings
- Better performance for read-heavy operations
- Easier horizontal scaling

**JWT Authentication:**
- Stateless (no server-side sessions)
- 7-day expiration for security
- Bearer token in Authorization header

**Embedded Comments:**
- Comments always retrieved with posts
- 1 database query instead of 2
- Better read performance for community feed

**Category System:**
- Prevents duplicate categories ("Food" vs "food")
- Enables consistent analytics
- Admin-controlled for data quality

---

## Quick Reference

### File Locations

**Backend:**
- Models: `backend/models/*.js` (8 Mongoose schemas)
- Routes: `backend/routes/*.js` (9 route files)
- Middleware: `backend/middleware/*.js` (auth, admin, validation)

**Mobile:**
- Auth screens: `mobile/app/auth/*.jsx`
- Tab screens: `mobile/app/(tabs)/*/*.jsx`
- Components: `mobile/src/components/*.jsx`

### API Endpoints (40+)

**Authentication:** 7 endpoints  
**Expenses:** 4 endpoints (CRUD)  
**Earnings:** 4 endpoints (CRUD)  
**Goals:** 4 endpoints (CRUD)  
**Articles:** 4 endpoints (CRUD, admin)  
**Jobs:** 4 endpoints (CRUD, admin)  
**Posts:** 5 endpoints (CRUD, like, comment)  
**Budget:** 2 endpoints (GET, PUT)  
**Categories:** 3 endpoints (GET, POST, DELETE)

### Technology Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
**Mobile:** React Native, Expo, Expo Router, AsyncStorage, Axios  
**Validation:** express-validator  
**Authentication:** JWT + Google OAuth 2.0

---

**Last Updated:** December 17, 2025 | **Version:** 1.0
