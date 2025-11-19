"""
NeonDB Database Initialization Script
Run this to set up your database for the first time
"""

import sys
from sqlalchemy import text
from app.core.database import engine, Base, check_connection
from app.models.user import User, UserRole
from app.models.course import Course, Enrollment, Lesson, CourseLevel
from app.models.progress import Progress
from app.models.assignment import Assignment, Submission
from app.core.security import get_password_hash

def init_database():
    """Initialize the database with tables and sample data"""
    
    print("="*60)
    print("🚀 NeonDB Database Initialization")
    print("="*60)
    
    # Step 1: Check connection
    print("\n📡 Step 1: Checking database connection...")
    if not check_connection():
        print("❌ Cannot connect to database!")
        print("💡 Check your DATABASE_URL in .env file")
        return False
    print("✅ Database connection successful!")
    
    # Step 2: Create tables
    print("\n📊 Step 2: Creating tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ All tables created!")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False
    
    # Step 3: Verify tables
    print("\n🔍 Step 3: Verifying tables...")
    from sqlalchemy import inspect
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    expected_tables = ['users', 'courses', 'lessons', 'enrollments', 'progress', 'assignments', 'submissions']
    missing_tables = set(expected_tables) - set(tables)
    
    if missing_tables:
        print(f"⚠️  Missing tables: {missing_tables}")
    else:
        print(f"✅ All {len(tables)} tables verified!")
        for table in sorted(tables):
            print(f"  ✓ {table}")
    
    # Step 4: Create sample users
    print("\n👥 Step 4: Creating sample users...")
    from app.core.database import SessionLocal
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_users = db.query(User).count()
        if existing_users > 0:
            print(f"ℹ️  Database already has {existing_users} user(s). Skipping user creation.")
        else:
            sample_users = [
                User(
                    email="admin@edapp.com",
                    hashed_password=get_password_hash("admin123"),
                    name="Admin User",
                    role=UserRole.ADMIN,
                    about_me="Platform administrator"
                ),
                User(
                    email="instructor@edapp.com",
                    hashed_password=get_password_hash("instructor123"),
                    name="Security Experts",
                    role=UserRole.INSTRUCTOR,
                    about_me="Cybersecurity and compliance training expert"
                ),
                User(
                    email="john.doe@edapp.com",
                    hashed_password=get_password_hash("student123"),
                    name="John Doe",
                    role=UserRole.STUDENT,
                    about_me="Passionate about continuous learning and professional development."
                )
            ]
            
            db.add_all(sample_users)
            db.commit()
            print(f"✅ Created {len(sample_users)} sample users!")
            print("\n📝 Sample Login Credentials:")
            print("   Admin:      admin@edapp.com      / admin123")
            print("   Instructor: instructor@edapp.com / instructor123")
            print("   Student:    john.doe@edapp.com   / student123")
            print("\n⚠️  IMPORTANT: Change these passwords in production!")
    except Exception as e:
        print(f"❌ Error creating users: {e}")
        db.rollback()
    finally:
        db.close()
    
    # Step 5: Summary
    print("\n" + "="*60)
    print("✅ Database initialization complete!")
    print("="*60)
    print("\n📋 Next steps:")
    print("  1. Run seed scripts to add courses:")
    print("     python -m app.seed_nist_course")
    print("     python -m app.seed_osha_course")
    print("     python -m app.seed_phishing_course")
    print("\n  2. Start the backend server:")
    print("     uvicorn app.main:app --reload")
    print("\n  3. Access the API documentation:")
    print("     http://localhost:8000/docs")
    print("\n🎉 Your NeonDB setup is complete!")
    
    return True

def reset_database():
    """Reset database (drop and recreate all tables)"""
    print("="*60)
    print("⚠️  DATABASE RESET - ALL DATA WILL BE DELETED")
    print("="*60)
    
    confirm = input("\nType 'RESET DATABASE' to confirm: ")
    
    if confirm != "RESET DATABASE":
        print("❌ Cancelled. Database not modified.")
        return False
    
    print("\n🗑️  Dropping all tables...")
    try:
        Base.metadata.drop_all(bind=engine)
        print("✅ All tables dropped!")
    except Exception as e:
        print(f"❌ Error dropping tables: {e}")
        return False
    
    print("\n🔄 Recreating database...")
    return init_database()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--reset":
        reset_database()
    else:
        init_database()

