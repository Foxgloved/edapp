from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..core.database import get_db
from ..models.user import User
from ..models.assignment import Assignment, Submission
from ..schemas.assignment import (
    AssignmentCreate,
    AssignmentResponse,
    SubmissionCreate,
    SubmissionResponse,
    SubmissionUpdate
)
from .auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[AssignmentResponse])
def get_assignments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    assignments = db.query(Assignment).offset(skip).limit(limit).all()
    return assignments

@router.get("/{assignment_id}", response_model=AssignmentResponse)
def get_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@router.post("/", response_model=AssignmentResponse)
def create_assignment(
    assignment_in: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    assignment = Assignment(**assignment_in.dict())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment

@router.post("/{assignment_id}/submit", response_model=SubmissionResponse)
def submit_assignment(
    assignment_id: int,
    submission_in: SubmissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    submission = Submission(
        assignment_id=assignment_id,
        student_id=current_user.id,
        content=submission_in.content,
        file_url=submission_in.file_url
    )
    
    db.add(submission)
    db.commit()
    db.refresh(submission)
    
    return submission
