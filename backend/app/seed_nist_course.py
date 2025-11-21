"""
Script to seed NIST Cybersecurity Framework 2.0 Course into the database
Run this script to add the NIST CSF training course with all modules and lessons
"""

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.course import Course, Lesson, CourseLevel
from app.models.user import User

def seed_nist_course():
    """Seed NIST Cybersecurity Framework 2.0 Course"""
    db = SessionLocal()
    
    try:
        # Check if course already exists
        existing_course = db.query(Course).filter(
            Course.title == "NIST Cybersecurity Framework 2.0 Training"
        ).first()
        
        if existing_course:
            print("NIST CSF course already exists. Skipping...")
            return
        
        # Get instructor
        instructor = db.query(User).filter(User.role == "teacher").first()
        if not instructor:
            instructor = db.query(User).first()
        
        if not instructor:
            print("No users found. Please create a user first.")
            return
        
        # Create the NIST CSF course
        nist_course = Course(
            title="NIST Cybersecurity Framework 2.0 Training",
            description="Comprehensive training on NIST CSF 2.0 covering all six core functions: Govern, Identify, Protect, Detect, Respond, and Recover. Master cybersecurity risk management and framework implementation.",
            category="Cybersecurity",
            level=CourseLevel.INTERMEDIATE,
            duration=44,  # Total hours
            thumbnail="🔐",
            rating=4.9,
            instructor_id=instructor.id
        )
        
        db.add(nist_course)
        db.commit()
        db.refresh(nist_course)
        
        print(f"Created NIST CSF course with ID: {nist_course.id}")
        
        # Create lessons for each module
        lessons_data = [
            # Module 1: GOVERN (GV)
            {
                "title": "Cybersecurity Governance Fundamentals",
                "description": "Understand the role of governance in cybersecurity, establish organizational context, and align security objectives with business goals.",
                "duration": 90,
                "order": 1,
                "video_url": "https://example.com/nist-govern-fundamentals"
            },
            {
                "title": "Cybersecurity Supply Chain Risk Management",
                "description": "Manage cybersecurity risks in supply chains, establish third-party risk assessment processes, and implement supplier security requirements.",
                "duration": 90,
                "order": 2,
                "video_url": "https://example.com/nist-supply-chain"
            },
            {
                "title": "Cybersecurity Roles and Workforce Management",
                "description": "Define cybersecurity roles and responsibilities, establish accountability frameworks, and develop workforce planning strategies.",
                "duration": 90,
                "order": 3,
                "video_url": "https://example.com/nist-roles-workforce"
            },
            {
                "title": "Oversight and Continuous Improvement",
                "description": "Establish oversight mechanisms, monitor cybersecurity performance, and implement continuous improvement processes.",
                "duration": 90,
                "order": 4,
                "video_url": "https://example.com/nist-oversight"
            },
            
            # Module 2: IDENTIFY (ID)
            {
                "title": "Asset Management",
                "description": "Identify and document organizational assets, classify by criticality, and maintain accurate asset inventories.",
                "duration": 90,
                "order": 5,
                "video_url": "https://example.com/nist-asset-management"
            },
            {
                "title": "Business Environment Analysis",
                "description": "Understand organizational mission and objectives, identify critical business functions and dependencies.",
                "duration": 90,
                "order": 6,
                "video_url": "https://example.com/nist-business-environment"
            },
            {
                "title": "Governance and Risk Management Strategy",
                "description": "Establish risk management policies, implement risk assessment processes, and define risk appetite.",
                "duration": 90,
                "order": 7,
                "video_url": "https://example.com/nist-risk-strategy"
            },
            {
                "title": "Risk Assessment Methodologies",
                "description": "Conduct comprehensive risk assessments, identify threats and vulnerabilities, and prioritize risks.",
                "duration": 120,
                "order": 8,
                "video_url": "https://example.com/nist-risk-assessment"
            },
            {
                "title": "Supply Chain Risk Identification",
                "description": "Identify supply chain risks, establish supplier security requirements, and monitor third-party security.",
                "duration": 90,
                "order": 9,
                "video_url": "https://example.com/nist-supply-chain-risk"
            },
            
            # Module 3: PROTECT (PR)
            {
                "title": "Identity Management and Access Control",
                "description": "Implement IAM solutions, establish authentication controls, and manage privileged access.",
                "duration": 120,
                "order": 10,
                "video_url": "https://example.com/nist-iam"
            },
            {
                "title": "Security Awareness and Training Programs",
                "description": "Develop security awareness programs, train users on policies, and foster security culture.",
                "duration": 90,
                "order": 11,
                "video_url": "https://example.com/nist-awareness"
            },
            {
                "title": "Data Security and Protection",
                "description": "Protect data at rest and in transit, implement data loss prevention, and manage encryption.",
                "duration": 120,
                "order": 12,
                "video_url": "https://example.com/nist-data-security"
            },
            {
                "title": "Information Protection Processes",
                "description": "Establish configuration management, implement change control, and manage backups.",
                "duration": 90,
                "order": 13,
                "video_url": "https://example.com/nist-info-protection"
            },
            {
                "title": "Maintenance and Protective Technology",
                "description": "Implement protective technologies, manage system maintenance, and deploy security tools.",
                "duration": 90,
                "order": 14,
                "video_url": "https://example.com/nist-protective-tech"
            },
            {
                "title": "Secure Software Development Lifecycle",
                "description": "Integrate security into SDLC, implement secure coding practices, and conduct security testing.",
                "duration": 90,
                "order": 15,
                "video_url": "https://example.com/nist-secure-sdlc"
            },
            
            # Module 4: DETECT (DE)
            {
                "title": "Anomalies and Events Detection",
                "description": "Establish baseline network behavior, detect anomalous activity, and analyze security events.",
                "duration": 90,
                "order": 16,
                "video_url": "https://example.com/nist-anomalies"
            },
            {
                "title": "Continuous Security Monitoring",
                "description": "Implement continuous monitoring solutions, monitor network environments, and track personnel activity.",
                "duration": 120,
                "order": 17,
                "video_url": "https://example.com/nist-monitoring"
            },
            {
                "title": "Detection Processes and Procedures",
                "description": "Establish detection procedures, test detection capabilities, and communicate detection information.",
                "duration": 90,
                "order": 18,
                "video_url": "https://example.com/nist-detection-processes"
            },
            
            # Module 5: RESPOND (RS)
            {
                "title": "Incident Response Planning",
                "description": "Develop incident response plans, establish response procedures, and define roles.",
                "duration": 90,
                "order": 19,
                "video_url": "https://example.com/nist-response-planning"
            },
            {
                "title": "Incident Communications Management",
                "description": "Establish incident communication procedures, coordinate with stakeholders, and manage external communications.",
                "duration": 90,
                "order": 20,
                "video_url": "https://example.com/nist-incident-comms"
            },
            {
                "title": "Incident Analysis and Forensics",
                "description": "Analyze incident data, understand attack vectors, and conduct forensic investigations.",
                "duration": 120,
                "order": 21,
                "video_url": "https://example.com/nist-incident-analysis"
            },
            {
                "title": "Incident Mitigation Techniques",
                "description": "Contain and eradicate incidents, prevent incident expansion, and mitigate vulnerabilities.",
                "duration": 90,
                "order": 22,
                "video_url": "https://example.com/nist-mitigation"
            },
            {
                "title": "Response Improvements and Lessons Learned",
                "description": "Incorporate lessons learned, update response plans, and enhance detection capabilities.",
                "duration": 90,
                "order": 23,
                "video_url": "https://example.com/nist-response-improvements"
            },
            
            # Module 6: RECOVER (RC)
            {
                "title": "Recovery Planning and Strategies",
                "description": "Develop recovery plans, establish recovery priorities, and define recovery objectives (RTO/RPO).",
                "duration": 120,
                "order": 24,
                "video_url": "https://example.com/nist-recovery-planning"
            },
            {
                "title": "Recovery Improvements and Testing",
                "description": "Incorporate recovery lessons learned, update recovery plans, and enhance resilience capabilities.",
                "duration": 90,
                "order": 25,
                "video_url": "https://example.com/nist-recovery-improvements"
            },
            {
                "title": "Recovery Communications and Coordination",
                "description": "Manage recovery communications, coordinate with stakeholders, and provide status updates.",
                "duration": 90,
                "order": 26,
                "video_url": "https://example.com/nist-recovery-comms"
            },
            
            # Implementation and Certification
            {
                "title": "NIST CSF Implementation Roadmap",
                "description": "Learn how to create a comprehensive implementation plan for your organization, including gap analysis and prioritization.",
                "duration": 120,
                "order": 27,
                "video_url": "https://example.com/nist-implementation"
            },
            {
                "title": "Framework Profiles and Maturity Assessment",
                "description": "Create current and target profiles, assess organizational maturity, and measure progress.",
                "duration": 90,
                "order": 28,
                "video_url": "https://example.com/nist-profiles"
            },
            {
                "title": "Integration with Other Frameworks",
                "description": "Learn how to integrate NIST CSF with ISO 27001, CIS Controls, and other cybersecurity frameworks.",
                "duration": 90,
                "order": 29,
                "video_url": "https://example.com/nist-integration"
            },
            {
                "title": "Final Comprehensive Assessment",
                "description": "Complete comprehensive exam covering all six core functions. Score 85% or higher to receive NIST CSF Professional certification.",
                "duration": 180,
                "order": 30,
                "video_url": "https://example.com/nist-final-exam"
            }
        ]
        
        # Add all lessons to the database
        for lesson_data in lessons_data:
            lesson = Lesson(
                course_id=nist_course.id,
                **lesson_data
            )
            db.add(lesson)
        
        db.commit()
        print(f"Successfully added {len(lessons_data)} lessons to NIST CSF course")
        print("\n✅ NIST Cybersecurity Framework 2.0 Course has been successfully integrated!")
        print(f"📚 Course ID: {nist_course.id}")
        print(f"👨‍🏫 Instructor ID: {instructor.id}")
        print(f"⏱️  Total Duration: {nist_course.duration} hours")
        print(f"📖 Total Lessons: {len(lessons_data)}")
        print(f"🔐 Framework Functions: Govern, Identify, Protect, Detect, Respond, Recover")
        
    except Exception as e:
        print(f"Error seeding NIST CSF course: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting NIST CSF 2.0 course seeding...")
    seed_nist_course()




