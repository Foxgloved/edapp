# Certificate Feature Documentation

## Overview
The certificate system allows students to generate, view, and download certificates upon completing courses. Certificates include course details, completion dates, instructor information, and unique certificate numbers for verification.

## Features

### 1. **Certificate Generation**
- Automatically generates certificates when a course reaches 100% completion
- Unique certificate number for each certificate (format: `CERT-YYYYMMDD-XXXXXXXX`)
- Includes student name, course title, instructor name, completion date, and grade

### 2. **Certificate Viewing**
- Beautiful, professional certificate design
- Decorative elements and styling
- Displays all certificate details including:
  - Certificate number
  - Student name
  - Course title
  - Instructor signature
  - Completion date
  - Issue date
  - Grade (if applicable)
  - Course duration and category

### 3. **Certificate Download**
- Download certificates as PNG images
- High-quality rendering (2x scale)
- Uses html2canvas for client-side image generation

### 4. **Certificate Verification**
- Public verification endpoint
- Verify certificates using certificate number
- No authentication required for verification

## Backend Implementation

### Database Models

#### Certificate Model
```python
- id: Integer (Primary Key)
- user_id: Integer (Foreign Key to users)
- course_id: Integer (Foreign Key to courses)
- certificate_number: String (Unique, Indexed)
- issued_at: DateTime
- completed_at: DateTime
- instructor_name: String
- course_title: String
- student_name: String
- grade: String (Optional)
```

### API Endpoints

#### Get All Certificates
```
GET /api/certificates/
Authentication: Required
Returns: List of user's certificates
```

#### Get Specific Certificate
```
GET /api/certificates/{certificate_id}
Authentication: Required
Returns: Certificate details with course information
```

#### Generate Certificate
```
POST /api/certificates/generate/{course_id}
Authentication: Required
Requirements: 
  - User must be enrolled in the course
  - Course must be 100% complete
Returns: Generated certificate
```

#### Get Certificate by Course
```
GET /api/certificates/course/{course_id}
Authentication: Required
Returns: Certificate for specific course (if exists)
```

#### Verify Certificate
```
GET /api/certificates/verify/{certificate_number}
Authentication: Not Required (Public)
Returns: Certificate details for verification
```

### Updated Course API

#### Get Course with Certificate Info
```
GET /api/courses/{course_id}
Authentication: Required
Returns: Course details including:
  - has_certificate: Boolean
  - certificate_id: Integer (if exists)
  - enrollment_progress: Float
  - is_enrolled: Boolean
```

## Frontend Implementation

### Components

#### Certificate Component
Location: `/frontend/components/Certificate.tsx`

Features:
- Professional certificate design
- Download functionality
- Share functionality
- Responsive design
- Decorative elements

Props:
```typescript
{
  certificateNumber: string
  studentName: string
  courseTitle: string
  instructorName: string
  completedAt: string
  issuedAt: string
  grade?: string
  courseDuration?: number
  courseCategory?: string
}
```

### Pages

#### Certificates List Page
Location: `/frontend/app/certificates/page.tsx`

Features:
- Display all earned certificates
- Statistics dashboard (total certificates, courses completed, achievements)
- Empty state with link to courses
- Loading states
- Certificate cards with preview

#### Individual Certificate View Page
Location: `/frontend/app/certificates/[id]/page.tsx`

Features:
- Full certificate display
- Download button
- Share button
- Back navigation

### Course Detail Page Integration
Location: `/frontend/app/courses/[id]/page.tsx`

Features:
- Shows certificate status if earned
- "Generate Certificate" button when course is completed
- Links to view certificate
- Certificate generation with API integration

### Navigation
- Added "My Certificates" link to header profile menu
- Quick access to certificates from anywhere in the app

## Installation & Setup

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Create Certificates Table**
   ```bash
   cd backend/app
   python create_certificates_table.py
   ```
   
   Or use the main table creation script:
   ```bash
   python -m app.create_tables
   ```

3. **Start Backend Server**
   ```bash
   python run.py
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```
   
   This will install html2canvas and other required dependencies.

2. **Start Frontend Server**
   ```bash
   npm run dev
   ```

## Usage

### For Students

1. **Complete a Course**
   - Enroll in a course
   - Complete all lessons (100% progress)

2. **Generate Certificate**
   - Navigate to the completed course page
   - Click "Generate Certificate" button
   - Certificate is automatically created

3. **View Certificates**
   - Click profile menu → "My Certificates"
   - Or visit `/certificates` directly
   - Click on any certificate to view full details

4. **Download Certificate**
   - Open certificate detail page
   - Click "Download Certificate" button
   - Certificate is saved as PNG image

5. **Share Certificate**
   - Open certificate detail page
   - Click "Share" button
   - Share via native share dialog or copy link

### For Verification

Anyone can verify a certificate:
1. Use the certificate number
2. Access: `/api/certificates/verify/{certificate_number}`
3. Returns certificate details if valid

## API Usage Examples

### Generate Certificate
```javascript
import { api } from '@/lib/api';

// Generate certificate for course
const certificate = await api.generateCertificate('5');
```

### Get All Certificates
```javascript
// Get user's certificates
const certificates = await api.getCertificates();
```

### Get Certificate by Course
```javascript
// Check if certificate exists for course
const certificate = await api.getCertificateByCourse('5');
```

### Verify Certificate
```javascript
// Verify certificate by number
const certificate = await api.verifyCertificate('CERT-20250121-A1B2C3D4');
```

## Certificate Grading

Certificates include a grade based on completion percentage:
- **Excellent**: 95-100%
- **Very Good**: 90-94%
- **Pass**: < 90%

This logic can be customized in the backend API.

## Security Features

1. **Certificate Number Generation**
   - Uses cryptographically secure random tokens
   - Timestamp-based prefix
   - Format: `CERT-YYYYMMDD-XXXXXXXX`

2. **Access Control**
   - Users can only generate certificates for courses they completed
   - Users can only view their own certificates (except verification endpoint)
   - Certificate generation validates enrollment and completion status

3. **Data Integrity**
   - Certificate details stored in database
   - Cannot be modified after generation
   - Unique certificate numbers prevent duplicates

## Customization

### Styling
Edit `/frontend/components/Certificate.tsx` to customize:
- Colors and gradients
- Layout and spacing
- Fonts and typography
- Decorative elements

### Grading Logic
Edit `/backend/app/api/certificates.py` in `generate_certificate()` function to customize:
- Grade thresholds
- Grade names
- Grading criteria

### Certificate Content
Modify the Certificate component to add/remove:
- Additional fields
- Logos or images
- QR codes
- Signatures

## Troubleshooting

### Certificate Won't Generate
- Ensure course progress is 100%
- Verify user is enrolled in the course
- Check backend logs for errors

### Download Not Working
- Ensure html2canvas is installed
- Check browser console for errors
- Verify browser supports canvas API

### Certificate Not Found
- Verify certificate was generated successfully
- Check certificate ID or number
- Ensure user is authenticated

## Future Enhancements

Potential improvements:
1. PDF download option
2. Email certificate delivery
3. Social media sharing integration
4. QR code for verification
5. Certificate expiration dates
6. Certificate revocation system
7. Batch certificate generation for admins
8. Certificate templates for different courses
9. Digital signatures
10. Blockchain verification

## API Documentation

Full API documentation available at:
- Development: `http://localhost:8000/docs`
- Swagger UI with interactive testing

## Support

For issues or questions:
1. Check backend logs: `backend/app/logs/`
2. Check browser console for frontend errors
3. Review API documentation
4. Check database for data consistency

## License

This feature is part of the Employee Education Platform.




