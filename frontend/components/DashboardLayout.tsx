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
    <div className="flex h-screen bg-gray-50" key={renderKey}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* User Switcher for Demo/Testing */}
      <UserSwitcher />
      
      {/* Debug Panel - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-24 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-300 text-xs z-50">
          <div className="font-bold mb-1">Auth Debug:</div>
          <div>User: {user?.name || 'None'}</div>
          <div>Role: {user?.role || 'None'}</div>
          <div>ID: {user?.id || 'None'}</div>
        </div>
      )}
    </div>
  );
}
