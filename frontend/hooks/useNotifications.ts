import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: number;
  type: 'achievement' | 'course' | 'certificate' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'achievement',
    title: 'Course Completed!',
    message: 'You completed "UI/UX Design Fundamentals"',
    time: '2 hours ago',
    read: false,
    icon: '🎉',
  },
  {
    id: 2,
    type: 'course',
    title: 'New Course Available',
    message: 'Phishing and Scam Alert Training is now available',
    time: '5 hours ago',
    read: false,
    icon: '🎣',
  },
  {
    id: 3,
    type: 'certificate',
    title: 'Certificate Ready',
    message: 'Your OSHA certification is ready to download',
    time: '1 day ago',
    read: false,
    icon: '📜',
  },
];

export function useNotifications() {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      if (!isAuthenticated || !user) {
        setNotifications(DEMO_NOTIFICATIONS);
        return;
      }

      setLoading(true);
      try {
        const data = await api.getNotifications() as Notification[];
        setNotifications(data);
      } catch (err) {
        console.warn('Using demo notifications');
        setNotifications(DEMO_NOTIFICATIONS);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [user, isAuthenticated]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));

    if (isAuthenticated) {
      try {
        await api.markNotificationAsRead(id.toString());
      } catch (err) {
        console.warn('Could not mark notification as read');
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));

    if (isAuthenticated) {
      try {
        await api.markAllNotificationsAsRead();
      } catch (err) {
        console.warn('Could not mark all as read');
      }
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}

