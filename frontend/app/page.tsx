import Link from 'next/link';
import { BookOpen, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduPlatform</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                Login
              </Link>
              <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Empower Your Team with
            <span className="text-blue-600"> Continuous Learning</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive employee education platform designed to enhance skills,
            track progress, and foster professional development within your organization.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Start Learning
            </Link>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rich Course Library</h3>
            <p className="text-gray-600">Access a wide range of courses tailored to your team's needs and career development.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor learning progress with detailed analytics and personalized insights.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Learning</h3>
            <p className="text-gray-600">Connect with instructors and peers for a collaborative learning experience.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Achievements & Badges</h3>
            <p className="text-gray-600">Earn certificates, badges, and recognition as you complete courses and milestones.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1,500+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Available Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-lg">EduPlatform</span>
              </div>
              <p className="text-gray-400">Empowering employees through continuous learning and development.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Courses</a></li>
                <li><a href="#" className="hover:text-white">Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Schedule</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
