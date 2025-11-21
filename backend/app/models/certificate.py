from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base

class Certificate(Base):
    __tablename__ = "certificates"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    certificate_number = Column(String, unique=True, index=True, nullable=False)
    issued_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=False)
    instructor_name = Column(String, nullable=False)
    course_title = Column(String, nullable=False)
    student_name = Column(String, nullable=False)
    grade = Column(String, nullable=True)  # Optional: "Pass", "Excellent", etc.
    
    # Relationships
    user = relationship("User", back_populates="certificates")
    course = relationship("Course", back_populates="certificates")

