'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell, Lock, User, Palette, Globe, Shield, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  // Get theme context
  const { theme, language, setTheme, setLanguage } = useTheme();
  
  // Local state for tracking pending changes
  const [pendingTheme, setPendingTheme] = useState(theme);
  const [pendingLanguage, setPendingLanguage] = useState(language);
  const [showAppearanceSuccess, setShowAppearanceSuccess] = useState(false);

  // Update pending values when theme context changes
  useEffect(() => {
    setPendingTheme(theme);
    setPendingLanguage(language);
  }, [theme, language]);

  // Check if appearance settings have changed
  const hasAppearanceChanges = pendingTheme !== theme || pendingLanguage !== language;

  // Handle appearance settings save
  const handleSaveAppearance = () => {
    setTheme(pendingTheme);
    setLanguage(pendingLanguage);
    setShowAppearanceSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowAppearanceSuccess(false);
    }, 3000);
    
    // Here you would typically make an API call to save the settings
    console.log('Saving appearance settings:', { theme: pendingTheme, language: pendingLanguage });
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100 mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:bg-blue-900 rounded-xl shadow-sm">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100">Profile Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john.doe@company.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Passionate about learning new technologies..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800 rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 dark:bg-green-900 rounded-xl shadow-sm">
                <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:text-gray-100">Security</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:bg-purple-900 rounded-xl shadow-sm">
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-gray-100">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Email notifications for new courses</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Assignment deadline reminders</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Weekly progress summary</span>
                <input type="checkbox" className="w-5 h-5 text-blue-600" />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Achievement notifications</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
              </label>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800 rounded-2xl shadow-lg border border-yellow-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-100 to-amber-100 dark:bg-yellow-900 rounded-xl shadow-sm">
                <Palette className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent dark:text-gray-100">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <select 
                  value={pendingTheme}
                  onChange={(e) => setPendingTheme(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select 
                  value={pendingLanguage}
                  onChange={(e) => setPendingLanguage(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              {/* Confirm Changes Button */}
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={handleSaveAppearance}
                  disabled={!hasAppearanceChanges}
                  className={`px-6 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md ${
                    hasAppearanceChanges
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 hover:shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {showAppearanceSuccess ? (
                    <>
                      <Check className="h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    'Confirm Changes'
                  )}
                </button>
                {hasAppearanceChanges && !showAppearanceSuccess && (
                  <span className="text-sm text-amber-600 dark:text-gray-400 font-medium">
                    You have unsaved changes
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
