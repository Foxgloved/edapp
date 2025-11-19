'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Lock,
  Trash2,
  CheckCircle,
  X
} from 'lucide-react';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('security'); // security, danger

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDeleteAccount = () => {
    // TODO: Connect to API for account deletion
    console.log('Account deletion requested');
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your security and account preferences</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800">Your changes have been saved successfully!</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Lock className="h-5 w-5 inline-block mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('danger')}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'danger'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Trash2 className="h-5 w-5 inline-block mr-2" />
              Delete Account
            </button>
          </nav>
        </div>

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleChangePassword}>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

              {/* Current Password */}
              <div className="mb-6">
                <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 8 characters with uppercase, lowercase, and numbers.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    At least 8 characters long
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Contains uppercase and lowercase letters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Contains at least one number
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Contains at least one special character
                  </li>
                </ul>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Account Tab */}
        {activeTab === 'danger' && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-2 flex items-center gap-2">
              <Trash2 className="h-6 w-6" />
              Delete Account
            </h2>
            <p className="text-gray-600 mb-6">
              This action is irreversible. Please proceed with caution.
            </p>

            {/* Delete Account Section */}
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
              <p className="text-gray-700 mb-4">
                Once you delete your account, there is no going back. All your data, progress, 
                certificates, and course enrollments will be permanently deleted.
              </p>

              <div className="bg-white border border-red-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">This will permanently delete:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    All your personal information and profile data
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    Your course progress and completion records
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    All earned certificates and achievements
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    Your enrollments in current courses
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    All saved content and preferences
                  </li>
                </ul>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="h-5 w-5" />
                  Delete My Account
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <p className="text-yellow-900 font-semibold mb-2">⚠️ Final Confirmation</p>
                    <p className="text-yellow-800 text-sm">
                      Are you absolutely sure you want to delete your account? 
                      Type <span className="font-mono font-bold">DELETE</span> below to confirm.
                    </p>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      Yes, Delete Forever
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

