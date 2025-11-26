"""
Migration script to create certificates table
Run this script to add the certificates table to the database
"""

from sqlalchemy import create_engine
from core.config import settings
from models import Base
from models.certificate import Certificate

def create_certificates_table():
    """Create certificates table if it doesn't exist"""
    engine = create_engine(settings.DATABASE_URL)
    
    print("Creating certificates table...")
    Base.metadata.create_all(bind=engine, tables=[Certificate.__table__])
    print("✓ Certificates table created successfully!")

if __name__ == "__main__":
    create_certificates_table()




