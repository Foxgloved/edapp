from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from ..core.database import get_db
from ..models.user import User
from ..models.course import Course, Enrollment
from ..models.certificate import Certificate
from ..schemas.course import CourseCreate, CourseResponse, EnrollmentCreate, EnrollmentResponse
from .auth import get_current_user

router = APIRouter()

class CourseDetailResponse(CourseResponse):
    """Extended course response with user-specific info"""
    has_certificate: bool = False
    certificate_id: Optional[int] = None
    enrollment_progress: float = 0.0
    is_enrolled: bool = False

@router.get("/", response_model=List[CourseResponse])
def get_courses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    courses = db.query(Course).offset(skip).limit(limit).all()
    return courses

@router.get("/my-courses", response_model=List[CourseResponse])
def get_my_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    enrollments = db.query(Enrollment).filter(Enrollment.user_id == current_user.id).all()
    courses = [enrollment.course for enrollment in enrollments]
    return courses

@router.get("/{course_id}", response_model=CourseDetailResponse)
def get_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if user has a certificate for this course
    certificate = db.query(Certificate).filter(
        Certificate.user_id == current_user.id,
        Certificate.course_id == course_id
    ).first()
    
    # Check enrollment status and progress
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    return CourseDetailResponse(
        id=course.id,
        title=course.title,
        description=course.description,
        category=course.category,
        level=course.level,
        duration=course.duration,
        thumbnail=course.thumbnail,
        rating=course.rating,
        instructor_id=course.instructor_id,
        created_at=course.created_at,
        updated_at=course.updated_at,
        has_certificate=certificate is not None,
        certificate_id=certificate.id if certificate else None,
        enrollment_progress=enrollment.progress_percentage if enrollment else 0.0,
        is_enrolled=enrollment is not None
    )

@router.post("/", response_model=CourseResponse)
def create_course(
    course_in: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    course = Course(**course_in.dict())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

@router.post("/{course_id}/enroll", response_model=EnrollmentResponse)
def enroll_in_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    existing_enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    enrollment = Enrollment(user_id=current_user.id, course_id=course_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    
    return enrollment
