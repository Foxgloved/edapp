'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import UserSwitcher from './UserSwitcher';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50" key={user?.id || 'no-user'}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header key={`header-${user?.id}`} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* User Switcher for Demo/Testing */}
      <UserSwitcher />
    </div>
  );
}
