# Admin Panel

## Overview
Content management system for administrators to manage articles, jobs, and categories.

---

## Access Control

**Role-Based Access:**
- Admin role required (`user.role === 'admin'`)
- Protected by `adminMiddleware.js`
- Visible only to admin users in Profile tab

**Middleware Check:**
```javascript
if (!req.user || req.user.role !== 'admin') {
  return res.status(403).json({ message: "Access denied" });
}
```

---

## Features

### 1. Article Management

**Create Articles:**
- Title, description, content editor
- External URL, icon selection, color customization
- Category assignment, publish/unpublish toggle
- Endpoint: `POST /api/articles`

**Edit Articles:**
- Update all fields, change publication status
- Modify categories
- Endpoint: `PUT /api/articles/:id`

**Delete Articles:**
- Permanent deletion, confirmation required
- Endpoint: `DELETE /api/articles/:id`

---

### 2. Job Management

**Create Jobs:**
- Title, description, difficulty level (Easy/Medium/Hard)
- Pay range, time commitment, tags
- Full description, requirements list, "How to Start" guide
- Source (internal/OnlineJobs.ph), category, external URL
- Endpoint: `POST /api/jobs`

**Edit Jobs:**
- Update all fields, change categories/difficulty
- Endpoint: `PUT /api/jobs/:id`

**Delete Jobs:**
- Remove job listings, confirmation dialog
- Endpoint: `DELETE /api/jobs/:id`

---

### 3. Category Management

**Add Categories:**
- Create new spending categories
- Unique name validation
- Endpoint: `POST /api/categories`

**View Categories:**
- List all categories, usage statistics
- Endpoint: `GET /api/categories`

**Delete Categories:**
- Remove unused categories, validation checks
- Endpoint: `DELETE /api/categories/:id`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/articles` | Create article | Admin |
| PUT | `/api/articles/:id` | Update article | Admin |
| DELETE | `/api/articles/:id` | Delete article | Admin |
| POST | `/api/jobs` | Create job | Admin |
| PUT | `/api/jobs/:id` | Update job | Admin |
| DELETE | `/api/jobs/:id` | Delete job | Admin |
| GET | `/api/categories` | Get categories | No |
| POST | `/api/categories` | Create category | Admin |
| DELETE | `/api/categories/:id` | Delete category | Admin |

**Total:** 9 admin-protected endpoints

---

## Key Files

**Frontend:** `app/(tabs)/profile/admin-panel.jsx`  
**Backend:** `middleware/adminMiddleware.js`, `routes/articleRoutes.js`, `routes/jobRoutes.js`, `routes/categoryRoutes.js`
