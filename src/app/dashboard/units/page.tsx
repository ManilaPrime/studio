'use client';

import React from 'react';
import { AddUnitDialog } from '@/components/dashboard/units/add-unit-dialog';
import { UnitsList } from '@/components/dashboard/units/units-list';
import { units as initialUnits } from '@/lib/data';
import type { Unit } from '@/lib/types';

export default function UnitsPage() {
  const [units, setUnits] = React.useState<Unit[]>(initialUnits);
  const [isAddUnitOpen, setIsAddUnitOpen] = React.useState(false);

  const addUnit = (newUnitData: Omit<Unit, 'id' | 'status' | 'calendars'>) => {
    const newUnit: Unit = {
      ...newUnitData,
      id: Math.max(0, ...units.map((u) => u.id)) + 1,
      status: 'available',
      // Provide default empty calendar URLs for new units
      calendars: {
        airbnb: '',
        bookingcom: '',
        direct: '',
      },
    };
    setUnits((prev) => [...prev, newUnit]);
  };

  const deleteUnit = (unitId: number) => {
     if (confirm('Are you sure you want to delete this unit? This action cannot be undone.')) {
        setUnits((prev) => prev.filter((u) => u.id !== unitId));
    }
  }

  const updateUnit = (updatedUnit: Unit) => {
    setUnits((prev) => prev.map((u) => u.id === updatedUnit.id ? updatedUnit : u));
  }


  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Units</h2>
          <p className="text-sm text-gray-500">Manage rental properties & sync calendars</p>
        </div>
        <AddUnitDialog 
          open={isAddUnitOpen} 
          onOpenChange={setIsAddUnitOpen}
          onAddUnit={addUnit}
        >
          <button
            onClick={() => setIsAddUnitOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddUnitDialog>
      </div>
      <UnitsList units={units} onDelete={deleteUnit} onUpdate={updateUnit} />
    </div>
  );
}
