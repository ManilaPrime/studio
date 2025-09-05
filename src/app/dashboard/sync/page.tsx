'use client';

import { SmartSyncCard } from '@/components/dashboard/sync/smart-sync-card';
import { units } from '@/lib/data';

export default function SmartSyncPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Smart Sync</h2>
          <p className="text-sm text-gray-500">
            Sync and view bookings across all platforms
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {units.map((unit) => (
          <SmartSyncCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
