from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CertificateBase(BaseModel):
    course_id: int
    student_name: str
    course_title: str
    instructor_name: str
    grade: Optional[str] = None

class CertificateCreate(BaseModel):
    course_id: int
    user_id: int
    
class CertificateResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    certificate_number: str
    issued_at: datetime
    completed_at: datetime
    instructor_name: str
    course_title: str
    student_name: str
    grade: Optional[str] = None
    
    class Config:
        from_attributes = True

class CertificateDetail(CertificateResponse):
    """Extended certificate info with course and user details"""
    course_thumbnail: Optional[str] = None
    course_category: Optional[str] = None
    course_duration: Optional[int] = None

