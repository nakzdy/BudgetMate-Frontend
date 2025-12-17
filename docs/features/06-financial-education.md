# Financial Education (Learn Tab)

## Overview
Curated financial literacy articles and resources to improve money management skills.

---

## Features

**1. Browse Articles**
- Resource library with curated content
- Category-based organization (Budgeting, Saving, Investing, Debt, etc.)
- Search functionality
- Endpoint: `GET /api/articles`

**2. Article Categories**
- Budgeting Basics (50/30/20 Rule, expense tracking)
- Emergency Funds (why, how much, where to keep)
- Investing (basics, risk, long-term wealth)
- Debt Management (repayment strategies, credit score)
- Smart Shopping (saving money, avoiding impulse buying)

**3. Article Display**
- Title, description, content preview
- External resource links
- Icon and color customization
- Category filtering

**4. Search Articles**
- Search by title or description
- Category filtering
- Real-time results

**5. Admin Article Management**
- Create/edit/delete articles (admin only)
- Publish/unpublish control
- Endpoints: `POST /api/articles`, `PUT /api/articles/:id`, `DELETE /api/articles/:id`

---

## Data Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  content: String,
  url: String,
  iconName: String (default: 'article'),
  color: String (default: '#6C63FF'),
  category: String (default: 'general'),
  isPublished: Boolean (default: true),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

**Model:** `backend/models/Article.js`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/articles` | Get all published articles | No |
| POST | `/api/articles` | Create article | Yes (Admin) |
| PUT | `/api/articles/:id` | Update article | Yes (Admin) |
| DELETE | `/api/articles/:id` | Delete article | Yes (Admin) |

---

## Key Files

**Frontend:** `app/(tabs)/learn/index.jsx`, `app/(tabs)/profile/admin-panel.jsx`  
**Backend:** `routes/articleRoutes.js`, `models/Article.js`, `middleware/adminMiddleware.js`
