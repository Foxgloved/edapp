'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import UserSwitcher from './UserSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
      
      {/* User Switcher for Demo/Testing */}
      <UserSwitcher />
    </div>
  );
}
