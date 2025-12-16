# BudgetMate Backend API 🚀

> RESTful API for BudgetMate personal finance management application

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-5.1.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-8.20.0-green)

---

## 📋 Quick Links

- [Setup](#-quick-setup) | [API Docs](#-api-endpoints) | [Security](#-security) | [Deployment](#-deployment) | [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

Node.js/Express.js RESTful API with MongoDB providing:
- JWT + Google OAuth authentication
- Budget tracking (expenses, earnings, goals)
- Educational content & job listings
- Community forum with likes/comments
- Admin content management

**Architecture:** Routes handle both routing and business logic (simplified MVC) with Mongoose models and middleware for auth/validation.

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Core** | Node.js v18+, Express.js v5.1.0, MongoDB v7.0+, Mongoose v8.20.0 |
| **Auth** | JWT v9.0.2, bcrypt v6.0.0, Google OAuth v10.5.0 |
| **Utils** | CORS, dotenv, express-validator, axios |
| **Dev** | nodemon |

---

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/budgetmate
JWT_SECRET=your_64_character_random_string_here
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
CORS_ORIGIN=*
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Seed Database (Optional)
```bash
node seedCategoriesToRender.js
node seedArticlesToRender.js
node seedJobsToRender.js
node createAdminOnRender.js  # Creates admin@budgetmate.com / Admin123!
```

### 5. Run Server
```bash
npm run dev  # Development (auto-restart)
npm start    # Production
```

**Test:** Visit `http://localhost:5000` → Should see "API is running"

---

## 📡 API Endpoints

### Authentication
```http
POST   /api/auth/signup              # Register user
POST   /api/auth/login               # Email/username login
POST   /api/auth/google              # Google OAuth login
GET    /api/auth/me                  # Get current user (protected)
PUT    /api/auth/update-profile      # Update profile (protected)
PUT    /api/auth/change-password     # Change password (protected)
```

### Budget Management
```http
GET    /api/expenses                 # Get user expenses (protected)
POST   /api/expenses                 # Add expense (protected)
PUT    /api/expenses/:id             # Update expense (protected)
DELETE /api/expenses/:id             # Delete expense (protected)

GET    /api/earnings                 # Get user earnings (protected)
POST   /api/earnings                 # Add earning (protected)
PUT    /api/earnings/:id             # Update earning (protected)
DELETE /api/earnings/:id             # Delete earning (protected)

GET    /api/goals                    # Get user goals (protected)
POST   /api/goals                    # Create goal (protected)
PUT    /api/goals/:id                # Update goal (protected)
DELETE /api/goals/:id                # Delete goal (protected)

GET    /api/budget/settings          # Get budget settings (protected)
PUT    /api/budget/settings          # Update budget settings (protected)
```

### Content (Public Read, Admin Write)
```http
GET    /api/articles                 # Get all articles
POST   /api/articles                 # Create article (admin)
PUT    /api/articles/:id             # Update article (admin)
DELETE /api/articles/:id             # Delete article (admin)

GET    /api/jobs                     # Get jobs (?category=Virtual Assistant)
POST   /api/jobs                     # Create job (admin)
PUT    /api/jobs/:id                 # Update job (admin)
DELETE /api/jobs/:id                 # Delete job (admin)

GET    /api/categories               # Get all categories
POST   /api/categories               # Create category (admin)
DELETE /api/categories/:id           # Delete category (admin)
```

### Community
```http
GET    /api/posts                    # Get all posts
POST   /api/posts                    # Create post (protected)
POST   /api/posts/:id/like           # Like/unlike post (protected)
POST   /api/posts/:id/comment        # Add comment (protected)
DELETE /api/posts/:id                # Delete post (owner/admin)
```

### Example Request
```bash
# Register
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Test123!"}'

# Add Expense (with token)
curl -X POST http://localhost:5000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount":500,"category":"Food","description":"Groceries"}'
```

---

## 🔒 Security

### Authentication
- **JWT Tokens:** Stateless auth, 7-day expiration
- **Password Hashing:** bcrypt with 10 salt rounds
- **Google OAuth:** Social login integration

### Authorization
- **Protected Routes:** JWT verification via `authMiddleware`
- **Admin Routes:** Role check via `adminMiddleware`
- **Resource Ownership:** User ID verification before update/delete

### Validation
- **Express Validator:** Input validation on all POST/PUT routes
- **Mongoose Schemas:** Type validation, required fields, enums
- **Email Validation:** Regex pattern matching
- **CORS:** Configured for cross-origin requests

**Example Middleware:**
```javascript
// authMiddleware.js - Verifies JWT and attaches user to req.user
// adminMiddleware.js - Checks if user.role === 'admin'
// validationMiddleware.js - Validates request body fields
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── models/                      # Mongoose schemas (8 models)
│   ├── User.js                  # Auth + budget settings
│   ├── Expense.js, Earning.js, Goal.js
│   ├── Article.js, Job.js, Post.js, Category.js
├── routes/                      # API endpoints (9 route files)
│   ├── authRoutes.js            # Authentication
│   ├── expenseRoutes.js, earningRoutes.js, goalRoutes.js
│   ├── budgetRoutes.js, articleRoutes.js, jobRoutes.js
│   ├── postRoutes.js, categoryRoutes.js
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── adminMiddleware.js       # Admin role check
│   └── validationMiddleware.js  # Input validation
├── seed*.js                     # Database seeding scripts
├── .env                         # Environment variables
├── package.json
└── server.js                    # Entry point
```

**Note:** Routes contain both routing and business logic (simplified architecture, no separate controllers).

---

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster (free M0 tier)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (development) or specific IPs (production)
5. Get connection string → Update `MONGODB_URI` in `.env`

### Render.com Deployment
1. Sign up at https://render.com
2. New Web Service → Connect GitHub repo
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all from `.env`
4. Deploy → Get URL: `https://your-app.onrender.com`

### Post-Deployment
```bash
# Seed production database
node seedCategoriesToRender.js
node seedArticlesToRender.js
node createAdminOnRender.js
```

---

## 🔧 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh

# Verify MONGODB_URI in .env
# For Atlas: Check network access whitelist and credentials
```

### Port Already in Use
```bash
# Change PORT in .env or kill process
npx kill-port 5000
```

### JWT Secret Not Set
```bash
# Generate and add to .env
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### CORS Errors
```javascript
// Ensure CORS is enabled in server.js
app.use(cors());
```

### Network Request Failed (from mobile)
- Use local IP (not `localhost`) for mobile testing
- Ensure phone and computer on same WiFi
- Check firewall settings

---

## 💡 Key Design Decisions

### 1. MongoDB (NoSQL)
**Why:** Flexible schema for varying user settings, document model fits financial records, embedded comments reduce joins.

### 2. JWT Authentication
**Why:** Stateless (no session store), mobile-friendly, horizontally scalable.

### 3. Embedded Comments in Posts
**Why:** 1 query instead of 2 for better read performance (critical for mobile).

### 4. Category-Based Expenses
**Why:** Prevents duplicates, enables consistent analytics, cleaner UI.

### 5. Simplified Architecture (Routes = Controllers)
**Why:** For this project's scope, combining routing and logic keeps codebase simple and maintainable.

---

## 📚 Additional Documentation

- **Database Schema:** See [Data_Collections_and_Model_Design.md](../Data_Collections_and_Model_Design.md)
- **Root README:** See [../README.md](../README.md)
- **Criteria Documentation:** See [../BudgetMate_Criteria_Documentation.md](../BudgetMate_Criteria_Documentation.md)

---

## 🧪 Testing

### Manual Testing with cURL
```bash
# Health check
curl http://localhost:5000

# Register
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123!"}'

# Login (save token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get expenses (use token)
curl http://localhost:5000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Postman Collection
1. Create collection in Postman
2. Set environment variable: `base_url = http://localhost:5000/api`
3. Test authentication → Save token
4. Test protected endpoints with token

---

## 📊 Database Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **users** | Authentication & settings | email, password, role, monthlyIncome |
| **expenses** | Spending records | user, amount, category, date |
| **earnings** | Income records | user, amount, source, date |
| **goals** | Financial goals | user, name, targetAmount, currentAmount |
| **categories** | Spending categories | name |
| **articles** | Educational content | title, content, category, createdBy |
| **jobs** | Job opportunities | title, payRange, difficulty, category |
| **posts** | Community discussions | user, title, content, likes, comments |

**Relationships:** Users → (1:Many) → Expenses, Earnings, Goals, Posts, Articles, Jobs

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add feature"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) file

---

<div align="center">

**Built with ❤️ for BudgetMate**

[⬆ Back to Top](#budgetmate-backend-api-)

</div>
