'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  Trophy,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', href: '/courses', icon: BookOpen },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white/80 backdrop-blur-sm dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 min-h-screen shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">EduPlatform</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-200 dark:shadow-blue-900'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-sm'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
