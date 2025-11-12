from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class LessonBase(BaseModel):
    title: str
    description: Optional[str] = None
    video_url: Optional[str] = None
    duration: int
    order: int = 0

class LessonCreate(LessonBase):
    course_id: int

class LessonResponse(LessonBase):
    id: int
    course_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    level: str
    duration: int
    thumbnail: Optional[str] = None

class CourseCreate(CourseBase):
    instructor_id: int

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None

class CourseResponse(CourseBase):
    id: int
    rating: float
    instructor_id: int
    created_at: datetime
    lessons: Optional[List[LessonResponse]] = []
    
    class Config:
        from_attributes = True

class EnrollmentCreate(BaseModel):
    course_id: int

class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime
    progress_percentage: float
    
    class Config:
        from_attributes = True
