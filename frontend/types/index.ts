export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  enrolledCourses?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  progress: number; // percentage
  totalLessons: number;
  completedLessons: number;
  thumbnail?: string;
  rating?: number;
  enrolledStudents?: number;
  tags?: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl?: string;
  materials?: string[];
  completed: boolean;
  order: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
}

export interface Schedule {
  id: string;
  courseId: string;
  courseName: string;
  instructor: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'live' | 'exam' | 'assignment';
}

export interface Progress {
  courseId: string;
  completionPercentage: number;
  timeSpent: number; // in minutes
  lastAccessed: string;
  streak: number; // days
}

export interface Leaderboard {
  userId: string;
  userName: string;
  avatar?: string;
  points: number;
  rank: number;
  coursesCompleted: number;
}
