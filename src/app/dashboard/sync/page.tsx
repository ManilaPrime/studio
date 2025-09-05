'use client';

import { SmartConflictDetection } from '@/components/dashboard/sync/smart-conflict-detection';

export default function SmartSyncPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Smart Sync</h2>
          <p className="text-sm text-gray-500">
            Detect booking conflicts between calendars
          </p>
        </div>
      </div>
      <SmartConflictDetection />
    </div>
  );
}
