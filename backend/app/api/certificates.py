from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import secrets
from ..core.database import get_db
from ..models import User, Course, Certificate, Enrollment
from ..schemas.certificate import CertificateResponse, CertificateDetail, CertificateCreate
from .auth import get_current_user

router = APIRouter()

def generate_certificate_number() -> str:
    """Generate a unique certificate number"""
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    random_part = secrets.token_hex(4).upper()
    return f"CERT-{timestamp}-{random_part}"

@router.get("/", response_model=List[CertificateResponse])
def get_my_certificates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all certificates for the current user"""
    certificates = db.query(Certificate).filter(
        Certificate.user_id == current_user.id
    ).order_by(Certificate.issued_at.desc()).all()
    
    return certificates

@router.get("/{certificate_id}", response_model=CertificateDetail)
def get_certificate(
    certificate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific certificate by ID"""
    certificate = db.query(Certificate).filter(
        Certificate.id == certificate_id
    ).first()
    
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    # Check if user owns this certificate or is an admin
    if certificate.user_id != current_user.id and current_user.role.value != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to view this certificate")
    
    # Get course details
    course = db.query(Course).filter(Course.id == certificate.course_id).first()
    
    # Prepare detailed response
    cert_detail = CertificateDetail(
        id=certificate.id,
        user_id=certificate.user_id,
        course_id=certificate.course_id,
        certificate_number=certificate.certificate_number,
        issued_at=certificate.issued_at,
        completed_at=certificate.completed_at,
        instructor_name=certificate.instructor_name,
        course_title=certificate.course_title,
        student_name=certificate.student_name,
        grade=certificate.grade,
        course_thumbnail=course.thumbnail if course else None,
        course_category=course.category if course else None,
        course_duration=course.duration if course else None
    )
    
    return cert_detail

@router.post("/generate/{course_id}", response_model=CertificateResponse)
def generate_certificate(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Generate a certificate for a completed course"""
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if user is enrolled
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=400, detail="You are not enrolled in this course")
    
    # Check if course is completed (100% progress)
    if enrollment.progress_percentage < 100:
        raise HTTPException(
            status_code=400,
            detail=f"Course must be 100% complete. Current progress: {enrollment.progress_percentage}%"
        )
    
    # Check if certificate already exists
    existing_cert = db.query(Certificate).filter(
        Certificate.user_id == current_user.id,
        Certificate.course_id == course_id
    ).first()
    
    if existing_cert:
        return existing_cert
    
    # Mark enrollment as completed if not already
    if not enrollment.completed_at:
        enrollment.completed_at = datetime.utcnow()
        db.commit()
    
    # Get instructor name
    instructor_name = course.instructor.name if course.instructor else "Platform Instructor"
    
    # Generate grade based on progress (you can customize this logic)
    grade = "Pass"
    if enrollment.progress_percentage >= 95:
        grade = "Excellent"
    elif enrollment.progress_percentage >= 90:
        grade = "Very Good"
    
    # Create certificate
    certificate = Certificate(
        user_id=current_user.id,
        course_id=course_id,
        certificate_number=generate_certificate_number(),
        completed_at=enrollment.completed_at or datetime.utcnow(),
        instructor_name=instructor_name,
        course_title=course.title,
        student_name=current_user.name,
        grade=grade
    )
    
    db.add(certificate)
    db.commit()
    db.refresh(certificate)
    
    return certificate

@router.get("/course/{course_id}", response_model=CertificateResponse)
def get_certificate_by_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get certificate for a specific course"""
    certificate = db.query(Certificate).filter(
        Certificate.user_id == current_user.id,
        Certificate.course_id == course_id
    ).first()
    
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found for this course")
    
    return certificate

@router.get("/verify/{certificate_number}", response_model=CertificateDetail)
def verify_certificate(
    certificate_number: str,
    db: Session = Depends(get_db)
):
    """Verify a certificate by its certificate number (public endpoint)"""
    certificate = db.query(Certificate).filter(
        Certificate.certificate_number == certificate_number
    ).first()
    
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    # Get course details
    course = db.query(Course).filter(Course.id == certificate.course_id).first()
    
    cert_detail = CertificateDetail(
        id=certificate.id,
        user_id=certificate.user_id,
        course_id=certificate.course_id,
        certificate_number=certificate.certificate_number,
        issued_at=certificate.issued_at,
        completed_at=certificate.completed_at,
        instructor_name=certificate.instructor_name,
        course_title=certificate.course_title,
        student_name=certificate.student_name,
        grade=certificate.grade,
        course_thumbnail=course.thumbnail if course else None,
        course_category=course.category if course else None,
        course_duration=course.duration if course else None
    )
    
    return cert_detail

