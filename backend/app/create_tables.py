"""
Create all database tables for the educational platform
This script creates tables based on SQLAlchemy models
"""

from app.core.database import engine, Base
from app.models import user, course, progress, assignment

def create_tables():
    """Create all tables in the database"""
    print("🔄 Creating database tables...")
    print(f"📊 Database: {engine.url}")
    
    try:
        # Import all models to ensure they're registered
        from app.models.user import User
        from app.models.course import Course, Enrollment, Lesson
        from app.models.progress import Progress
        from app.models.assignment import Assignment, Submission
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("\n✅ All tables created successfully!")
        print("\n📋 Tables created:")
        print("  • users")
        print("  • courses")
        print("  • lessons")
        print("  • enrollments")
        print("  • progress")
        print("  • assignments")
        print("  • submissions")
        
        # Verify tables exist
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        print(f"\n✅ Verified {len(tables)} tables in database:")
        for table in sorted(tables):
            print(f"  ✓ {table}")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error creating tables: {e}")
        return False

def drop_tables():
    """Drop all tables (⚠️ CAUTION: This deletes all data!)"""
    print("⚠️  WARNING: This will delete ALL data!")
    confirm = input("Type 'DELETE ALL DATA' to confirm: ")
    
    if confirm == "DELETE ALL DATA":
        print("🗑️  Dropping all tables...")
        Base.metadata.drop_all(bind=engine)
        print("✅ All tables dropped!")
    else:
        print("❌ Cancelled. No tables were dropped.")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--drop":
        drop_tables()
    else:
        create_tables()

