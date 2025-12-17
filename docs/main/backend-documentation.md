# BudgetMate Backend Documentation

**Node.js + Express.js + MongoDB RESTful API**

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js v18+ |
| Framework | Express.js v5.1.0 |
| Database | MongoDB v7.0+ |
| ODM | Mongoose v8.20.0 |
| Auth | JWT v9.0.2 + bcrypt v6.0.0 |
| Validation | express-validator |

---

## 📁 Project Structure

```
backend/
├── models/          # 8 Mongoose schemas
├── routes/          # 9 API route files (40+ endpoints)
├── middleware/      # Auth, admin, validation
├── .env            # Environment variables
└── server.js       # Entry point
```

---

## 🗄️ MongoDB Database

### Collections (8)

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **users** | Auth & budget settings | email, password (hashed), role, budget fields |
| **expenses** | Spending records | user (ref), amount, category, date |
| **earnings** | Income records | user (ref), amount, source, date |
| **goals** | Financial goals | user (ref), targetAmount, currentAmount |
| **categories** | Spending categories | name (unique) |
| **articles** | Educational content | title, description, createdBy (admin) |
| **jobs** | Job opportunities | title, difficulty, payRange, createdBy (admin) |
| **posts** | Community forum | user (ref), title, likes[], comments[] (embedded) |

### Why MongoDB?

✅ Flexible schema for user budget settings  
✅ Document model fits expense/earning records  
✅ Embedded documents (comments in posts) = 1 query vs 2  
✅ JSON-native with Node.js and React Native  

### Schema Patterns

**References (ObjectId):**
```javascript
// Expense references User
{
  user: ObjectId (ref: 'User'),  // Link to users collection
  amount: Number,
  category: String
}
```

**Embedded Documents:**
```javascript
// Comments embedded in Post
{
  user: ObjectId,
  comments: [{              // Embedded array
    user: ObjectId,
    text: String,
    createdAt: Date
  }]
}
```

---

## 🔐 Authentication & Security

### JWT Authentication

**Token Generation (7-day expiration):**
```javascript
jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
```

**Token Verification (authMiddleware.js):**
```javascript
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select("-password");
```

### Password Security

**Bcrypt (10 rounds):**
```javascript
// Hash on signup
const hash = await bcrypt.hash(password, 10);

// Compare on login
const isMatch = await bcrypt.compare(password, user.password);
```

### Access Control

**Auth Middleware:** Protects all user-owned resources  
**Admin Middleware:** Protects article/job/category management  
**Resource Ownership:** Users can only modify their own data  

---

## 📡 API Endpoints (40+)

### Authentication (6 endpoints)
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login (email or username)
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### CRUD Resources

**Expenses (4):** GET, POST, PUT, DELETE `/api/expenses`  
**Earnings (4):** GET, POST, PUT, DELETE `/api/earnings`  
**Goals (4):** GET, POST, PUT, DELETE `/api/goals`  
**Articles (4, admin):** GET, POST, PUT, DELETE `/api/articles`  
**Jobs (5, admin):** GET (with filters), POST, PUT, DELETE `/api/jobs`  
**Posts (5):** GET, POST, POST like, POST comment, DELETE `/api/posts`  
**Budget (2):** GET, PUT `/api/budget/settings`  
**Categories (3, admin):** GET, POST, DELETE `/api/categories`  

---

## ✅ Input Validation

**3-Layer Validation:**
1. **Frontend** - Immediate user feedback
2. **Backend** - express-validator middleware
3. **Database** - Mongoose schema validation

**Example (validateExpense):**
```javascript
check('amount').isNumeric(),
check('category').notEmpty(),
check('date').optional().isISO8601()
```

---

## 🚀 Setup & Deployment

### Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/budgetmate
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
CORS_ORIGIN=*
```

### Running

```bash
# Install dependencies
npm install

# Development (with nodemon)
npm run dev

# Production
npm start

# Seed database
npm run seed
```

### MongoDB Setup

**Local:** Install MongoDB, run `mongod`  
**Cloud:** MongoDB Atlas - Get connection string, add to `.env`

---

## 📊 Common Operations

**Find with population:**
```javascript
await Expense.find({ user: userId })
  .populate('user', 'name email')
  .sort({ date: -1 });
```

**Aggregation:**
```javascript
await Expense.aggregate([
  { $match: { user: ObjectId(userId) } },
  { $group: { _id: '$category', total: { $sum: '$amount' } } }
]);
```

---

## 🔗 Related Docs

- [Database-Schema.md](./Database-Schema.md) - Detailed schemas with inline comments
- [Documentation.md](./Documentation.md) - Complete technical reference

---

**Last Updated:** December 17, 2025
