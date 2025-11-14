'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Star, Clock, Users, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const mockCourses = [
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
  {
    id: '4',
    title: 'Cloud Architecture with AWS',
    category: 'Cloud',
    level: 'Advanced',
    instructor: 'David Brown',
    duration: 45,
    enrolled: 156,
    rating: 4.6,
    progress: 0,
    thumbnail: '☁️',
  },
  {
    id: '6',
    title: 'Mobile App Development',
    category: 'Mobile',
    level: 'Intermediate',
    instructor: 'Lisa Anderson',
    duration: 50,
    enrolled: 203,
    rating: 4.8,
    progress: 0,
    thumbnail: '📱',
  },
  {
    id: '7',
    title: 'Machine Learning Basics',
    category: 'AI/ML',
    level: 'Beginner',
    instructor: 'James Wilson',
    duration: 38,
    enrolled: 267,
    rating: 4.9,
    progress: 20,
    thumbnail: '🤖',
  },
];

const categories = ['All', 'Cybersecurity', 'Safety & Compliance', 'Frontend', 'Backend', 'Design', 'Data Science', 'Cloud', 'Mobile', 'AI/ML'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow block"
            >
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
                {course.thumbnail}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-600' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  by {course.instructor}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}h
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.enrolled}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                {course.progress > 0 ? (
                  <>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <button className="w-full py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Start Course
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Browse More Courses */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Browse All Available Courses
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
