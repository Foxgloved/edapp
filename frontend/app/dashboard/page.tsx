'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  BookOpen,
  Target,
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const mockStats = {
  totalCourses: 12,
  inProgress: 4,
  completed: 8,
  totalHours: 156,
  currentStreak: 7,
  monthlyActivity: 78,
};

const mockCourses = [
  {
    id: '1',
    title: 'Advanced React Development',
    progress: 65,
    instructor: 'Sarah Johnson',
    nextLesson: 'React Hooks Deep Dive',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    progress: 45,
    instructor: 'Michael Chen',
    nextLesson: 'Pandas DataFrames',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    progress: 80,
    instructor: 'Emma Wilson',
    nextLesson: 'User Testing Methods',
  },
];

const learningFeatures = [
  {
    id: '1',
    icon: '🎯',
    title: 'Self-Paced Learning',
    description: 'Learn at your own pace, anytime, anywhere',
  },
  {
    id: '2',
    icon: '📚',
    title: '24/7 Access',
    description: 'All course materials available on-demand',
  },
  {
    id: '3',
    icon: '🏆',
    title: 'Instant Certificates',
    description: 'Earn certificates upon course completion',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-600">
              You&apos;re making great progress. Keep up the excellent work!
            </p>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-gray-200 rounded-2xl"></div>
            <div className="h-40 bg-gray-200 rounded-2xl"></div>
            <div className="h-40 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const firstName = user?.name.split(' ')[0] || 'there';

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-gray-600">
            You&apos;re making great progress. Keep up the excellent work!
          </p>
        </div>

        {/* Featured Courses */}
        <div className="mb-8 space-y-4">
          {/* NIST CSF Course Banner */}
          <Link 
            href="/courses/6"
            className="block bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className="text-7xl">🔐</div>
                <div className="text-white">
                  <div className="inline-block px-3 py-1 bg-yellow-500/30 border border-yellow-300/50 rounded-full text-xs font-semibold mb-3">
                    🔥 TRENDING NOW
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    NIST Cybersecurity Framework 2.0 Training
                  </h2>
                  <p className="text-purple-100 mb-3 max-w-2xl">
                    Master the latest NIST CSF 2.0 with all six core functions: Govern, Identify, Protect, Detect, Respond, and Recover. Self-paced, on-demand learning.
                  </p>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                      🎯 Self-Paced
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      30 Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      44 Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      Certificate
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold flex items-center gap-2 group-hover:bg-purple-50 transition-colors">
                  Start Course
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Phishing and Scam Alert Training Banner */}
          <Link 
            href="/courses/7"
            className="block bg-gradient-to-br from-orange-500 via-red-600 to-pink-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="text-6xl">🎣</div>
                <div className="text-white">
                  <div className="inline-block px-3 py-1 bg-yellow-500/30 border border-yellow-300/50 rounded-full text-xs font-semibold mb-2">
                    ESSENTIAL TRAINING
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    Phishing and Scam Alert Training - Food Service
                  </h3>
                  <p className="text-orange-100 text-sm mb-2 max-w-2xl">
                    Protect your restaurant from cyber threats. Self-paced training on phishing, scams, and social engineering attacks. Available 24/7.
                  </p>
                  <div className="flex items-center gap-4 text-xs flex-wrap">
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded">
                      🎯 On-Demand
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      26 Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      12 Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Beginner
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold text-sm flex items-center gap-2 group-hover:bg-orange-50 transition-colors">
                  Start Course
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* OSHA Course Banner */}
          <Link 
            href="/courses/5"
            className="block bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="text-6xl">🏥</div>
                <div className="text-white">
                  <div className="inline-block px-3 py-1 bg-green-500/30 border border-green-300/50 rounded-full text-xs font-semibold mb-2">
                    NEW COURSE
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    OSHA Restaurant Employee Training - Missouri
                  </h3>
                  <p className="text-blue-100 text-sm mb-2 max-w-2xl">
                    Complete OSHA compliance training at your own pace. Workplace safety, food safety, and certifications available 24/7.
                  </p>
                  <div className="flex items-center gap-4 text-xs flex-wrap">
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded">
                      🎯 Self-Paced
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      24 Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      40 Hours
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm flex items-center gap-2 group-hover:bg-blue-50 transition-colors">
                  View Course
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mockStats.totalCourses}
            </div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mockStats.inProgress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Done</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mockStats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Streak</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mockStats.currentStreak}
            </div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
              <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                View all
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {mockCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Instructor: {course.instructor}
                      </p>
                      <p className="text-sm text-gray-500">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {course.progress}%
                      </div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>

                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Activity
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockStats.monthlyActivity / 100)}`}
                      className="text-blue-600"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {mockStats.monthlyActivity}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Great job! You're more active than last month.
              </p>
            </div>

            {/* Learning Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Learn On Your Schedule
              </h3>
              <div className="space-y-4">
                {learningFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                  >
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/courses"
                className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse all courses →
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Achievement
                </h3>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                🎉 Course Completion Master
              </div>
              <div className="text-xs text-gray-600">
                Completed 5 courses in a month!
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
