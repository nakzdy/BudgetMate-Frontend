# Community Forum

## Overview
Social platform for users to share financial experiences and support each other.

---

## Features

**1. View Posts**
- Scrollable discussion feed
- User avatars (DiceBear API), post categories
- Like and comment counts, timestamp display
- Endpoint: `GET /api/posts`

**2. Create Post**
- Floating Action Button (FAB) for quick access
- Title input, content textarea, category selection
- Validation checks
- Endpoint: `POST /api/posts`

**3. Like Posts**
- Toggle like/unlike, like count display
- User ID tracking (prevents duplicate likes)
- Endpoint: `POST /api/posts/:id/like`

**4. Comment on Posts**
- Add comments, view all comments
- User attribution, timestamp for each comment
- Endpoint: `POST /api/posts/:id/comment`

**5. Delete Posts**
- Owner can delete own posts
- Admin can delete any post
- Endpoint: `DELETE /api/posts/:id`

**6. Post Categories**
- Budgeting, Savings, Side Hustles, Investing, Debt, Goals, Questions
- Category filtering for focused discussions

**7. User Profiles**
- Avatar display (DiceBear), username display
- Post history

---

## Data Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  title: String (required),
  content: String (required),
  category: String (required),
  likes: [ObjectId] (refs to Users),
  comments: [{                    // Embedded subdocuments
    user: ObjectId (ref: 'User'),
    text: String (required),
    createdAt: Date
  }],
  createdAt: Date
}
```

**Model:** `backend/models/Post.js`

**Design Decision:** Comments are embedded (not separate collection) for better read performance (1 query instead of 2)

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts` | Get all posts | No |
| POST | `/api/posts` | Create post | Yes |
| POST | `/api/posts/:id/like` | Like/unlike post | Yes |
| POST | `/api/posts/:id/comment` | Add comment | Yes |
| DELETE | `/api/posts/:id` | Delete post | Yes (Owner/Admin) |

---

## Key Files

**Frontend:** `app/(tabs)/community/index.jsx`, `app/(tabs)/community/create-post.jsx`  
**Backend:** `routes/postRoutes.js`, `models/Post.js`, `middleware/authMiddleware.js`
