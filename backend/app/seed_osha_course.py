"""
Script to seed OSHA Restaurant Training Course into the database
Run this script to add the OSHA training course with all modules and lessons
"""

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.course import Course, Lesson, CourseLevel
from app.models.user import User

def seed_osha_course():
    """Seed OSHA Restaurant Training Course"""
    db = SessionLocal()
    
    try:
        # Check if course already exists
        existing_course = db.query(Course).filter(
            Course.title == "OSHA Restaurant Employee Training - Missouri"
        ).first()
        
        if existing_course:
            print("OSHA course already exists. Skipping...")
            return
        
        # Get or create an instructor (using first admin/teacher user or create default)
        instructor = db.query(User).filter(User.role == "teacher").first()
        if not instructor:
            instructor = db.query(User).first()
        
        if not instructor:
            print("No users found. Please create a user first.")
            return
        
        # Create the OSHA course
        osha_course = Course(
            title="OSHA Restaurant Employee Training - Missouri",
            description="Comprehensive OSHA-compliant training program for restaurant employees in Missouri. Covers workplace safety, food safety, and all required certifications for 2025 compliance.",
            category="Safety & Compliance",
            level=CourseLevel.BEGINNER,
            duration=40,  # Total hours
            thumbnail="🏥",
            rating=4.9,
            instructor_id=instructor.id
        )
        
        db.add(osha_course)
        db.commit()
        db.refresh(osha_course)
        
        print(f"Created OSHA course with ID: {osha_course.id}")
        
        # Create lessons for each module
        lessons_data = [
            # Module 1: General Workplace Safety
            {
                "title": "Introduction to OSHA & Employee Rights",
                "description": "Learn about OSHA regulations, employee rights, and workplace safety fundamentals. Understand your role in maintaining a safe restaurant environment.",
                "duration": 60,
                "order": 1,
                "video_url": "https://example.com/osha-intro"
            },
            {
                "title": "OSHA 10-Hour General Industry Training - Part 1",
                "description": "First part of comprehensive 10-hour OSHA training covering walking surfaces, exit routes, and emergency procedures.",
                "duration": 180,
                "order": 2,
                "video_url": "https://example.com/osha-10-part1"
            },
            {
                "title": "OSHA 10-Hour General Industry Training - Part 2",
                "description": "Continuation covering electrical safety, hazard communication, PPE, and materials handling.",
                "duration": 180,
                "order": 3,
                "video_url": "https://example.com/osha-10-part2"
            },
            {
                "title": "OSHA 10-Hour General Industry Training - Part 3",
                "description": "Final part covering machine guarding, ergonomics, and preventing repetitive motion injuries.",
                "duration": 240,
                "order": 4,
                "video_url": "https://example.com/osha-10-part3"
            },
            {
                "title": "Slip, Trip, and Fall Prevention",
                "description": "Learn proper cleaning procedures, use of wet floor signs, footwear requirements, and identifying hazards in the workplace.",
                "duration": 45,
                "order": 5,
                "video_url": "https://example.com/slip-prevention"
            },
            {
                "title": "Fire Safety and Emergency Procedures",
                "description": "Master fire extinguisher use, emergency evacuation procedures, and kitchen suppression systems. Includes fire drill protocols.",
                "duration": 90,
                "order": 6,
                "video_url": "https://example.com/fire-safety"
            },
            {
                "title": "Personal Protective Equipment (PPE)",
                "description": "Learn about cut-resistant gloves, heat protection, non-slip footwear, and proper maintenance of safety equipment.",
                "duration": 45,
                "order": 7,
                "video_url": "https://example.com/ppe-training"
            },
            {
                "title": "Electrical Safety in Restaurants",
                "description": "Identify electrical hazards, proper equipment use, water/electricity dangers, and lockout/tagout procedures.",
                "duration": 30,
                "order": 8,
                "video_url": "https://example.com/electrical-safety"
            },
            {
                "title": "Hazard Communication (HazCom)",
                "description": "Understand Safety Data Sheets (SDS), GHS labeling, chemical hazards, and emergency response to chemical exposure.",
                "duration": 90,
                "order": 9,
                "video_url": "https://example.com/hazcom"
            },
            
            # Module 2: Food Safety Training
            {
                "title": "ServSafe Food Handler Certification - Part 1",
                "description": "Begin your food handler certification covering foodborne illness prevention and basic food safety practices.",
                "duration": 90,
                "order": 10,
                "video_url": "https://example.com/servsafe-part1"
            },
            {
                "title": "ServSafe Food Handler Certification - Part 2",
                "description": "Continue certification training with personal hygiene, cross-contamination, and allergen awareness.",
                "duration": 90,
                "order": 11,
                "video_url": "https://example.com/servsafe-part2"
            },
            {
                "title": "Personal Hygiene Standards",
                "description": "Master proper handwashing techniques, glove use, hair restraints, and illness reporting requirements.",
                "duration": 30,
                "order": 12,
                "video_url": "https://example.com/hygiene"
            },
            {
                "title": "Cross-Contamination Prevention",
                "description": "Learn raw vs. cooked separation, color-coded equipment, food storage order, and allergen cross-contact prevention.",
                "duration": 45,
                "order": 13,
                "video_url": "https://example.com/cross-contamination"
            },
            {
                "title": "Time and Temperature Control",
                "description": "Understand temperature danger zones, proper cooking temps, cooling procedures, and thermometer calibration.",
                "duration": 60,
                "order": 14,
                "video_url": "https://example.com/temperature-control"
            },
            {
                "title": "Cleaning and Sanitation",
                "description": "Master three-compartment sink procedures, dishwasher operations, sanitizer testing, and cleaning schedules.",
                "duration": 60,
                "order": 15,
                "video_url": "https://example.com/cleaning-sanitation"
            },
            
            # Module 3: Additional Required Training
            {
                "title": "Bloodborne Pathogens",
                "description": "Learn universal precautions, proper cleanup procedures, PPE use, and exposure incident reporting.",
                "duration": 60,
                "order": 16,
                "video_url": "https://example.com/bloodborne-pathogens"
            },
            {
                "title": "Workplace Violence Prevention",
                "description": "Recognize warning signs, de-escalation techniques, robbery response, and active shooter preparedness.",
                "duration": 60,
                "order": 17,
                "video_url": "https://example.com/workplace-violence"
            },
            {
                "title": "Sexual Harassment Prevention",
                "description": "Understand harassment definitions, company policies, reporting procedures, and creating a respectful workplace.",
                "duration": 90,
                "order": 18,
                "video_url": "https://example.com/harassment-prevention"
            },
            {
                "title": "Respiratory Protection Program",
                "description": "Learn when respiratory protection is needed, types of respirators, fit testing, and maintenance procedures.",
                "duration": 90,
                "order": 19,
                "video_url": "https://example.com/respiratory-protection"
            },
            {
                "title": "Confined Space Training",
                "description": "Identify permit-required confined spaces, entry procedures, atmospheric testing, and emergency rescue.",
                "duration": 120,
                "order": 20,
                "video_url": "https://example.com/confined-space"
            },
            
            # Module 4: Implementation & Compliance
            {
                "title": "Recordkeeping and Documentation",
                "description": "Learn required training records, certificate maintenance, and inspection preparedness.",
                "duration": 45,
                "order": 21,
                "video_url": "https://example.com/recordkeeping"
            },
            {
                "title": "Missouri-Specific Requirements",
                "description": "Understand Missouri Department of Labor requirements, local county regulations, and state-specific compliance.",
                "duration": 60,
                "order": 22,
                "video_url": "https://example.com/missouri-requirements"
            },
            {
                "title": "Creating Your Training Schedule",
                "description": "Develop a 30-day onboarding plan, annual refresher calendar, and ongoing compliance schedule.",
                "duration": 45,
                "order": 23,
                "video_url": "https://example.com/training-schedule"
            },
            {
                "title": "Final Assessment and Certification",
                "description": "Complete comprehensive final exam covering all modules. Score 80% or higher to receive certification.",
                "duration": 90,
                "order": 24,
                "video_url": "https://example.com/final-assessment"
            }
        ]
        
        # Add all lessons to the database
        for lesson_data in lessons_data:
            lesson = Lesson(
                course_id=osha_course.id,
                **lesson_data
            )
            db.add(lesson)
        
        db.commit()
        print(f"Successfully added {len(lessons_data)} lessons to OSHA course")
        print("\n✅ OSHA Restaurant Training Course has been successfully integrated!")
        print(f"📚 Course ID: {osha_course.id}")
        print(f"👨‍🏫 Instructor: {instructor.full_name}")
        print(f"⏱️  Total Duration: {osha_course.duration} hours")
        print(f"📖 Total Lessons: {len(lessons_data)}")
        
    except Exception as e:
        print(f"Error seeding OSHA course: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting OSHA course seeding...")
    seed_osha_course()

