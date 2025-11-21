'use client';

import { useState } from 'react';
import { Users, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [justSwitched, setJustSwitched] = useState(false);
  const { loginAsUser } = useAuth();
  const router = useRouter();

  const demoUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@edapp.com',
      role: 'student' as const,
      displayRole: 'Student',
      icon: '👨‍🎓',
      color: 'blue',
    },
    {
      id: '2',
      name: 'Security Experts',
      email: 'instructor@edapp.com',
      role: 'instructor' as const,
      displayRole: 'Instructor',
      icon: '👨‍🏫',
      color: 'purple',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@edapp.com',
      role: 'admin' as const,
      displayRole: 'Admin',
      icon: '👨‍💼',
      color: 'gray',
    },
  ];

  const handleUserSwitch = (demoUser: typeof demoUsers[0]) => {
    const user = {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role,
    };
    
    loginAsUser(user);
    setJustSwitched(true);
    
    // Show confirmation briefly, then close
    setTimeout(() => {
      setJustSwitched(false);
      setIsOpen(false);
      router.push('/dashboard');
      router.refresh();
    }, 1500);
  };

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

            {/* Confirmation Message */}
            {justSwitched && (
              <div className="p-4 bg-green-50 border-b border-green-200 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">User Switched!</p>
                  <p className="text-xs text-green-700">Click "Refresh UI" below to see changes</p>
                </div>
              </div>
            )}

            {/* User List */}
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {demoUsers.map((demoUser) => (
                <button
                  key={demoUser.email}
                  onClick={() => handleUserSwitch(demoUser)}
                  className={`w-full text-left p-4 rounded-lg border-2 hover:shadow-md transition-all ${
                    demoUser.color === 'blue'
                      ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                      : demoUser.color === 'purple'
                      ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{demoUser.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{demoUser.name}</div>
                      <div className="text-xs text-gray-600">{demoUser.email}</div>
                      <div className={`text-xs font-medium mt-1 ${
                        demoUser.color === 'blue'
                          ? 'text-blue-600'
                          : demoUser.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-gray-600'
                      }`}>
                        {demoUser.displayRole}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                🔄 Refresh UI to Apply Changes
              </button>
              <p className="text-xs text-gray-600 text-center mb-2">
                🔐 All passwords: admin123, instructor123, student123
              </p>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs text-blue-600 hover:text-blue-700 font-medium"
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

