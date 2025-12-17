# BudgetMate - Database Schema

**Database:** MongoDB with Mongoose ODM  
**Collections:** 8

---

## Collections Overview

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| Users | Authentication & budget settings | email, password, role, budget settings |
| Expenses | Spending transactions | user, amount, category, date |
| Earnings | Income records | user, amount, source, date |
| Goals | Financial goals tracking | user, name, targetAmount, currentAmount |
| Categories | Spending categories | name (unique) |
| Articles | Educational content | title, description, content, createdBy (admin) |
| Jobs | Job opportunities | title, description, difficulty, category, createdBy (admin) |
| Posts | Community discussions | user, title, content, likes[], comments[] (embedded) |

---

## 1. Users Collection

**Purpose:** User accounts, authentication, and budget configuration

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  name: String,                            // User's display name
  email: String,                           // Required, unique - used for login
  password: String,                        // Hashed with bcrypt (10 rounds) - null for Google OAuth users
  googleId: String,                        // Google OAuth identifier - for social login
  avatarSeed: String,                      // Seed for DiceBear avatar generation - ensures consistent avatars
  role: String,                            // 'user' or 'admin' - controls access permissions (default: 'user')
  
  // Budget Settings - User's financial configuration
  monthlyIncome: Number,                   // User's monthly income - used for budget calculations
  paymentFrequency: String,                // How often user gets paid (e.g., 'weekly', 'monthly')
  spendingCategories: [String],            // Selected expense categories user wants to track
  targetSavingsRate: Number,               // Percentage of income to save (e.g., 20 = 20%)
  emergencyFundGoal: Number,               // Target amount for emergency fund
  annualSavingsGoal: Number,               // Yearly savings target
  
  createdAt: Date,                         // Account creation timestamp
  updatedAt: Date                          // Last profile update timestamp
}
```

**Relationships:** One-to-Many with Expenses, Earnings, Goals, Posts

---

## 2. Expenses Collection

**Purpose:** Track user spending transactions

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  user: ObjectId,                          // Reference to Users collection - links expense to owner (required)
  amount: Number,                          // Expense amount in currency (required)
  category: String,                        // Expense category (e.g., 'Food', 'Transportation') (required)
  description: String,                     // Optional note about the expense (e.g., 'Lunch at cafe')
  date: Date,                              // When expense occurred (default: current date/time)
  createdAt: Date                          // When record was created in database
}
```

**Usage:** Budget tracking, expense history, category analytics

---

## 3. Earnings Collection

**Purpose:** Record income from side hustles

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  user: ObjectId,                          // Reference to Users collection - links earning to owner (required)
  amount: Number,                          // Income amount received (required)
  source: String,                          // Where income came from (e.g., 'Freelance', 'Side Hustle') (required)
  description: String,                     // Optional details about the earning
  date: Date,                              // When income was received (default: current date/time)
  createdAt: Date                          // When record was created in database
}
```

**Usage:** Income tracking, financial overview

---

## 4. Goals Collection

**Purpose:** Manage financial goals and track progress

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  user: ObjectId,                          // Reference to Users collection - links goal to owner (required)
  name: String,                            // Goal name (e.g., 'Emergency Fund', 'Vacation') (required)
  targetAmount: Number,                    // How much money to save (required)
  currentAmount: Number,                   // How much saved so far (default: 0)
  category: String,                        // Goal type (e.g., 'Emergency Fund', 'Vacation') (default: 'General')
  targetDate: Date,                        // Optional deadline to reach goal
  createdAt: Date                          // When goal was created
}
```

**Usage:** Savings goals, emergency fund, progress monitoring

---

## 5. Categories Collection

**Purpose:** Predefined spending categories

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  name: String,                            // Category name (e.g., 'Food', 'Transportation') - must be unique (required)
  createdAt: Date                          // When category was created
}
```

**Usage:** Expense categorization, budget configuration

**Examples:** Food, Transportation, Entertainment, Bills, Savings, Shopping, Healthcare, Education

---

## 6. Articles Collection

**Purpose:** Financial education content (admin-managed)

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  title: String,                           // Article title (required)
  description: String,                     // Short summary/preview text (required)
  content: String,                         // Full article content (optional - can use external URL instead)
  url: String,                             // External article link (optional)
  iconName: String,                        // Icon identifier for UI (default: 'article')
  color: String,                           // Theme color for article card (default: '#6C63FF')
  category: String,                        // Article category (e.g., 'budgeting', 'investing') (default: 'general')
  isPublished: Boolean,                    // Whether article is visible to users (default: true)
  createdBy: ObjectId,                     // Reference to admin User who created it (required)
  createdAt: Date,                         // When article was created
  updatedAt: Date                          // When article was last modified
}
```

**Usage:** Learn tab content, financial literacy resources

---

## 7. Jobs Collection

**Purpose:** Job and earning opportunity listings (admin-managed)

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  title: String,                           // Job title (e.g., 'Virtual Assistant') (required)
  description: String,                     // Brief job description (required)
  difficulty: String,                      // 'Easy', 'Medium', or 'Hard' - skill level needed (default: 'Easy')
  payRange: String,                        // Compensation (e.g., '$10-15/hour') (required)
  timeCommitment: String,                  // Time required (e.g., '10-20 hours/week') (required)
  tags: [String],                          // Searchable keywords (e.g., ['remote', 'flexible'])
  fullDescription: String,                 // Detailed job description (optional)
  requirements: [String],                  // List of job requirements (e.g., ['Good English', 'Reliable internet'])
  howToStart: String,                      // Application instructions (optional)
  source: String,                          // 'internal' or 'onlinejobs.ph' - where job came from (default: 'internal')
  category: String,                        // 'Virtual Assistant', 'Freelance/Remote', 'Part-time', or 'Other'
  externalUrl: String,                     // Link to external job posting (optional)
  isPublished: Boolean,                    // Whether job is visible to users (default: true)
  createdBy: ObjectId,                     // Reference to admin User who created it (required)
  createdAt: Date,                         // When job was created
  updatedAt: Date                          // When job was last modified
}
```

**Usage:** Earn tab listings, side-hustle opportunities

---

## 8. Posts Collection

**Purpose:** Community forum discussions

```javascript
{
  _id: ObjectId,                           // Auto-generated unique identifier
  user: ObjectId,                          // Reference to User who created post (required)
  title: String,                           // Post title (required)
  content: String,                         // Post body/content (required)
  category: String,                        // Post category (e.g., 'Budgeting', 'Saving') (required)
  likes: [ObjectId],                       // Array of User IDs who liked this post
  comments: [{                             // Embedded comments array (not a separate collection)
    user: ObjectId,                        // Reference to User who commented
    text: String,                          // Comment content (required)
    createdAt: Date                        // When comment was created
  }],
  createdAt: Date                          // When post was created
}
```

**Usage:** Community engagement, peer support

**Design Decision:** Comments are embedded (not a separate collection) for better read performance (1 query instead of 2)

---

## Database Relationships

```
Users (1) ──→ (Many) Expenses
Users (1) ──→ (Many) Earnings
Users (1) ──→ (Many) Goals
Users (1) ──→ (Many) Posts
Users (1) ──→ (Many) Articles (admin only)
Users (1) ──→ (Many) Jobs (admin only)
Users (Many) ←→ (Many) Posts (via likes array)
Posts (1) ──→ (Many) Comments (embedded)
```

---

## Design Decisions

### Why MongoDB (NoSQL)?
- ✅ Flexible schema for varying user budget settings
- ✅ Document model fits expense/earning records naturally
- ✅ Embedded documents (comments in posts) reduce joins
- ✅ JSON-native integration with Node.js and React Native

### Embedded vs Referenced Documents

**Embedded (Comments in Posts):**
- Comments always retrieved with parent post
- 1 database query instead of 2
- Better read performance

**Referenced (User in Expenses):**
- User data changes independently
- No data duplication
- Proper normalization

### Category-Based Expense Tracking
- Prevents duplicate categories ("Food" vs "food")
- Enables consistent analytics
- Admin-controlled for data quality

---

## Indexing Strategy

**Recommended indexes for performance:**

- **Users:** `email` (unique), `googleId`
- **Expenses:** `user`, `date`, compound `{user: 1, date: -1}`
- **Earnings:** `user`, `date`
- **Goals:** `user`
- **Posts:** `createdAt`, `category`, `user`
- **Articles:** `isPublished`, `category`
- **Jobs:** `isPublished`, `category`, `difficulty`

---

**Last Updated:** December 17, 2025 | **Version:** 1.0
