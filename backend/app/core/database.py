from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Determine if using SQLite or PostgreSQL/NeonDB
is_sqlite = "sqlite" in settings.DATABASE_URL

# Configure engine based on database type
if is_sqlite:
    # SQLite configuration (for development/testing)
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=False
    )
else:
    # PostgreSQL/NeonDB configuration (for production)
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,        # Verify connections before using
        pool_recycle=3600,          # Recycle connections after 1 hour
        pool_size=10,               # Number of connections to maintain
        max_overflow=20,            # Additional connections when pool is full
        echo=False,                 # Set to True for SQL debugging
        connect_args={
            "connect_timeout": 10,  # Connection timeout in seconds
            "options": "-c timezone=utc"  # Set timezone to UTC
        }
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for getting database sessions"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_connection():
    """Check if database connection is working"""
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False
