'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Mail, 
  Calendar,
  Award,
  BookOpen,
  Clock,
  Edit,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { useAuth, getUserInitials } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  
  const profileData = {
    fullName: user?.name || 'Guest User',
    email: user?.email || 'guest@edapp.com',
    role: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student',
    department: 'Technology Department',
    location: 'New York, USA',
    joinDate: 'January 2024',
    aboutMe: user?.aboutMe || 'No bio added yet. Click Edit Profile to add information about yourself.',
    stats: {
      coursesCompleted: 8,
      coursesInProgress: 4,
      totalHours: 156,
      certificatesEarned: 6,
    },
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
    inProgressCourses: [
      {
        id: '7',
        title: 'Phishing and Scam Alert Training - Food Service',
        progress: 25,
      },
      {
        id: '6',
        title: 'NIST Cybersecurity Framework 2.0 Training',
        progress: 15,
      },
      {
        id: '5',
        title: 'OSHA Restaurant Employee Training - Missouri',
        progress: 40,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto" key={`profile-${user?.id || 'guest'}`}>
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Profile Avatar */}
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-white text-3xl font-bold">
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* Profile Info */}
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{profileData.fullName}</h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-100">
                      <Briefcase className="h-4 w-4" />
                      <span>{profileData.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Link
                href="/profile/edit"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2 shadow-lg"
              >
                <Edit className="h-5 w-5" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - About & Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About Me Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              {profileData.aboutMe ? (
                <p className="text-gray-700 leading-relaxed">{profileData.aboutMe}</p>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No bio added yet</p>
                  <Link
                    href="/profile/edit"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your bio
                  </Link>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3 mx-auto">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.coursesCompleted}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3 mx-auto">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.coursesInProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3 mx-auto">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.totalHours}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-3 mx-auto">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.certificatesEarned}</div>
                  <div className="text-sm text-gray-600">Certificates</div>
                </div>
              </div>
            </div>

            {/* Courses In Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Courses In Progress</h2>
              <div className="space-y-4">
                {profileData.inProgressCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Completed Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Courses</h2>
              <div className="space-y-3">
                {profileData.completedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500">
                          Completed: {new Date(course.completedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    {course.certificate && (
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Certificate
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-900">{profileData.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium text-gray-900">{profileData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5 text-gray-400" />
                  <span>Edit Profile</span>
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <span>Browse Courses</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                  <span>View Dashboard</span>
                </Link>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick Learner</p>
                    <p className="text-sm text-gray-600">Completed 3 courses this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dedicated Student</p>
                    <p className="text-sm text-gray-600">7-day learning streak</p>
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
