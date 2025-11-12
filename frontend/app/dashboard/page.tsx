'use client';

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
    dueDate: '2025-11-15',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    progress: 45,
    instructor: 'Michael Chen',
    nextLesson: 'Pandas DataFrames',
    dueDate: '2025-11-18',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    progress: 80,
    instructor: 'Emma Wilson',
    nextLesson: 'User Testing Methods',
    dueDate: '2025-11-20',
  },
];

const upcomingSchedule = [
  {
    id: '1',
    course: 'Advanced React Development',
    type: 'Live Session',
    time: '10:00 AM',
    date: 'Today',
  },
  {
    id: '2',
    course: 'Python for Data Science',
    type: 'Assignment Due',
    time: '11:59 PM',
    date: 'Tomorrow',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            You're making great progress. Keep up the excellent work!
          </p>
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

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Due: {course.dueDate}
                    </span>
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

            {/* Upcoming Schedule */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Schedule
              </h3>
              <div className="space-y-4">
                {upcomingSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm mb-1">
                          {item.course}
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.date} at {item.time}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/schedule"
                className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View full schedule
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
