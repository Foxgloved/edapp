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
  const [renderKey, setRenderKey] = useState(0);
  
  // Force re-render when user changes
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [user]);
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900" key={renderKey}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
      
      {/* User Switcher for Demo/Testing */}
      <UserSwitcher />
    </div>
  );
}
