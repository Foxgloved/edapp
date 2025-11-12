'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { User, Mail, Calendar, Award, BookOpen, Clock, Edit2 } from 'lucide-react';

const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Student',
  joinedDate: '2024-01-15',
  avatar: '👨‍🚀',
  bio: 'Passionate about learning new technologies and improving my skills every day.',
  stats: {
    coursesCompleted: 9,
    coursesInProgress: 4,
    totalHours: 156,
    averageScore: 92,
    streak: 30,
    badges: 5,
  },
  recentCourses: [
    { name: 'Advanced React Development', completion: 65, grade: 95 },
    { name: 'Python for Data Science', completion: 45, grade: null },
    { name: 'UI/UX Design Fundamentals', completion: 80, grade: 88 },
  ],
  skills: [
    'React',
    'TypeScript',
    'Python',
    'UI/UX Design',
    'Data Analysis',
    'Cloud Computing',
  ],
};

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-6xl">
                {mockUserData.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockUserData.name}</h1>
                <div className="flex items-center space-x-4 text-blue-100 mb-2">
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {mockUserData.email}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {mockUserData.role}
                  </span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {new Date(mockUserData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600">{mockUserData.bio}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockUserData.stats.coursesCompleted}
                </div>
                <div className="text-sm text-gray-600">Courses Completed</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockUserData.stats.coursesInProgress}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockUserData.stats.totalHours}h
                </div>
                <div className="text-sm text-gray-600">Learning Time</div>
              </div>
            </div>

            {/* Recent Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Courses</h2>
              <div className="space-y-4">
                {mockUserData.recentCourses.map((course, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      {course.grade && (
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
                          Grade: {course.grade}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-semibold text-blue-600">
                        {course.completion}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className="text-lg font-bold text-gray-900">
                      {mockUserData.stats.averageScore}%
                    </span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                      style={{ width: `${mockUserData.stats.averageScore}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <div className="flex items-center">
                      <span className="text-2xl mr-1">🔥</span>
                      <span className="text-lg font-bold text-orange-600">
                        {mockUserData.stats.streak} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Badges Earned</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {mockUserData.stats.badges} 🏆
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {mockUserData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    🎓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      React Expert
                    </div>
                    <div className="text-xs text-gray-600">Completed Oct 2024</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    🎓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      UX Design Pro
                    </div>
                    <div className="text-xs text-gray-600">Completed Sep 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
