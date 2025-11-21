import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  duration: number;
  enrolled: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  featured?: boolean;
}

// Demo/fallback courses if API is not available
const DEMO_COURSES: Course[] = [
  {
    id: '7',
    title: 'Phishing and Scam Alert Training - Food Service',
    category: 'Cybersecurity',
    level: 'Beginner',
    instructor: 'Security Experts',
    duration: 12,
    enrolled: 0,
    rating: 4.9,
    progress: 0,
    thumbnail: '🎣',
    featured: true,
  },
  {
    id: '6',
    title: 'NIST Cybersecurity Framework 2.0 Training',
    category: 'Cybersecurity',
    level: 'Intermediate',
    instructor: 'Security Experts',
    duration: 44,
    enrolled: 0,
    rating: 4.9,
    progress: 0,
    thumbnail: '🔐',
    featured: true,
  },
  {
    id: '5',
    title: 'OSHA Restaurant Employee Training - Missouri',
    category: 'Safety & Compliance',
    level: 'Beginner',
    instructor: 'Safety Department',
    duration: 40,
    enrolled: 0,
    rating: 4.9,
    progress: 0,
    thumbnail: '🏥',
    featured: true,
  },
  {
    id: '1',
    title: 'Advanced React Development',
    category: 'Frontend',
    level: 'Advanced',
    instructor: 'Sarah Johnson',
    duration: 40,
    enrolled: 234,
    rating: 4.8,
    progress: 65,
    thumbnail: '🚀',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Michael Chen',
    duration: 35,
    enrolled: 189,
    rating: 4.9,
    progress: 45,
    thumbnail: '🐍',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Emma Wilson',
    duration: 28,
    enrolled: 312,
    rating: 4.7,
    progress: 80,
    thumbnail: '🎨',
  },
];

export function useCourses(params?: { category?: string; level?: string; search?: string }) {
  const [courses, setCourses] = useState<Course[]>(DEMO_COURSES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        // Try to fetch from API
        const data = await api.getCourses(params) as Course[];
        setCourses(data);
      } catch (err) {
        // Fallback to demo data if API not available
        console.warn('API not available, using demo data');
        setCourses(DEMO_COURSES);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [params?.category, params?.level, params?.search]);

  return { courses, loading, error };
}

export function useCourse(id: string) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      try {
        const data = await api.getCourse(id);
        setCourse(data);
      } catch (err) {
        console.warn('API not available, using demo data');
        // Fallback to demo data based on ID
        const demoCourse = DEMO_COURSES.find(c => c.id === id);
        setCourse(demoCourse);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return { course, loading, error };
}

