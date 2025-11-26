# Certificate Feature - Quick Start Guide

## Installation

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
pip install -r requirements.txt

# Create certificates table
cd app
python create_certificates_table.py

# Start the backend server
cd ..
python run.py
```

Backend will be running at: `http://localhost:8000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install new dependencies (html2canvas)
npm install

# Start the frontend server
npm run dev
```

Frontend will be running at: `http://localhost:3000`

## Quick Test

### Method 1: Using the UI

1. **Login to the application**
   - Go to `http://localhost:3000`
   - Login with your credentials

2. **Navigate to a course**
   - Go to "My Courses"
   - Click on any course

3. **Simulate Course Completion** (For Testing)
   - In the course detail page, you can manually set course progress to 100% in the database
   - Or complete all lessons naturally

4. **Generate Certificate**
   - Once course is 100% complete
   - Click "Generate Certificate" button
   - Certificate will be created instantly

5. **View Certificate**
   - Click "View Certificate" to see the full certificate
   - Click "Download Certificate" to save as PNG
   - Click "Share" to share via native dialog

6. **View All Certificates**
   - Click on your profile menu (top right)
   - Select "My Certificates"
   - See all your earned certificates

### Method 2: Using the API

#### Generate a Certificate
```bash
# Replace {course_id} with actual course ID (e.g., 5, 6, or 7)
# Replace {token} with your JWT token

curl -X POST http://localhost:8000/api/certificates/generate/{course_id} \
  -H "Authorization: Bearer {token}"
```

#### Get All Certificates
```bash
curl http://localhost:8000/api/certificates/ \
  -H "Authorization: Bearer {token}"
```

#### Verify a Certificate
```bash
# Replace {certificate_number} with actual certificate number
curl http://localhost:8000/api/certificates/verify/{certificate_number}
```

## Manual Database Setup (For Testing)

If you want to quickly test certificate generation:

### 1. Set Course Progress to 100%

```sql
-- Update enrollment progress to 100% for a specific user and course
UPDATE enrollments 
SET progress_percentage = 100.0, 
    completed_at = CURRENT_TIMESTAMP 
WHERE user_id = {user_id} AND course_id = {course_id};
```

### 2. Verify Enrollment Exists

```sql
-- Check if user is enrolled
SELECT * FROM enrollments 
WHERE user_id = {user_id} AND course_id = {course_id};
```

### 3. Manually Create Certificate (Alternative)

```sql
-- Insert a certificate directly
INSERT INTO certificates (
  user_id, 
  course_id, 
  certificate_number, 
  issued_at, 
  completed_at, 
  instructor_name, 
  course_title, 
  student_name, 
  grade
) VALUES (
  {user_id},
  {course_id},
  'CERT-20250121-' || substr(md5(random()::text), 1, 8),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Instructor Name',
  'Course Title',
  'Student Name',
  'Pass'
);
```

## Available Courses

The app comes with three pre-seeded courses:

1. **Course ID: 5** - OSHA Restaurant Employee Training
2. **Course ID: 6** - NIST Cybersecurity Framework 2.0
3. **Course ID: 7** - Phishing and Scam Alert Training

## API Endpoints

### Certificate Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/certificates/` | Required | Get all user certificates |
| GET | `/api/certificates/{id}` | Required | Get specific certificate |
| POST | `/api/certificates/generate/{course_id}` | Required | Generate certificate |
| GET | `/api/certificates/course/{course_id}` | Required | Get certificate by course |
| GET | `/api/certificates/verify/{cert_number}` | Public | Verify certificate |

### Course Endpoints (Updated)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/courses/{id}` | Required | Get course with certificate info |

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/certificates` | View all certificates |
| `/certificates/{id}` | View specific certificate |
| `/courses/{id}` | Course detail with certificate status |

## Troubleshooting

### "Certificate not found"
- Ensure you've generated the certificate first
- Check that course progress is 100%
- Verify you're enrolled in the course

### "Failed to generate certificate"
- Check course completion: `progress_percentage` must be 100
- Verify enrollment exists
- Check backend logs for detailed errors

### Download not working
- Install html2canvas: `npm install`
- Clear browser cache
- Check browser console for errors

### Database errors
- Run table creation: `python app/create_certificates_table.py`
- Check database connection
- Verify all tables exist

## Testing Checklist

- [ ] Backend server running
- [ ] Frontend server running
- [ ] User is logged in
- [ ] User is enrolled in a course
- [ ] Course progress is 100%
- [ ] Certificate generated successfully
- [ ] Certificate displays correctly
- [ ] Certificate can be downloaded
- [ ] All certificates page shows certificates
- [ ] Navigation link works in header

## Next Steps

After setup, you can:

1. **Customize Certificate Design**
   - Edit `/frontend/components/Certificate.tsx`
   - Modify colors, layout, fonts

2. **Add More Validation**
   - Edit `/backend/app/api/certificates.py`
   - Add custom validation rules

3. **Extend Features**
   - Add PDF export
   - Add email delivery
   - Add QR codes
   - Add blockchain verification

## Support

For detailed documentation, see `CERTIFICATE_FEATURE.md`

For API documentation, visit: `http://localhost:8000/docs`




