# Phishing and Scam Alert Training Course Integration

## Overview

This document describes the integration of the **Phishing and Scam Alert Training - Food Service** course into the EdApp educational platform. This comprehensive cybersecurity awareness training is specifically designed for the food service and hospitality industry.

## Course Details

- **Course ID:** 7
- **Title:** Phishing and Scam Alert Training - Food Service
- **Category:** Cybersecurity
- **Level:** Beginner
- **Duration:** 12 hours
- **Total Lessons:** 26
- **Rating:** 4.9/5.0
- **Instructor:** Security Experts
- **Thumbnail:** 🎣

## Course Structure

### Module 1: Phishing Fundamentals (45 minutes, 4 lessons)
- What is Phishing? Understanding the Threat
- Anatomy of a Phishing Email
- Beyond Email: SMS and Voice Phishing
- Stop, Verify, Report: Your Response Protocol

### Module 2: Industry-Specific Threats (120 minutes, 8 lessons)
- Invoice and Vendor Fraud Schemes
- POS System and Tech Support Scams
- Gift Card and Payment Scams
- Employment and Payroll Scams
- Delivery Platform and Online Order Scams
- Health Inspection and Compliance Scams
- Social Media and Review Scams
- Utility and Business Services Scams

### Module 3: Safe Digital Practices (45 minutes, 3 lessons)
- Email and Communication Security
- Password Security and Authentication
- Mobile Device and Wi-Fi Security

### Module 4: Incident Response and Reporting (30 minutes, 3 lessons)
- I've Been Phished - Immediate Actions
- Reporting Procedures and Escalation
- Post-Incident Actions and Recovery

### Module 5: Manager and Owner Advanced Training (90 minutes, 4 lessons)
- Building a Security-Aware Culture
- Technical Controls and Best Practices
- Security Policy Development
- Vendor and Third-Party Risk Management

### Module 6: Practical Exercises and Certification (125 minutes, 4 lessons)
- Phishing Email Identification Exercise
- Scenario-Based Response Training
- Creating Your Security Action Plan
- Final Assessment and Certification

## Files Created/Modified

### Backend Files

#### 1. Course Seed Script
**File:** `backend/app/seed_phishing_course.py`

This script seeds the phishing course into the database with all 26 lessons organized into 6 modules.

**Usage:**
```bash
cd backend
python -m app.seed_phishing_course
```

**Features:**
- Checks for existing course to prevent duplicates
- Creates course with proper metadata
- Adds all 26 lessons with accurate durations
- Provides detailed feedback on seeding process

### Frontend Files

#### 2. Courses Page
**File:** `frontend/app/courses/page.tsx`

**Changes:**
- Added phishing course to the course listing (ID: 7)
- Set as featured course
- Positioned at the top of the course list

#### 3. Course Detail Page
**File:** `frontend/app/courses/[id]/page.tsx`

**Changes:**
- Added complete course content for course ID 7
- Defined all 6 modules with their lessons
- Added phishing-specific certification information
- Updated sidebar to show course-specific features:
  - Dynamic lesson count
  - Real phishing examples and scenarios feature
  - Food service cybersecurity expert description
  - Beginner-friendly requirements

#### 4. Dashboard Page
**File:** `frontend/app/dashboard/page.tsx`

**Changes:**
- Added featured banner for phishing course
- Orange-red gradient design (from-orange-500 via-red-600 to-pink-600)
- "ESSENTIAL TRAINING" badge
- Shows 26 lessons, 12 hours, beginner-friendly
- Positioned between NIST and OSHA courses

### Documentation Files

#### 5. Training Plan Document
**File:** `Phishing_Scam_Alert_Training_Food_Service.md`

Comprehensive 800+ line training plan document including:
- Introduction to phishing and scams
- 8 common scams specific to food service
- 5 core training modules
- Role-based training paths
- Implementation schedule
- Assessment and certification details
- Incident response procedures
- Resources and tools

## Installation and Setup

### Step 1: Verify Files

Ensure all files are in place:
```bash
# Backend
ls backend/app/seed_phishing_course.py

# Frontend
ls frontend/app/courses/page.tsx
ls frontend/app/courses/[id]/page.tsx
ls frontend/app/dashboard/page.tsx

# Documentation
ls Phishing_Scam_Alert_Training_Food_Service.md
ls PHISHING_COURSE_INTEGRATION.md
```

### Step 2: Seed the Database

Run the seed script to add the course to your database:

```bash
# Navigate to backend directory
cd backend

# Run the seed script
python -m app.seed_phishing_course
```

**Expected Output:**
```
Starting Phishing and Scam Alert course seeding...
Created Phishing and Scam Alert course with ID: [course_id]
Successfully added 26 lessons to Phishing and Scam Alert course

✅ Phishing and Scam Alert Training Course has been successfully integrated!
📚 Course ID: [course_id]
👨‍🏫 Instructor ID: [instructor_id]
⏱️  Total Duration: 12 hours
📖 Total Lessons: 26
🎯 Target Industry: Food Service & Hospitality
🛡️  Protection Focus: Phishing, Scams, Social Engineering
```

### Step 3: Verify Frontend Integration

1. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Check the Dashboard:**
   - Navigate to `http://localhost:3000/dashboard`
   - You should see the orange-red phishing course banner between NIST and OSHA courses

3. **Check the Courses Page:**
   - Navigate to `http://localhost:3000/courses`
   - The phishing course should appear at the top of the course list
   - Filter by "Cybersecurity" category to see it alongside NIST

4. **Check Course Detail Page:**
   - Click on the phishing course
   - Navigate to `http://localhost:3000/courses/7`
   - Verify all 6 modules are displayed
   - Expand modules to see all 26 lessons
   - Check certification section shows phishing-specific certificates

### Step 4: Test Functionality

1. **Course Navigation:**
   - Click "Start Course" on dashboard banner
   - Click course card on courses page
   - Verify both navigate to course detail page

2. **Module Expansion:**
   - Click on each module header to expand/collapse
   - Verify all lessons are displayed correctly

3. **Responsive Design:**
   - Test on different screen sizes
   - Verify mobile-friendly layout

## Course Content Highlights

### What Makes This Course Unique

1. **Industry-Specific:**
   - Tailored exclusively for food service and hospitality
   - Real examples from restaurants, cafes, catering services
   - Covers unique threats like POS scams and delivery platform fraud

2. **Practical and Actionable:**
   - Real phishing email examples
   - Step-by-step response procedures
   - Interactive scenario-based training
   - Customizable security action plans

3. **Role-Based Training:**
   - Front-line staff (1.5 hours)
   - Shift supervisors (2.5 hours)
   - Managers and owners (4 hours)
   - Bookkeepers and office staff (3 hours)

4. **Comprehensive Coverage:**
   - Email, SMS, and voice phishing
   - 8 common food service scams
   - Password and mobile security
   - Incident response and reporting
   - Manager-level policy development

5. **Certification Path:**
   - Phishing Awareness Certificate
   - Food Service Cyber Security Certificate
   - Industry-Specific Scam Recognition
   - Valid for 1 year with quarterly refreshers

## Key Features

### For Employees:
- ✅ Recognize phishing attempts
- ✅ Protect customer payment data
- ✅ Respond correctly to suspicious communications
- ✅ Report security incidents properly

### For Managers:
- ✅ Build security-aware culture
- ✅ Implement technical controls
- ✅ Develop security policies
- ✅ Manage vendor risks

### For Owners:
- ✅ Reduce cyber risk exposure
- ✅ Protect business finances
- ✅ Ensure staff preparedness
- ✅ Create comprehensive security programs

## Certifications Offered

Upon completion with 80% or higher on the final assessment:

1. **Phishing Awareness Certificate**
   - Demonstrates recognition of phishing threats
   - Valid for 1 year

2. **Food Service Cyber Security Certificate**
   - Shows industry-specific security competency
   - Recognized credential for restaurant staff

3. **Industry-Specific Scam Recognition**
   - Proves understanding of food service threats
   - Covers all 8 common scam types

## Related Resources

- **Training Plan Document:** `Phishing_Scam_Alert_Training_Food_Service.md`
- **NIST CSF Training:** For advanced cybersecurity framework
- **OSHA Training:** For complementary workplace safety

## Maintenance and Updates

### Quarterly Updates Recommended:
- New phishing examples
- Emerging scam tactics
- Updated threat statistics
- Refresher training materials

### Annual Review:
- Course content relevance
- Student feedback integration
- Certification requirements
- Industry trend alignment

## Support and Questions

For issues or questions about the phishing course integration:

1. **Backend Issues:**
   - Check database connection
   - Verify user/instructor exists
   - Review seed script output

2. **Frontend Issues:**
   - Clear browser cache
   - Check course ID consistency (should be '7')
   - Verify all modules have lessons

3. **Content Updates:**
   - Modify `seed_phishing_course.py` for backend
   - Update course detail page for frontend
   - Keep training plan document synchronized

## Success Metrics

Track these metrics to measure course effectiveness:

- **Enrollment Rate:** Target 100% of food service staff
- **Completion Rate:** Target 90%+ completion
- **Assessment Scores:** Target 85%+ average
- **Phishing Simulation:** Target 70%+ detection rate
- **Incident Reduction:** Track security incident trends

## Conclusion

The Phishing and Scam Alert Training course has been successfully integrated into the EdApp platform, providing comprehensive cybersecurity awareness training specifically designed for the food service industry. The course covers all aspects of phishing recognition, scam prevention, and incident response, with a focus on real-world threats facing restaurants and hospitality businesses.

---

**Integration Date:** November 2025  
**Version:** 1.0  
**Status:** ✅ Complete and Ready for Use

## Quick Start Checklist

- [ ] Verify all files are present
- [ ] Run backend seed script
- [ ] Confirm database entries created
- [ ] Test frontend dashboard displays course
- [ ] Test courses page shows phishing course
- [ ] Test course detail page loads correctly
- [ ] Verify all 26 lessons are accessible
- [ ] Test responsive design on mobile
- [ ] Review training plan document
- [ ] Set up quarterly update schedule

**🎉 Course successfully integrated and ready for student enrollment!**

