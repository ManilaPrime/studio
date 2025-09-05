'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { UnitsList } from '@/components/dashboard/units/units-list';
import { AddUnitDialog } from '@/components/dashboard/units/add-unit-dialog';

export default function UnitsPage() {
  const [isAddUnitOpen, setIsAddUnitOpen] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Units</h2>
          <p className="text-sm text-gray-500">Manage rental properties</p>
        </div>
        <AddUnitDialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
          <Button
            onClick={() => setIsAddUnitOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </Button>
        </AddUnitDialog>
      </div>
      <UnitsList />
    </div>
  );
}
