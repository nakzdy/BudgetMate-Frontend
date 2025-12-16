# BudgetMate - Data Collections and Model Design
**Criteria 3: Database Schema Documentation**

---

## Overview
BudgetMate uses MongoDB as its database system with Mongoose ODM for schema definition and data validation. The application consists of **8 primary collections** that support personal finance management, educational content, job opportunities, and community engagement features.

---

## Collection 1: Users

### Purpose
Stores user account information, authentication credentials, and personalized budget settings. This is the central collection that links to most other collections through user references.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  name: String,                     // User's display name
  email: String,                    // Unique email (required for authentication)
  password: String,                 // Hashed password (null for Google OAuth users)
  googleId: String,                 // Google OAuth identifier
  avatarSeed: String,               // Seed for DiceBear avatar generation
  role: String,                     // 'user' or 'admin' (default: 'user')
  
  // Budget Settings
  monthlyIncome: Number,            // User's monthly income (default: 0)
  paymentFrequency: String,         // Payment schedule (e.g., 'weekly', 'monthly')
  spendingCategories: [String],     // Array of selected spending categories
  targetSavingsRate: Number,        // Target savings percentage (default: 0)
  emergencyFundGoal: Number,        // Emergency fund target amount (default: 0)
  annualSavingsGoal: Number,        // Annual savings target (default: 0)
  
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

### System Requirements Relationship
- **Authentication**: Supports both email/password and Google OAuth authentication
- **Personalization**: Stores budget preferences and financial goals unique to each user
- **Role-Based Access**: Enables admin functionality for content management
- **Avatar System**: Uses avatarSeed to generate consistent profile pictures via DiceBear API

---

## Collection 2: Expenses

### Purpose
Tracks all user spending transactions, categorized by type. Used for budget tracking, expense history, and financial analytics on the Home tab.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  user: ObjectId,                   // Reference to Users collection (required)
  amount: Number,                   // Expense amount (required)
  category: String,                 // Expense category (required)
  description: String,              // Optional expense description (default: "")
  date: Date,                       // Transaction date (default: current date)
  createdAt: Date                   // Record creation timestamp
}
```

### System Requirements Relationship
- **Budget Tracking**: Enables real-time expense monitoring and budget calculations
- **Category Analysis**: Groups expenses by category for spending insights
- **User Isolation**: Each expense is tied to a specific user via reference
- **History Tracking**: Maintains chronological record of all transactions

---

## Collection 3: Earnings

### Purpose
Records user income from various sources. Used to track additional income beyond regular salary, particularly from side hustles and opportunities found in the Earn tab.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  user: ObjectId,                   // Reference to Users collection (required)
  amount: Number,                   // Earning amount (required)
  source: String,                   // Income source (required)
  description: String,              // Optional earning description (default: "")
  date: Date,                       // Transaction date (default: current date)
  createdAt: Date                   // Record creation timestamp
}
```

### System Requirements Relationship
- **Income Tracking**: Monitors additional income streams beyond monthly salary
- **Source Attribution**: Identifies which opportunities generate income
- **Financial Overview**: Contributes to total income calculations on Home tab
- **User Segmentation**: Isolates earnings per user account

---

## Collection 4: Goals

### Purpose
Manages user-defined financial goals with progress tracking. Supports savings targets, emergency funds, and other financial objectives displayed on the Home and Profile tabs.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  user: ObjectId,                   // Reference to Users collection (required)
  name: String,                     // Goal name/title (required)
  targetAmount: Number,             // Target amount to achieve (required)
  currentAmount: Number,            // Current progress amount (default: 0)
  category: String,                 // Goal category (default: "General")
  targetDate: Date,                 // Optional deadline for goal completion
  createdAt: Date                   // Goal creation timestamp
}
```

### System Requirements Relationship
- **Goal Setting**: Enables users to define and track financial objectives
- **Progress Monitoring**: Tracks current vs. target amounts for visual progress indicators
- **Categorization**: Groups goals by type (e.g., emergency fund, vacation, education)
- **Deadline Management**: Optional target dates for time-bound goals

---

## Collection 5: Categories

### Purpose
Stores predefined spending categories used throughout the application. Provides consistent categorization options for expenses and budget planning.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  name: String,                     // Category name (required, unique)
  createdAt: Date                   // Category creation timestamp
}
```

### System Requirements Relationship
- **Standardization**: Ensures consistent category naming across the application
- **Budget Configuration**: Provides options for user budget setup
- **Expense Classification**: Used as reference for expense categorization
- **Admin Management**: Can be managed through admin panel

---

## Collection 6: Articles

### Purpose
Contains financial education content displayed in the Learn tab. Admins can create, edit, and publish articles to educate users on personal finance topics.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  title: String,                    // Article title (required)
  description: String,              // Short summary/preview (required)
  content: String,                  // Full article content (optional)
  url: String,                      // External article link (optional)
  iconName: String,                 // Icon identifier (default: 'article')
  color: String,                    // Theme color for UI (default: '#6C63FF')
  category: String,                 // Article category (default: 'general')
  isPublished: Boolean,             // Publication status (default: true)
  createdBy: ObjectId,              // Reference to admin User (required)
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

### System Requirements Relationship
- **Educational Content**: Provides financial literacy resources to users
- **Content Management**: Admins can manage articles through admin panel
- **Flexible Content**: Supports both internal content and external links
- **Visual Customization**: Icon and color fields enable UI theming
- **Publishing Control**: isPublished flag allows draft/published workflow

---

## Collection 7: Jobs

### Purpose
Stores job and earning opportunity listings shown in the Earn tab. Supports both internal job postings and external opportunities from OnlineJobs.ph.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  title: String,                    // Job title (required)
  description: String,              // Brief job description (required)
  difficulty: String,               // 'Easy', 'Medium', or 'Hard' (default: 'Easy')
  payRange: String,                 // Compensation range (required)
  timeCommitment: String,           // Time requirement (required)
  tags: [String],                   // Searchable tags (default: [])
  fullDescription: String,          // Detailed job description (optional)
  requirements: [String],           // Job requirements array (default: [])
  howToStart: String,               // Application instructions (optional)
  source: String,                   // 'internal' or 'onlinejobs.ph' (default: 'internal')
  category: String,                 // Job category (default: 'Other')
                                    // Options: 'Virtual Assistant', 'Freelance/Remote', 
                                    // 'Part-time', 'Other'
  externalUrl: String,              // Link to external job posting (optional)
  isPublished: Boolean,             // Publication status (default: true)
  createdBy: ObjectId,              // Reference to admin User (required)
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

### System Requirements Relationship
- **Opportunity Discovery**: Provides earning opportunities to users
- **Difficulty Filtering**: Allows users to find jobs matching their skill level
- **Category Filtering**: Enables filtering by job type (VA, Freelance, Part-time)
- **External Integration**: Supports jobs from OnlineJobs.ph via externalUrl
- **Admin Management**: Admins can curate and manage job listings
- **Rich Information**: Multiple fields provide comprehensive job details

---

## Collection 8: Posts

### Purpose
Manages community forum posts where users can share experiences, ask questions, and engage with each other. Includes support for likes and nested comments.

### Document Structure
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  user: ObjectId,                   // Reference to post author (required)
  title: String,                    // Post title (required)
  content: String,                  // Post content/body (required)
  category: String,                 // Post category (required)
  likes: [ObjectId],                // Array of User IDs who liked the post
  comments: [                       // Array of comment subdocuments
    {
      user: ObjectId,               // Reference to comment author
      text: String,                 // Comment content (required)
      createdAt: Date               // Comment timestamp
    }
  ],
  createdAt: Date                   // Post creation timestamp
}
```

### System Requirements Relationship
- **Community Engagement**: Enables user-to-user interaction and knowledge sharing
- **Discussion Categorization**: Organizes posts by topic
- **Social Features**: Supports likes for post popularity tracking
- **Nested Comments**: Allows threaded discussions on posts
- **User Attribution**: Links posts and comments to user profiles with avatars
- **Chronological Ordering**: Timestamps enable sorting by recency

---

## Database Relationships

### One-to-Many Relationships
1. **User → Expenses**: One user has many expenses
2. **User → Earnings**: One user has many earnings
3. **User → Goals**: One user has many financial goals
4. **User → Posts**: One user can create many posts
5. **User → Articles**: One admin user can create many articles
6. **User → Jobs**: One admin user can create many job listings

### Many-to-Many Relationships
1. **User ↔ Posts (Likes)**: Many users can like many posts
2. **User ↔ Posts (Comments)**: Many users can comment on many posts

### Reference Integrity
- All user-related collections use `ObjectId` references to maintain data integrity
- Mongoose's `ref` property enables population of related documents
- Cascading deletes should be implemented at the application level when users are removed

---

## Data Validation and Constraints

### Unique Constraints
- **Users.email**: Ensures no duplicate email addresses
- **Categories.name**: Prevents duplicate category names

### Required Fields
Each collection enforces required fields to maintain data quality:
- **Users**: email
- **Expenses**: user, amount, category
- **Earnings**: user, amount, source
- **Goals**: user, name, targetAmount
- **Categories**: name
- **Articles**: title, description, createdBy
- **Jobs**: title, description, payRange, timeCommitment, createdBy
- **Posts**: user, title, content, category

### Enumerated Values
- **Users.role**: ['user', 'admin']
- **Jobs.difficulty**: ['Easy', 'Medium', 'Hard']
- **Jobs.source**: ['internal', 'onlinejobs.ph']
- **Jobs.category**: ['Virtual Assistant', 'Freelance/Remote', 'Part-time', 'Other']

---

## Indexing Strategy

### Recommended Indexes
1. **Users**
   - `email` (unique index) - for authentication lookups
   - `googleId` - for OAuth authentication

2. **Expenses**
   - `user` - for user-specific queries
   - `date` - for chronological sorting
   - Compound: `{user: 1, date: -1}` - for user expense history

3. **Earnings**
   - `user` - for user-specific queries
   - `date` - for chronological sorting

4. **Goals**
   - `user` - for user-specific queries

5. **Posts**
   - `createdAt` - for feed sorting
   - `category` - for category filtering
   - `user` - for user post history

6. **Articles**
   - `isPublished` - for filtering published content
   - `category` - for category filtering

7. **Jobs**
   - `isPublished` - for filtering published jobs
   - `category` - for category filtering
   - `difficulty` - for difficulty filtering

---

## Summary

This database design supports BudgetMate's core functionalities:

1. **Personal Finance Management**: Users, Expenses, Earnings, Goals collections work together to provide comprehensive budget tracking and financial planning.

2. **Educational Content**: Articles collection delivers financial literacy resources managed by administrators.

3. **Earning Opportunities**: Jobs collection connects users with income opportunities, supporting both internal and external job sources.

4. **Community Engagement**: Posts collection enables peer-to-peer knowledge sharing and support.

5. **Scalability**: The schema design uses proper referencing, indexing strategies, and data normalization to support application growth.

6. **Data Integrity**: Required fields, unique constraints, and enumerated values ensure data quality and consistency.

The schema follows MongoDB best practices with appropriate use of embedded documents (comments in posts) and references (user relationships), balancing query performance with data consistency requirements.
