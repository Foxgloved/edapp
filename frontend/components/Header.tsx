'use client';

import { Search, Bell, LogOut, User, Settings, ChevronDown, Award, BookOpen, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, getUserInitials } from '@/contexts/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';

export default function Header() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll: clearAllNotifications } = useNotifications();
  const [displayName, setDisplayName] = useState(user?.name || 'Guest');
  const [displayRole, setDisplayRole] = useState(user?.role || 'User');
  const [displayInitials, setDisplayInitials] = useState(user ? getUserInitials(user.name) : 'U');

  // Update display values when user changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.name);
      setDisplayRole(user.role);
      setDisplayInitials(getUserInitials(user.name));
    } else {
      setDisplayName('Guest');
      setDisplayRole('User');
      setDisplayInitials('U');
    }
  }, [user]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleClearAll = () => {
    clearAllNotifications();
    setShowNotifications(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search courses, instructors..."
                className="w-full pl-10 pr-4 py-2 border border-blue-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 text-blue-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
              >
              <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-md">
                    {unreadCount}
                </span>
              )}
            </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-700 z-50 max-h-[500px] overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-blue-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="overflow-y-auto flex-1">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-blue-200 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">You&apos;re all caught up!</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-blue-50 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer ${
                            !notification.read ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-sm"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-blue-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gray-800">
                      <Link
                        href="/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-blue-300 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {displayInitials}
              </div>
              <div className="hidden md:block">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{displayName}</div>
                  <div className="text-xs text-blue-500 dark:text-gray-400 capitalize">{displayRole}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-blue-400 dark:text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-700 py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 transition-all duration-200 mx-2 rounded-xl"
                  >
                    <User className="h-4 w-4 text-blue-500" />
                    View Profile
                  </Link>
                  <Link
                    href="/profile/edit"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 transition-all duration-200 mx-2 rounded-xl"
                  >
                    <Settings className="h-4 w-4 text-purple-500" />
                    Edit Profile
                  </Link>
                  <Link
                    href="/certificates"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:bg-gray-700 transition-all duration-200 mx-2 rounded-xl"
                  >
                    <Award className="h-4 w-4 text-yellow-500" />
                    My Certificates
                  </Link>
                  <div className="border-t border-blue-100 dark:border-gray-700 my-2"></div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-left mx-2 rounded-xl"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
