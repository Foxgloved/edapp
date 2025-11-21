'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function TestAuth() {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log('🔍 Current user:', user);
  }, [user]);
  
  return (
    <div style={{ position: 'fixed', bottom: '100px', right: '10px', background: 'white', padding: '10px', border: '1px solid black', zIndex: 9999, fontSize: '12px' }}>
      <div><strong>Debug Auth:</strong></div>
      <div>User: {user?.name || 'None'}</div>
      <div>Email: {user?.email || 'None'}</div>
      <div>Role: {user?.role || 'None'}</div>
      <div>ID: {user?.id || 'None'}</div>
    </div>
  );
}
