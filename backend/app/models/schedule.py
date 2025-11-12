from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from datetime import datetime
import enum
from ..core.database import Base

class ScheduleType(str, enum.Enum):
    LIVE = "live"
    EXAM = "exam"
    ASSIGNMENT = "assignment"

class Schedule(Base):
    __tablename__ = "schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String, nullable=False)
    type = Column(Enum(ScheduleType), default=ScheduleType.LIVE)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
