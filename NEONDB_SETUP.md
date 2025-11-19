# NeonDB Setup Guide for EdApp

Complete guide to setting up your educational platform with NeonDB (Serverless Postgres).

---

## 📋 Table of Contents
1. [What is NeonDB?](#what-is-neondb)
2. [Quick Start](#quick-start)
3. [Detailed Setup Instructions](#detailed-setup-instructions)
4. [Database Schema](#database-schema)
5. [Environment Configuration](#environment-configuration)
6. [Running Migrations](#running-migrations)
7. [Seeding Data](#seeding-data)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 What is NeonDB?

**Neon** is a serverless Postgres database platform that offers:
- ⚡ **Instant provisioning** - Database ready in seconds
- 💰 **Cost-effective** - Pay only for what you use
- 🔄 **Auto-scaling** - Scales to zero when not in use
- 🌍 **Global** - Deploy in multiple regions
- 📊 **Branching** - Create database branches like Git
- 🔒 **Secure** - Built-in SSL, backups, and point-in-time recovery

---

## ⚡ Quick Start

### Step 1: Create NeonDB Account

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account (GitHub/Google/Email)
3. Create a new project: **"edapp-database"**
4. Select region closest to your users
5. Copy your connection string

### Step 2: Get Connection String

After creating your project, you'll get a connection string like:

```
postgresql://username:password@ep-cool-forest-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 📚 Detailed Setup Instructions

### 1. Install Required Python Packages

```bash
cd backend
pip install psycopg2-binary alembic python-dotenv
```

Update your `requirements.txt`:
```txt
psycopg2-binary==2.9.9
alembic==1.13.1
python-dotenv==1.0.0
```

### 2. Create Environment File

Create `.env` in your `backend/` directory:

```bash
# backend/.env
DATABASE_URL=postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require

# App Settings
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Optional: Neon API Key (for programmatic access)
NEON_API_KEY=your_neon_api_key
```

**⚠️ Important:** Add `.env` to `.gitignore`!

```bash
echo "backend/.env" >> .gitignore
echo "frontend/.env.local" >> .gitignore
```

### 3. Update Database Configuration

The `backend/app/core/database.py` has been configured to work with NeonDB:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# NeonDB connection with SSL support
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using
    pool_recycle=3600,   # Recycle connections after 1 hour
    echo=False           # Set to True for SQL query debugging
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 4. Initialize the Database

Run the SQL schema to create all tables:

```bash
# Option 1: Using psql command line
psql "postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require" < database/neon_schema.sql

# Option 2: Using Neon SQL Editor (in browser)
# Copy the contents of database/neon_schema.sql
# Paste into Neon Console -> SQL Editor -> Run
```

### 5. Verify Database Connection

Test the connection with Python:

```bash
cd backend
python -c "from app.core.database import engine; print('✅ Connected to NeonDB!' if engine.connect() else '❌ Connection failed')"
```

---

## 🗄️ Database Schema

### Tables Created:

1. **users** - User accounts (students, instructors, admins)
2. **courses** - Course catalog
3. **lessons** - Individual lessons within courses
4. **enrollments** - User course enrollments
5. **progress** - Detailed learning progress tracking
6. **assignments** - Course assignments (optional)
7. **submissions** - Assignment submissions (optional)
8. **certificates** - Issued certificates
9. **achievements** - User achievements/badges

### Views:

- **leaderboard** - Aggregated user rankings and stats

### Sample Data Included:

- 3 default users (admin, instructor, student)
- Password for all: `admin123` (⚠️ change in production!)

---

## ⚙️ Environment Configuration

### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://user:pass@host.neon.tech/neondb?sslmode=require

# Security
SECRET_KEY=generate-a-random-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Environment
ENVIRONMENT=development
DEBUG=true

# CORS (Frontend URLs)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=EdApp

# Optional: Analytics, etc.
```

---

## 🔄 Running Migrations

### Using Alembic (Recommended for Production)

1. **Initialize Alembic:**
```bash
cd backend
alembic init alembic
```

2. **Configure** `alembic/env.py`:
```python
from app.core.database import Base
from app.models import user, course, progress, assignment

target_metadata = Base.metadata
```

3. **Create Migration:**
```bash
alembic revision --autogenerate -m "Initial schema"
```

4. **Apply Migration:**
```bash
alembic upgrade head
```

### Manual Approach (Quick Setup)

For initial setup, you can use SQLAlchemy directly:

```python
# backend/app/create_tables.py
from app.core.database import engine, Base
from app.models import user, course, progress, assignment

def create_tables():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ All tables created!")

if __name__ == "__main__":
    create_tables()
```

Run it:
```bash
cd backend
python -m app.create_tables
```

---

## 🌱 Seeding Data

### Seed Courses

Run the existing seed scripts:

```bash
cd backend

# Seed NIST course
python -m app.seed_nist_course

# Seed OSHA course
python -m app.seed_osha_course

# Seed Phishing course
python -m app.seed_phishing_course
```

### Create Custom Seed Script

```python
# backend/app/seed_all.py
import subprocess
import sys

def run_seed_script(script_name):
    print(f"\n{'='*50}")
    print(f"Running {script_name}...")
    print('='*50)
    result = subprocess.run([sys.executable, '-m', f'app.{script_name}'])
    return result.returncode == 0

def main():
    scripts = [
        'seed_nist_course',
        'seed_osha_course',
        'seed_phishing_course'
    ]
    
    success_count = 0
    for script in scripts:
        if run_seed_script(script):
            success_count += 1
    
    print(f"\n{'='*50}")
    print(f"✅ Seeded {success_count}/{len(scripts)} courses successfully!")
    print('='*50)

if __name__ == "__main__":
    main()
```

Run all seeds:
```bash
python -m app.seed_all
```

---

## 🐛 Troubleshooting

### Connection Issues

**Problem:** `Connection refused` or timeout errors

**Solution:**
1. Check your connection string is correct
2. Ensure SSL mode is included: `?sslmode=require`
3. Verify your IP is allowed (Neon allows all by default)
4. Check if database is active (Neon may scale to zero)

```bash
# Test connection
psql "your-connection-string-here" -c "SELECT version();"
```

### SSL Certificate Errors

**Problem:** SSL certificate verification failed

**Solution:**
```python
# In database.py, add SSL arguments:
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={
        "sslmode": "require",
        "sslrootcert": "path/to/cert.pem"  # Optional
    }
)
```

### Migration Errors

**Problem:** Table already exists

**Solution:**
```sql
-- Drop all tables (⚠️ CAUTION: This deletes all data!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO your_user;
```

Then re-run migrations.

### Slow Queries

**Problem:** Queries are slow

**Solution:**
1. Check indexes are created (run schema.sql)
2. Use connection pooling
3. Enable query logging:
```python
engine = create_engine(DATABASE_URL, echo=True)  # See all queries
```

### Pool Timeout

**Problem:** `QueuePool limit of size X overflow Y reached`

**Solution:**
```python
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
```

---

## 📊 Monitoring & Maintenance

### NeonDB Dashboard

Access your Neon dashboard at [https://console.neon.tech](https://console.neon.tech)

**Features:**
- 📈 **Metrics** - Query performance, connections, storage
- 🔍 **SQL Editor** - Run queries directly
- 🌿 **Branches** - Create test/dev branches
- 📦 **Backups** - Point-in-time recovery
- ⚙️ **Settings** - Scaling, regions, access control

### Useful SQL Queries

```sql
-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Active connections
SELECT * FROM pg_stat_activity;

-- User statistics
SELECT 
    role,
    COUNT(*) as user_count
FROM users 
GROUP BY role;

-- Course enrollment stats
SELECT 
    c.title,
    COUNT(e.id) as enrollments,
    AVG(e.progress_percentage) as avg_progress
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.title
ORDER BY enrollments DESC;
```

---

## 🚀 Next Steps

1. ✅ **Setup Complete** - Your database is ready!
2. 🔐 **Change Default Passwords** - Update the sample user passwords
3. 🌱 **Seed Your Data** - Run the seed scripts
4. 🧪 **Test API** - Start backend and test endpoints
5. 🎨 **Connect Frontend** - Update frontend API URLs
6. 📊 **Monitor** - Check Neon dashboard regularly
7. 🔄 **Backup Strategy** - Configure automated backups
8. 🌍 **Production** - Deploy to production when ready

---

## 📚 Additional Resources

- **Neon Documentation:** https://neon.tech/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **SQLAlchemy ORM:** https://docs.sqlalchemy.org/
- **Alembic Migrations:** https://alembic.sqlalchemy.org/
- **FastAPI + Postgres:** https://fastapi.tiangolo.com/tutorial/sql-databases/

---

## 🆘 Support

### Neon Support
- Discord: https://discord.gg/neon
- Email: support@neon.tech
- Forum: https://community.neon.tech

### Project Issues
- Check `PROGRESS_REPORT.txt` for known issues
- Review backend logs for errors
- Test with `DEBUG=true` for detailed output

---

**✅ Your NeonDB setup is complete! Happy coding! 🎉**

