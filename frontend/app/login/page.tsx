'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
    // For demo purposes, redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">EduPlatform</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                Google
              </button>
              <button className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                Microsoft
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign up now
          </a>
        </p>

        {/* Demo Credentials - Quick Login */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 font-medium mb-3">Quick Login (Testing):</p>
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="block w-full py-2 px-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors text-center"
            >
              <div className="text-sm font-semibold text-blue-900">👨‍🎓 Login as Student</div>
              <div className="text-xs text-blue-600">john.doe@edapp.com</div>
            </Link>
            <Link
              href="/dashboard"
              className="block w-full py-2 px-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors text-center"
            >
              <div className="text-sm font-semibold text-purple-900">👨‍🏫 Login as Instructor</div>
              <div className="text-xs text-purple-600">instructor@edapp.com</div>
            </Link>
            <Link
              href="/dashboard"
              className="block w-full py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-sm font-semibold text-gray-900">👨‍💼 Login as Admin</div>
              <div className="text-xs text-gray-600">admin@edapp.com</div>
            </Link>
          </div>
          <p className="text-xs text-blue-600 mt-3 text-center">
            All demo passwords: admin123, instructor123, student123
          </p>
        </div>
      </div>
    </div>
  );
}
