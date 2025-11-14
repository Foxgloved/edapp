"""
Script to seed Phishing and Scam Alert Training Course into the database
Run this script to add the phishing awareness training course with all modules and lessons
"""

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.course import Course, Lesson, CourseLevel
from app.models.user import User

def seed_phishing_course():
    """Seed Phishing and Scam Alert Training Course"""
    db = SessionLocal()
    
    try:
        # Check if course already exists
        existing_course = db.query(Course).filter(
            Course.title == "Phishing and Scam Alert Training - Food Service"
        ).first()
        
        if existing_course:
            print("Phishing and Scam Alert course already exists. Skipping...")
            return
        
        # Get instructor
        instructor = db.query(User).filter(User.role == "teacher").first()
        if not instructor:
            instructor = db.query(User).first()
        
        if not instructor:
            print("No users found. Please create a user first.")
            return
        
        # Create the Phishing and Scam Alert course
        phishing_course = Course(
            title="Phishing and Scam Alert Training - Food Service",
            description="Comprehensive phishing and scam awareness training designed specifically for food service businesses. Learn to recognize and prevent cyber threats, protect payment systems, and respond to social engineering attacks targeting restaurants and hospitality operations.",
            category="Cybersecurity",
            level=CourseLevel.BEGINNER,
            duration=12,  # Total hours (2-4 initial + quarterly refreshers)
            thumbnail="🎣",
            rating=4.9,
            instructor_id=instructor.id
        )
        
        db.add(phishing_course)
        db.commit()
        db.refresh(phishing_course)
        
        print(f"Created Phishing and Scam Alert course with ID: {phishing_course.id}")
        
        # Create lessons for each module
        lessons_data = [
            # Module 1: Phishing Fundamentals
            {
                "title": "What is Phishing? Understanding the Threat",
                "description": "Learn what phishing is, why food service businesses are targeted, and the real costs of successful attacks. Understand different types of phishing: email, SMS (smishing), voice (vishing), and social engineering.",
                "duration": 10,
                "order": 1,
                "video_url": "https://example.com/phishing-intro"
            },
            {
                "title": "Anatomy of a Phishing Email",
                "description": "Deconstruct real phishing examples to identify red flags. Learn to spot suspicious sender addresses, fake urgency tactics, malicious links, and dangerous attachments.",
                "duration": 15,
                "order": 2,
                "video_url": "https://example.com/phishing-email-anatomy"
            },
            {
                "title": "Beyond Email: SMS and Voice Phishing",
                "description": "Recognize smishing (text message) and vishing (voice call) attacks. Learn about social media phishing and in-person social engineering tactics.",
                "duration": 10,
                "order": 3,
                "video_url": "https://example.com/smishing-vishing"
            },
            {
                "title": "Stop, Verify, Report: Your Response Protocol",
                "description": "Master the critical steps to take when you encounter suspected phishing. Learn who to contact, how to report, and when to escalate.",
                "duration": 10,
                "order": 4,
                "video_url": "https://example.com/response-protocol"
            },
            
            # Module 2: Industry-Specific Threats
            {
                "title": "Invoice and Vendor Fraud Schemes",
                "description": "Deep dive into how criminals impersonate suppliers and redirect payments. Learn verification procedures to protect your business from fake invoices and payment scams.",
                "duration": 15,
                "order": 5,
                "video_url": "https://example.com/vendor-fraud"
            },
            {
                "title": "POS System and Tech Support Scams",
                "description": "Understand how scammers impersonate POS providers and IT support. Learn to verify tech support requests and protect customer payment data from remote access attacks.",
                "duration": 15,
                "order": 6,
                "video_url": "https://example.com/pos-scams"
            },
            {
                "title": "Gift Card and Payment Scams",
                "description": "Recognize executive impersonation (CEO fraud) and gift card payment schemes. Learn why legitimate businesses never use gift cards for payment and how to verify unusual requests.",
                "duration": 15,
                "order": 7,
                "video_url": "https://example.com/gift-card-scams"
            },
            {
                "title": "Employment and Payroll Scams",
                "description": "Protect employee information from W-2 phishing and payroll fraud. Learn to identify fake job applications and secure direct deposit changes.",
                "duration": 15,
                "order": 8,
                "video_url": "https://example.com/payroll-scams"
            },
            {
                "title": "Delivery Platform and Online Order Scams",
                "description": "Recognize scams targeting DoorDash, Uber Eats, and Grubhub accounts. Learn to protect your restaurant's delivery platform credentials and payment information.",
                "duration": 15,
                "order": 9,
                "video_url": "https://example.com/delivery-scams"
            },
            {
                "title": "Health Inspection and Compliance Scams",
                "description": "Identify fake health inspectors and regulatory scams. Learn how legitimate agencies operate and how to verify official communications.",
                "duration": 10,
                "order": 10,
                "video_url": "https://example.com/compliance-scams"
            },
            {
                "title": "Social Media and Review Scams",
                "description": "Recognize review extortion and social media account takeover attempts. Learn to protect your business's online reputation and social media accounts.",
                "duration": 10,
                "order": 11,
                "video_url": "https://example.com/social-media-scams"
            },
            {
                "title": "Utility and Business Services Scams",
                "description": "Understand disconnection threats and utility impersonation scams. Learn verification procedures to avoid panic-induced payments during busy service hours.",
                "duration": 10,
                "order": 12,
                "video_url": "https://example.com/utility-scams"
            },
            
            # Module 3: Safe Digital Practices
            {
                "title": "Email and Communication Security",
                "description": "Master safe email practices: verifying sender identities, handling links and attachments safely, and using secure communication channels for sensitive information.",
                "duration": 15,
                "order": 13,
                "video_url": "https://example.com/email-security"
            },
            {
                "title": "Password Security and Authentication",
                "description": "Create strong, unique passwords for each account. Learn to use password managers and enable two-factor authentication (2FA) on all business systems.",
                "duration": 15,
                "order": 14,
                "video_url": "https://example.com/password-security"
            },
            {
                "title": "Mobile Device and Wi-Fi Security",
                "description": "Secure smartphones and tablets used for business. Understand the risks of public Wi-Fi and learn to separate guest and business networks properly.",
                "duration": 15,
                "order": 15,
                "video_url": "https://example.com/mobile-security"
            },
            
            # Module 4: Incident Response and Reporting
            {
                "title": "I've Been Phished - Immediate Actions",
                "description": "Step-by-step guide for what to do if you clicked a phishing link or provided information. Learn the critical first actions to minimize damage.",
                "duration": 10,
                "order": 16,
                "video_url": "https://example.com/immediate-response"
            },
            {
                "title": "Reporting Procedures and Escalation",
                "description": "Learn who to contact for different types of security incidents, what information to include in reports, and when to escalate to authorities.",
                "duration": 10,
                "order": 17,
                "video_url": "https://example.com/reporting-procedures"
            },
            {
                "title": "Post-Incident Actions and Recovery",
                "description": "Understand post-incident procedures including credit monitoring, account monitoring, and learning from security events to improve protection.",
                "duration": 10,
                "order": 18,
                "video_url": "https://example.com/post-incident"
            },
            
            # Module 5: Manager and Owner Advanced Training
            {
                "title": "Building a Security-Aware Culture",
                "description": "Learn to lead by example and create a workplace culture where security is everyone's responsibility. Celebrate security-conscious behavior.",
                "duration": 20,
                "order": 19,
                "video_url": "https://example.com/security-culture"
            },
            {
                "title": "Technical Controls and Best Practices",
                "description": "Implement email filtering, spam protection, two-factor authentication, and network segmentation to protect your business infrastructure.",
                "duration": 25,
                "order": 20,
                "video_url": "https://example.com/technical-controls"
            },
            {
                "title": "Security Policy Development",
                "description": "Create payment authorization policies, vendor verification procedures, social media guidelines, and incident response plans for your restaurant.",
                "duration": 25,
                "order": 21,
                "video_url": "https://example.com/policy-development"
            },
            {
                "title": "Vendor and Third-Party Risk Management",
                "description": "Evaluate vendor security practices, establish contract security requirements, and maintain secure communication channels with suppliers.",
                "duration": 20,
                "order": 22,
                "video_url": "https://example.com/vendor-risk"
            },
            
            # Practical Exercises and Certification
            {
                "title": "Phishing Email Identification Exercise",
                "description": "Interactive exercise: Review 10 sample emails and identify which are legitimate vs phishing. Practice your detection skills with real-world examples.",
                "duration": 20,
                "order": 23,
                "video_url": "https://example.com/email-exercise"
            },
            {
                "title": "Scenario-Based Response Training",
                "description": "Work through realistic food service security scenarios: vendor calls, suspicious texts from 'the boss', tech support requests, and more. Practice making the right decisions under pressure.",
                "duration": 30,
                "order": 24,
                "video_url": "https://example.com/scenario-training"
            },
            {
                "title": "Creating Your Security Action Plan",
                "description": "Develop a customized security action plan for your restaurant including contact lists, verification procedures, and incident response workflows.",
                "duration": 30,
                "order": 25,
                "video_url": "https://example.com/action-plan"
            },
            {
                "title": "Final Assessment and Certification",
                "description": "Complete the comprehensive assessment covering all modules. Score 80% or higher to receive your Phishing Awareness Certificate and demonstrate food service cyber security competency.",
                "duration": 45,
                "order": 26,
                "video_url": "https://example.com/final-assessment"
            }
        ]
        
        # Add all lessons to the database
        for lesson_data in lessons_data:
            lesson = Lesson(
                course_id=phishing_course.id,
                **lesson_data
            )
            db.add(lesson)
        
        db.commit()
        print(f"Successfully added {len(lessons_data)} lessons to Phishing and Scam Alert course")
        print("\n✅ Phishing and Scam Alert Training Course has been successfully integrated!")
        print(f"📚 Course ID: {phishing_course.id}")
        print(f"👨‍🏫 Instructor ID: {instructor.id}")
        print(f"⏱️  Total Duration: {phishing_course.duration} hours")
        print(f"📖 Total Lessons: {len(lessons_data)}")
        print(f"🎯 Target Industry: Food Service & Hospitality")
        print(f"🛡️  Protection Focus: Phishing, Scams, Social Engineering")
        
    except Exception as e:
        print(f"Error seeding Phishing and Scam Alert course: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting Phishing and Scam Alert course seeding...")
    seed_phishing_course()

