# Database Documentation

This directory contains database schemas, migrations, and setup scripts for the EdApp educational platform.

## 📁 Files

- **`neon_schema.sql`** - Complete PostgreSQL schema for NeonDB
- **`README.md`** - This file

## 🗄️ Database Tables

### Core Tables

1. **users** - User accounts
   - Students, instructors, and administrators
   - Includes profile info and about_me section
   - Passwords are hashed with bcrypt

2. **courses** - Course catalog
   - Course metadata (title, description, category)
   - Duration, level, rating, thumbnail
   - Links to instructor

3. **lessons** - Course lessons
   - Individual lessons within courses
   - Video URLs and duration
   - Ordered sequence

4. **enrollments** - Course enrollments
   - Tracks user-course relationships
   - Progress percentage
   - Completion timestamps

5. **progress** - Detailed progress tracking
   - Per-lesson completion
   - Time spent, streaks, points
   - Leaderboard data

6. **certificates** - Issued certificates
   - Certificate URLs
   - Issued date
   - One per user-course

7. **achievements** - User achievements
   - Badges and milestones
   - Custom icons and descriptions

8. **assignments** - Course assignments (optional)
   - For courses that need assessments
   - Due dates (optional)

9. **submissions** - Assignment submissions (optional)
   - Student work
   - Grades and feedback

### Database Views

- **leaderboard** - Aggregated user rankings and statistics

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```bash
cd backend
./setup_neondb.sh
```

This will:
1. Check for .env file
2. Install dependencies
3. Create all tables
4. Seed sample users
5. Seed all courses

### Option 2: Manual Setup

1. **Create your NeonDB database** at https://neon.tech

2. **Copy your connection string** from Neon dashboard

3. **Create .env file:**
```bash
cd backend
cp env.example .env
# Edit .env and add your DATABASE_URL
```

4. **Run the schema:**
```bash
psql "your-connection-string" < ../database/neon_schema.sql
```

5. **Initialize with Python:**
```bash
python -m app.init_neondb
```

6. **Seed courses:**
```bash
python -m app.seed_nist_course
python -m app.seed_osha_course
python -m app.seed_phishing_course
```

## 🔐 Default Users

After initialization, these users are created:

| Email | Password | Role |
|-------|----------|------|
| admin@edapp.com | admin123 | Admin |
| instructor@edapp.com | instructor123 | Instructor |
| john.doe@edapp.com | student123 | Student |

⚠️ **Change these passwords immediately in production!**

## 📊 Database Schema Diagram

```
┌─────────────┐
│    users    │
├─────────────┤
│ id          │──┐
│ email       │  │
│ name        │  │
│ role        │  │
│ about_me    │  │
└─────────────┘  │
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────────┐         ┌─────────────┐
│ enrollments │         │  progress   │
├─────────────┤         ├─────────────┤
│ user_id     │         │ user_id     │
│ course_id   │──┐      │ course_id   │──┐
│ progress_%  │  │      │ lesson_id   │  │
└─────────────┘  │      │ time_spent  │  │
                 │      └─────────────┘  │
                 │                       │
                 ▼                       ▼
           ┌─────────────┐         ┌─────────────┐
           │   courses   │         │   lessons   │
           ├─────────────┤         ├─────────────┤
           │ id          │◄────────│ course_id   │
           │ title       │         │ title       │
           │ category    │         │ duration    │
           │ level       │         │ video_url   │
           │ duration    │         │ order       │
           └─────────────┘         └─────────────┘
```

## 🔧 Maintenance

### Backup Database

Neon provides automatic backups, but you can also:

```bash
# Backup to SQL file
pg_dump "your-connection-string" > backup_$(date +%Y%m%d).sql

# Restore from backup
psql "your-connection-string" < backup_20251118.sql
```

### View Database Stats

```sql
-- Table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Row counts
SELECT 
    'users' as table_name, COUNT(*) as rows FROM users
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'lessons', COUNT(*) FROM lessons
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments
UNION ALL
SELECT 'progress', COUNT(*) FROM progress;
```

### Reset Database

```bash
# Reset everything (⚠️ deletes all data!)
cd backend
python -m app.init_neondb --reset
```

## 📝 Migration Guide

### From SQLite to NeonDB

1. **Export data from SQLite:**
```bash
sqlite3 your.db .dump > sqlite_backup.sql
```

2. **Convert to PostgreSQL format** (manual adjustments needed)

3. **Import to NeonDB:**
```bash
psql "your-connection-string" < converted_data.sql
```

### Adding New Tables

1. Update SQLAlchemy models in `backend/app/models/`
2. Create migration:
```bash
alembic revision --autogenerate -m "Add new table"
```
3. Apply migration:
```bash
alembic upgrade head
```

## 🔒 Security Best Practices

1. ✅ **Use SSL** - Always include `?sslmode=require` in connection string
2. ✅ **Environment Variables** - Never commit .env files
3. ✅ **Strong Passwords** - Change default passwords
4. ✅ **Limited Access** - Use read-only users for reporting
5. ✅ **Regular Backups** - Enable Neon backups
6. ✅ **Connection Pooling** - Configured in database.py
7. ✅ **SQL Injection Protection** - Use parameterized queries (SQLAlchemy handles this)

## 📞 Support

- **NeonDB Issues:** https://discord.gg/neon
- **Schema Questions:** Check `neon_schema.sql` comments
- **Migration Help:** See `NEONDB_SETUP.md`

---

**Database Version:** PostgreSQL 15+ (Neon)  
**Last Updated:** November 2025

