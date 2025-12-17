# Authentication & User Management

## Overview
Secure user authentication with JWT tokens and bcrypt password hashing.

---

## Features

**1. User Registration**
- Email/password signup, username creation, avatar seed generation
- Validation: Email uniqueness, password strength
- Endpoint: `POST /api/auth/signup`

**2. User Login**
- Login with email OR username, JWT token (7-day expiration)
- Google OAuth integration
- Endpoint: `POST /api/auth/login`

**3. Password Security**
- Bcrypt hashing (10 rounds), no plain-text storage
- Change password feature
- Endpoint: `PUT /api/auth/change-password`

**4. Session Management**
- JWT-based stateless auth, Bearer token in header
- Auto token verification, logout clears storage
- Middleware: `authMiddleware.js`

**5. Profile Management**
- Update name/email, change avatar seed
- Endpoint: `PUT /api/auth/update-profile`

---

## Data Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, required),
  password: String (hashed),
  avatarSeed: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

**Model:** `backend/models/User.js`

---

## Security Features

✅ JWT Authentication - Stateless tokens  
✅ Bcrypt Hashing - 10 rounds  
✅ Token Expiration - 7 days  
✅ Role-Based Access - User/Admin  
✅ Input Validation - Frontend + backend  

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update-profile` | Update profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/admin/create` | Create admin | Yes (Admin) |

---

## Key Files

**Frontend:** `app/auth/Login.jsx`, `app/auth/Signup.jsx`, `app/(tabs)/profile/personal-info.jsx`  
**Backend:** `routes/authRoutes.js`, `middleware/authMiddleware.js`, `models/User.js`
