# Job Opportunities (Earn Tab)

## Overview
Browse and discover side-hustle opportunities, freelance gigs, and part-time jobs.

---

## Features

**1. Browse Job Listings**
- Horizontal scrollable job cards
- Category-based filtering, difficulty level indicators
- Pay range transparency, time commitment estimates
- Endpoint: `GET /api/jobs`

**2. Job Categories**
- Virtual Assistant, Freelance/Remote, Part-time, Other gigs
- Filter by category: `GET /api/jobs?category=Virtual Assistant`

**3. Job Details Modal**
- Full description, requirements list, pay range
- "How to Start" guide, external application links
- OnlineJobs.ph integration

**4. Difficulty Levels**
- Easy, Medium, Hard skill level indicators
- Filter by difficulty: `GET /api/jobs?difficulty=Easy`

**5. Admin Job Management**
- Create/edit/delete job listings (admin only)
- Category assignment, publish/unpublish control
- Endpoints: `POST /api/jobs`, `PUT /api/jobs/:id`, `DELETE /api/jobs/:id`

---

## Data Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  difficulty: String (enum: ['Easy', 'Medium', 'Hard']),
  payRange: String (required),
  timeCommitment: String (required),
  tags: [String],
  fullDescription: String,
  requirements: [String],
  howToStart: String,
  source: String (enum: ['internal', 'onlinejobs.ph']),
  category: String,
  externalUrl: String,
  isPublished: Boolean (default: true),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

**Model:** `backend/models/Job.js`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jobs` | Get all published jobs | No |
| GET | `/api/jobs?category=X` | Filter by category | No |
| POST | `/api/jobs` | Create job | Yes (Admin) |
| PUT | `/api/jobs/:id` | Update job | Yes (Admin) |
| DELETE | `/api/jobs/:id` | Delete job | Yes (Admin) |

---

## Key Files

**Frontend:** `app/(tabs)/earn/index.jsx`, `app/(tabs)/profile/admin-panel.jsx`  
**Backend:** `routes/jobRoutes.js`, `models/Job.js`, `middleware/adminMiddleware.js`
