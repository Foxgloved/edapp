import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
  totalCourses: number;
  inProgress: number;
  completed: number;
  totalHours: number;
  currentStreak: number;
  monthlyActivity: number;
  certificatesEarned: number;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  instructor: string;
  nextLesson: string;
  thumbnail?: string;
}

export interface CompletedCourse {
  id: string;
  title: string;
  completedDate: string;
  certificate: boolean;
}

// Demo data structure
const DEMO_USER_DATA = {
  stats: {
    totalCourses: 12,
    inProgress: 4,
    completed: 8,
    totalHours: 156,
    currentStreak: 7,
    monthlyActivity: 78,
    certificatesEarned: 6,
  },
  inProgressCourses: [
    {
      id: '1',
      title: 'Advanced React Development',
      progress: 65,
      instructor: 'Sarah Johnson',
      nextLesson: 'React Hooks Deep Dive',
      thumbnail: '🚀',
    },
    {
      id: '2',
      title: 'Python for Data Science',
      progress: 45,
      instructor: 'Michael Chen',
      nextLesson: 'Pandas DataFrames',
      thumbnail: '🐍',
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      progress: 80,
      instructor: 'Emma Wilson',
      nextLesson: 'User Testing Methods',
      thumbnail: '🎨',
    },
    {
      id: '7',
      title: 'Phishing and Scam Alert Training - Food Service',
      progress: 25,
      instructor: 'Security Experts',
      nextLesson: 'Anatomy of a Phishing Email',
      thumbnail: '🎣',
    },
  ],
  completedCourses: [
    {
      id: '1',
      title: 'Advanced React Development',
      completedDate: '2024-10-15',
      certificate: true,
    },
    {
      id: '2',
      title: 'Python for Data Science',
      completedDate: '2024-09-20',
      certificate: true,
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      completedDate: '2024-08-10',
      certificate: true,
    },
  ],
};

export function useUserStats() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<UserStats>(DEMO_USER_DATA.stats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      if (!isAuthenticated || !user) {
        setStats(DEMO_USER_DATA.stats);
        return;
      }

      setLoading(true);
      try {
        const data = await api.request<UserStats>('/api/users/me/stats');
        setStats(data);
      } catch (err) {
        console.warn('Using demo stats');
        setStats(DEMO_USER_DATA.stats);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user, isAuthenticated]);

  return { stats, loading };
}

export function useUserCourses() {
  const { user, isAuthenticated } = useAuth();
  const [inProgress, setInProgress] = useState<EnrolledCourse[]>(DEMO_USER_DATA.inProgressCourses);
  const [completed, setCompleted] = useState<CompletedCourse[]>(DEMO_USER_DATA.completedCourses);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      if (!isAuthenticated || !user) {
        setInProgress(DEMO_USER_DATA.inProgressCourses);
        setCompleted(DEMO_USER_DATA.completedCourses);
        return;
      }

      setLoading(true);
      try {
        const enrollments = await api.getMyEnrollments() as any[];
        
        const inProgressCourses = enrollments.filter((e: any) => !e.completed_at) as EnrolledCourse[];
        const completedCourses = enrollments.filter((e: any) => e.completed_at) as CompletedCourse[];
        
        setInProgress(inProgressCourses);
        setCompleted(completedCourses);
      } catch (err) {
        console.warn('Using demo courses');
        setInProgress(DEMO_USER_DATA.inProgressCourses);
        setCompleted(DEMO_USER_DATA.completedCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [user, isAuthenticated]);

  return { inProgress, completed, loading };
}

