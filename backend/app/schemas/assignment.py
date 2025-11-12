from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    max_grade: float = 100.0
    due_date: datetime

class AssignmentCreate(AssignmentBase):
    course_id: int

class AssignmentResponse(AssignmentBase):
    id: int
    course_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubmissionCreate(BaseModel):
    assignment_id: int
    content: Optional[str] = None
    file_url: Optional[str] = None

class SubmissionUpdate(BaseModel):
    grade: Optional[float] = None
    feedback: Optional[str] = None

class SubmissionResponse(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    content: Optional[str] = None
    file_url: Optional[str] = None
    status: str
    grade: Optional[float] = None
    feedback: Optional[str] = None
    submitted_at: datetime
    graded_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
