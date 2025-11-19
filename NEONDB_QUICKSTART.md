# NeonDB Quick Start - 5 Minutes Setup

Get your EdApp running with NeonDB in 5 minutes!

---

## 🎯 Prerequisites

- ✅ NeonDB account (free at https://neon.tech)
- ✅ Python 3.8+ installed
- ✅ Node.js 18+ installed

---

## ⚡ 3-Step Setup

### Step 1: Get Your Database (2 minutes)

1. **Go to** https://neon.tech
2. **Sign up** (free - no credit card required)
3. **Create project** named "edapp-database"
4. **Copy connection string** - looks like:
   ```
   postgresql://user:pass@ep-xyz.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Configure Backend (1 minute)

```bash
cd backend

# Create .env file
cp env.example .env

# Edit .env and paste your connection string
# DATABASE_URL=postgresql://user:pass@...
```

**Windows:**
```cmd
notepad .env
```

**Mac/Linux:**
```bash
nano .env
# or
code .env
```

### Step 3: Initialize & Run (2 minutes)

```bash
# Still in backend directory

# Run automated setup
./setup_neondb.sh

# OR manual steps:
python -m app.init_neondb
python -m app.seed_nist_course
python -m app.seed_osha_course
python -m app.seed_phishing_course

# Start backend
uvicorn app.main:app --reload
```

---

## 🎉 Done! Access Your App

**Backend API:** http://localhost:8000/docs  
**Frontend:** http://localhost:3000  

**Login with:**
- Email: `john.doe@edapp.com`
- Password: `student123`

---

## 🗂️ What Was Created

### Database Tables:
- ✅ users (with about_me field)
- ✅ courses (NIST, OSHA, Phishing)
- ✅ lessons (78 total lessons)
- ✅ enrollments
- ✅ progress tracking
- ✅ certificates
- ✅ achievements

### Sample Data:
- ✅ 3 users (admin, instructor, student)
- ✅ 3 courses with 78 lessons
- ✅ All ready to use!

---

## 🔧 Common Issues

### Issue: "Connection refused"

**Fix:** Check your DATABASE_URL in `.env`

```bash
# Test connection
psql "your-connection-string" -c "SELECT 1"
```

### Issue: "Module not found"

**Fix:** Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Issue: "Table already exists"

**Fix:** Database already initialized - you're good to go!

```bash
# Or reset if needed
python -m app.init_neondb --reset
```

---

## 📊 Verify Setup

### Check Database Tables

```bash
psql "your-connection-string" -c "\dt"
```

Should show:
- achievements
- assignments
- certificates
- courses
- enrollments
- lessons
- progress
- submissions
- users

### Check Course Data

```bash
psql "your-connection-string" -c "SELECT id, title FROM courses;"
```

Should show:
- NIST Cybersecurity Framework 2.0 Training
- OSHA Restaurant Employee Training - Missouri
- Phishing and Scam Alert Training - Food Service

---

## 🚀 Next Steps

1. **Explore API:** http://localhost:8000/docs
   - Try the `/courses` endpoint
   - Test user authentication
   - Check enrollment endpoints

2. **Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

3. **Browse Courses:**
   - Dashboard: http://localhost:3000/dashboard
   - Courses: http://localhost:3000/courses
   - Profile: http://localhost:3000/profile

4. **Customize:**
   - Change user passwords
   - Add more courses
   - Update branding

---

## 📚 Full Documentation

For detailed setup, troubleshooting, and advanced features, see:
- **`NEONDB_SETUP.md`** - Complete setup guide
- **`database/README.md`** - Database documentation
- **`database/neon_schema.sql`** - SQL schema with comments

---

## 💡 Pro Tips

### Free Tier Limits (Neon)
- ✅ 3 projects
- ✅ 10 branches per project
- ✅ 3 GB storage per branch
- ✅ Unlimited compute hours (scales to zero when idle)

### Optimize Performance
1. Indexes are pre-configured
2. Connection pooling is enabled
3. Auto-scaling handles traffic spikes

### Database Branching
Create test branches for safe experimentation:

```bash
# In Neon console, create a branch
# Update DATABASE_URL to branch connection string
# Test changes safely!
```

---

**🎉 You're all set! Your NeonDB database is ready for production-grade educational platform!**

Questions? Check the full documentation or visit https://neon.tech/docs

