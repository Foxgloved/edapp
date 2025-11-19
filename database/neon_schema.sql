-- NeonDB Schema for Educational Platform
-- PostgreSQL Database Setup

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    avatar VARCHAR(500),
    about_me TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    level VARCHAR(50) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration INTEGER DEFAULT 0, -- in hours
    thumbnail VARCHAR(500),
    rating DECIMAL(3,2) DEFAULT 0.0,
    instructor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_title ON courses(title);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);

-- Lessons Table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    duration INTEGER DEFAULT 0, -- in minutes
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_course ON lessons(course_id);
CREATE INDEX idx_lessons_order ON lessons("order");

-- Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    progress_percentage DECIMAL(5,2) DEFAULT 0.0,
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_progress ON enrollments(progress_percentage);

-- Progress Table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0.0,
    time_spent INTEGER DEFAULT 0, -- in minutes
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    streak INTEGER DEFAULT 0, -- days
    points INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_progress_user ON progress(user_id);
CREATE INDEX idx_progress_course ON progress(course_id);
CREATE INDEX idx_progress_lesson ON progress(lesson_id);

-- Assignments Table (Optional - for future use if needed)
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    max_grade DECIMAL(5,2) DEFAULT 100.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_course ON assignments(course_id);

-- Submissions Table (Optional - for future use)
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    file_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('pending', 'submitted', 'graded')),
    grade DECIMAL(5,2),
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    graded_at TIMESTAMP
);

CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);

-- Certificates Table
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    certificate_url VARCHAR(500),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_course ON certificates(course_id);

-- Achievements Table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_user ON achievements(user_id);

-- Leaderboard View (for quick access)
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
    u.id,
    u.name,
    u.avatar,
    COALESCE(SUM(p.points), 0) as total_points,
    COALESCE(COUNT(DISTINCT e.course_id) FILTER (WHERE e.completed_at IS NOT NULL), 0) as courses_completed,
    COALESCE(MAX(p.streak), 0) as current_streak,
    COALESCE(SUM(p.time_spent), 0) as total_time_spent
FROM users u
LEFT JOIN progress p ON u.id = p.user_id
LEFT JOIN enrollments e ON u.id = e.user_id
WHERE u.role = 'student'
GROUP BY u.id, u.name, u.avatar
ORDER BY total_points DESC, courses_completed DESC;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (password: admin123 - hashed with bcrypt)
-- Note: This is a sample hash. Generate your own in production!
INSERT INTO users (email, hashed_password, name, role) VALUES
('admin@edapp.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5/JXc.OIxFqk2', 'Admin User', 'admin'),
('instructor@edapp.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5/JXc.OIxFqk2', 'John Instructor', 'instructor'),
('student@edapp.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5/JXc.OIxFqk2', 'Jane Student', 'student');

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_neon_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_neon_user;

-- Performance indexes for common queries
CREATE INDEX idx_progress_last_accessed ON progress(last_accessed DESC);
CREATE INDEX idx_enrollments_completed ON enrollments(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX idx_courses_rating ON courses(rating DESC);

COMMENT ON TABLE users IS 'Stores user account information including students, instructors, and admins';
COMMENT ON TABLE courses IS 'Course catalog with metadata';
COMMENT ON TABLE lessons IS 'Individual lessons within courses';
COMMENT ON TABLE enrollments IS 'Tracks which users are enrolled in which courses';
COMMENT ON TABLE progress IS 'Detailed progress tracking for users in courses';
COMMENT ON TABLE certificates IS 'Issued certificates for course completion';

