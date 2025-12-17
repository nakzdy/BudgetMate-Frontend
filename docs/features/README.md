# BudgetMate Features Documentation

Individual documentation for each major feature in the BudgetMate application.

---

## 📑 Feature Documents

| # | Feature | Description | Endpoints | Key Files |
|---|---------|-------------|-----------|-----------|
| [01](./01-authentication.md) | **Authentication** | JWT tokens, bcrypt hashing, session management | 6 | `authRoutes.js`, `authMiddleware.js` |
| [02](./02-expense-tracking.md) | **Expense Tracking** | Add/view/edit/delete expenses, analytics | 4 | `expenseRoutes.js`, `Expense.js` |
| [03](./03-income-tracking.md) | **Income Tracking** | Track earnings from side hustles | 4 | `earningRoutes.js`, `Earning.js` |
| [04](./04-financial-goals.md) | **Financial Goals** | Set and track savings goals, emergency fund | 4 | `goalRoutes.js`, `Goal.js` |
| [05](./05-job-opportunities.md) | **Job Opportunities** | Browse side-hustle listings, difficulty filtering | 5 | `jobRoutes.js`, `Job.js` |
| [06](./06-financial-education.md) | **Financial Education** | Curated articles, category filtering | 4 | `articleRoutes.js`, `Article.js` |
| [07](./07-community-forum.md) | **Community Forum** | Posts, likes, comments, peer support | 5 | `postRoutes.js`, `Post.js` |
| [08](./08-budget-configuration.md) | **Budget Configuration** | Onboarding, income/savings setup | 2 | `budgetRoutes.js`, `edit-budget.jsx` |
| [09](./09-admin-panel.md) | **Admin Panel** | Manage articles, jobs, categories | 9 | `adminMiddleware.js`, `admin-panel.jsx` |

**Total:** 9 features | 43 API endpoints

---

## 🔍 Quick Reference

### By Tab Location

**Home:** Expense Tracking, Financial Goals, Budget Configuration  
**Learn:** Financial Education  
**Earn:** Income Tracking, Job Opportunities  
**Community:** Community Forum  
**Profile:** Authentication, Budget Configuration, Admin Panel

### By Complexity

**Simple:** Income Tracking, Financial Education  
**Medium:** Expense Tracking, Financial Goals, Budget Configuration  
**Complex:** Authentication, Job Opportunities, Community Forum, Admin Panel

### By User Access

**All Users:** Features 01-08  
**Admin Only:** Feature 09 (Admin Panel)

---

## 📊 Feature Statistics

| Feature | CRUD | Frontend Files | Backend Files |
|---------|------|----------------|---------------|
| Authentication | C, R, U | 3 | 2 |
| Expense Tracking | Full | 3 | 2 |
| Income Tracking | Full | 1 | 2 |
| Financial Goals | Full | 2 | 2 |
| Job Opportunities | Full (Admin) | 2 | 2 |
| Financial Education | Full (Admin) | 2 | 2 |
| Community Forum | C, R, D | 2 | 2 |
| Budget Configuration | R, U | 3 | 2 |
| Admin Panel | Full | 1 | 4 |

---

## 🎯 Common Patterns

**CRUD Operations:**
- Create: POST with validation
- Read: GET with filtering
- Update: PUT with authorization
- Delete: DELETE with confirmation

**Authorization:**
- User-owned: Owner or admin can modify
- Admin-only: Admin middleware protection
- Public: No auth required for reading

**Validation:**
- Frontend: Immediate feedback
- Backend: express-validator
- Database: Mongoose schema

**Data Flow:**
```
User Action → Frontend Validation → API Request (JWT) → 
Backend Auth → Backend Validation → Database → Response → UI Update
```

## 🔗 Related Documentation

- [../main/app-features-summary.md](../main/app-features-summary.md) - Features overview
- [../main/Documentation.md](../main/Documentation.md) - Technical documentation
- [../main/Database-Schema.md](../main/Database-Schema.md) - Database schemas
- [../main/mobile-app-documentation.md](../main/mobile-app-documentation.md) - Mobile app guide

---

**Last Updated:** December 17, 2025 | **Total Features:** 9
