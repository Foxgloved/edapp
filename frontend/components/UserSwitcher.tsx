'use client';

import { useState } from 'react';
import { Users, X } from 'lucide-react';
import Link from 'next/link';

export default function UserSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const demoUsers = [
    {
      name: 'John Doe',
      email: 'john.doe@edapp.com',
      role: 'Student',
      icon: '👨‍🎓',
      color: 'blue',
      href: '/dashboard'
    },
    {
      name: 'Security Experts',
      email: 'instructor@edapp.com',
      role: 'Instructor',
      icon: '👨‍🏫',
      color: 'purple',
      href: '/dashboard'
    },
    {
      name: 'Admin User',
      email: 'admin@edapp.com',
      role: 'Admin',
      icon: '👨‍💼',
      color: 'gray',
      href: '/dashboard'
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-50 group"
        title="Switch User (Demo)"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Users className="h-6 w-6" />
        )}
      </button>

      {/* User Switcher Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <h3 className="font-bold text-lg">Switch User</h3>
              <p className="text-sm text-blue-100">Quick login for testing</p>
            </div>

            {/* User List */}
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {demoUsers.map((user) => (
                <Link
                  key={user.email}
                  href={user.href}
                  onClick={() => {
                    setIsOpen(false);
                    // Store user in localStorage for demo
                    localStorage.setItem('demoUser', JSON.stringify(user));
                  }}
                  className={`block p-4 rounded-lg border-2 hover:shadow-md transition-all ${
                    user.color === 'blue'
                      ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                      : user.color === 'purple'
                      ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{user.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600">{user.email}</div>
                      <div className={`text-xs font-medium mt-1 ${
                        user.color === 'blue'
                          ? 'text-blue-600'
                          : user.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-gray-600'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                🔐 All passwords: admin123, instructor123, student123
              </p>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-2 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Go to Login Page →
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

