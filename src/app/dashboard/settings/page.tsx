
'use client';

import { useAuth } from '@/hooks/use-auth.tsx';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { user, logout, sendPasswordReset } = useAuth();
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');


  if (!user) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }
  
  const handleLogout = async () => {
    await logout();
  };

  const handlePasswordReset = async () => {
    setResetMessage('');
    setResetError('');
    try {
        await sendPasswordReset();
        setResetMessage('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
        setResetError('Failed to send reset email. Please try again later.');
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Manage your profile and application settings.</p>
      </div>
      
      <div className="space-y-6">
        <div className="prime-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Profile</h3>
          <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.uid}</p>
          </div>

          <div className="mt-6 border-t pt-4">
              <p className="text-center text-xs text-gray-500">
                  Profile editing features are coming soon.
              </p>
          </div>
        </div>

        <div className="prime-card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
            <div className="space-y-4">
                <div>
                    <button onClick={handlePasswordReset} className="prime-button w-full py-2">
                        Change Password
                    </button>
                    {resetMessage && <p className="text-green-600 text-sm mt-2">{resetMessage}</p>}
                    {resetError && <p className="text-red-600 text-sm mt-2">{resetError}</p>}
                </div>
            </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="prime-card p-0 hover:border-red-500">
              <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-4 bg-transparent border-none"
              >
              <LogOut className="w-6 h-6 text-red-700" />
              <span className="font-semibold text-red-800">Logout</span>
              </button>
          </div>
        </div>
      </div>

    </div>
  );
}
