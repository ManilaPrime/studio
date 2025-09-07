'use client';

import { useAuth } from '@/hooks/use-auth.tsx';

export default function AccountPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Management</h2>
        <p className="text-sm text-gray-500">Manage your profile and security settings.</p>
      </div>
      
      <div className="prime-card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Profile</h3>
        <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
        </div>

         <div className="mt-6 border-t pt-4">
            <p className="text-center text-gray-600">
                Account management features like changing password or updating profile are coming soon.
            </p>
        </div>
      </div>

    </div>
  );
}
