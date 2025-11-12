# Employee Education Platform - Backend

FastAPI application with SQLAlchemy and JWT authentication.

## Getting Started

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt
```

### Development

```bash
# Run the server
python run.py

# Or use uvicorn directly
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

### API Documentation

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── courses.py    # Course endpoints
│   │   └── assignments.py # Assignment endpoints
│   ├── core/             # Core functionality
│   │   ├── config.py     # Configuration
│   │   ├── database.py   # Database connection
│   │   └── security.py   # Security utilities
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── assignment.py
│   │   ├── progress.py
│   │   └── schedule.py
│   ├── schemas/          # Pydantic schemas
│   │   ├── user.py
│   │   ├── course.py
│   │   └── assignment.py
│   └── main.py          # FastAPI application
├── requirements.txt     # Python dependencies
└── run.py              # Entry point
```

## Database Models

### User
- Email, password (hashed), name, role
- Relationships: enrollments, submissions, progress

### Course
- Title, description, category, level, duration
- Relationships: instructor, enrollments, lessons, assignments

### Enrollment
- User-course relationship
- Progress tracking

### Assignment
- Title, description, due date, max grade
- Relationships: course, submissions

### Submission
- Student assignment submission
- Grade and feedback

## Environment Variables

Create a `.env` file:

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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/{id}` - Get course
- `POST /api/courses` - Create course
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/courses/my-courses` - Get my courses

### Assignments
- `GET /api/assignments` - List assignments
- `GET /api/assignments/{id}` - Get assignment
- `POST /api/assignments` - Create assignment
- `POST /api/assignments/{id}/submit` - Submit assignment

## Testing

```bash
pytest
```

## Migration

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migration
alembic upgrade head
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS middleware
- Input validation with Pydantic
- SQL injection protection via ORM

## Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
