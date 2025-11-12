# Employee Education Platform

A comprehensive in-house learning management system (LMS) built with Next.js and Python FastAPI. This platform enables organizations to deliver, track, and manage employee training and development programs.

![Platform Preview](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)
![Python](https://img.shields.io/badge/Python-3.9+-blue)

## 🎯 Features

### For Students
- **Interactive Dashboard** - Track your learning progress with real-time analytics
- **Course Catalog** - Browse and enroll in courses across multiple categories
- **Progress Tracking** - Monitor completion rates and time spent on each course
- **Assignment Management** - Submit homework and receive feedback from instructors
- **Schedule Calendar** - View upcoming live sessions, deadlines, and exams
- **Leaderboard & Gamification** - Compete with peers and earn badges
- **Personal Profile** - Track achievements, skills, and certifications

### For Instructors
- **Course Management** - Create and manage course content
- **Student Progress Monitoring** - Track individual and class performance
- **Assignment Grading** - Review submissions and provide feedback
- **Live Session Scheduling** - Plan and conduct virtual classes

### For Administrators
- **User Management** - Manage student and instructor accounts
- **Analytics Dashboard** - View platform-wide statistics
- **Content Moderation** - Review and approve course materials

## 🏗️ Architecture

```
├── frontend/          # Next.js 15 application
│   ├── app/          # App router pages
│   ├── components/   # Reusable React components
│   ├── lib/          # Utility functions and API client
│   └── types/        # TypeScript type definitions
│
└── backend/          # FastAPI application
    ├── app/
    │   ├── api/      # API route handlers
    │   ├── core/     # Configuration and security
    │   ├── models/   # SQLAlchemy database models
    │   └── schemas/  # Pydantic validation schemas
    └── requirements.txt
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd workspace
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Initialize database
python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Run the server
python run.py
```

The backend will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

#### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📚 Usage

### Default Login Credentials

```
Email: demo@company.com
Password: demo123
```

### Creating Your First Course

1. Log in as an instructor
2. Navigate to "My Courses"
3. Click "Create New Course"
4. Fill in course details (title, description, category, level)
5. Add lessons and assignments
6. Publish the course

### Enrolling in Courses

1. Browse the course catalog
2. Click on a course to view details
3. Click "Enroll" to start learning
4. Access course materials from your dashboard

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env`:

```env
DATABASE_URL=sqlite:///./edu_platform.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

For production, use PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost/edu_platform
```

### Frontend Configuration

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🗄️ Database Schema

### Key Models

- **User** - Student, instructor, and admin accounts
- **Course** - Course information and metadata
- **Enrollment** - Student course registrations
- **Lesson** - Individual course lessons
- **Assignment** - Course assignments
- **Submission** - Student assignment submissions
- **Progress** - Learning progress tracking
- **Schedule** - Calendar events and deadlines

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses` - Create new course
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/courses/my-courses` - Get enrolled courses

### Assignments
- `GET /api/assignments` - List assignments
- `GET /api/assignments/{id}` - Get assignment details
- `POST /api/assignments/{id}/submit` - Submit assignment

For complete API documentation, visit `http://localhost:8000/docs`

## 🎨 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Recharts** - Data visualization

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **JWT** - Authentication tokens
- **Uvicorn** - ASGI server
- **SQLite/PostgreSQL** - Database options

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

#### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel, Netlify, or your preferred platform
```

#### Backend (Heroku/AWS/GCP)
```bash
cd backend
# Update Procfile and requirements.txt
# Deploy using platform-specific commands
```

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- SQL injection protection via ORM
- Input validation with Pydantic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- UI/UX inspiration from modern learning platforms
- FastAPI documentation and community
- Next.js team for the excellent framework

## 📞 Support

For support, email support@yourcompany.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Video streaming integration
- [ ] Real-time chat for live sessions
- [ ] Mobile app (React Native)
- [ ] AI-powered course recommendations
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Integration with HR systems

## 📊 Project Status

**Current Version:** 1.0.0

This is a production-ready platform suitable for small to medium-sized organizations. For enterprise deployments, please contact our team for customization and support options.

---

Made with ❤️ for employee development
