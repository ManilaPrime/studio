'use client';

import React from 'react';
import { AddUnitDialog } from '@/components/dashboard/units/add-unit-dialog';
import { units } from '@/lib/data';
import { SmartSyncCard } from '@/components/dashboard/sync/smart-sync-card';

export default function UnitsPage() {
  const [isAddUnitOpen, setIsAddUnitOpen] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Units</h2>
          <p className="text-sm text-gray-500">Manage rental properties & sync calendars</p>
        </div>
        <AddUnitDialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
          <button
            onClick={() => setIsAddUnitOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddUnitDialog>
      </div>
      <div className="space-y-6">
        {units.map((unit) => (
          <SmartSyncCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
