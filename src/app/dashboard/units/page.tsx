'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AddUnitDialog } from '@/components/dashboard/units/add-unit-dialog';
import { EditUnitDialog } from '@/components/dashboard/units/edit-unit-dialog';
import { UnitsList } from '@/components/dashboard/units/units-list';
import type { Unit } from '@/lib/types';
import { getUnits, addUnit as addUnitService, updateUnit as updateUnitService, deleteUnit as deleteUnitService } from '@/services/units';

export default function UnitsPage({
  isAddUnitOpen,
  onAddUnitOpenChange,
  isEditUnitOpen,
  onEditUnitOpenChange,
}: {
  isAddUnitOpen: boolean;
  onAddUnitOpenChange: (open: boolean) => void;
  isEditUnitOpen: boolean;
  onEditUnitOpenChange: (open: boolean) => void;
}) {
  const [units, setUnits] = React.useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = React.useState<Unit | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchUnits() {
        const unitsData = await getUnits();
        setUnits(unitsData);
        setLoading(false);
    }
    fetchUnits();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      onAddUnitOpenChange(true);
    }
  }, [searchParams, onAddUnitOpenChange]);

  const handleOpenEditDialog = (unit: Unit) => {
    setSelectedUnit(unit);
    onEditUnitOpenChange(true);
  };


  const addUnit = async (newUnitData: Omit<Unit, 'id' | 'status' | 'calendars'>) => {
    const newUnit: Omit<Unit, 'id'> = {
      ...newUnitData,
      status: 'available',
      // Provide default empty calendar URLs for new units
      calendars: {
        airbnb: '',
        bookingcom: '',
        direct: '',
      },
    };
    const id = await addUnitService(newUnit);
    setUnits((prev) => [...prev, { ...newUnit, id }]);
  };

  const deleteUnit = async (unitId: string) => {
     if (confirm('Are you sure you want to delete this unit? This action cannot be undone.')) {
        await deleteUnitService(unitId);
        setUnits((prev) => prev.filter((u) => u.id !== unitId));
    }
  }

  const updateUnit = async (updatedUnit: Unit) => {
    await updateUnitService(updatedUnit);
    setUnits((prev) => prev.map((u) => u.id === updatedUnit.id ? updatedUnit : u));
    setSelectedUnit(null);
  }

  if(loading) {
    return <div className="p-4 text-center">Loading units...</div>
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
          onOpenChange={onAddUnitOpenChange}
          onAddUnit={addUnit}
        >
          <button
            onClick={() => onAddUnitOpenChange(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddUnitDialog>
      </div>
      <UnitsList units={units} onEdit={handleOpenEditDialog} onDelete={deleteUnit} />
      {selectedUnit && (
        <EditUnitDialog
          key={selectedUnit.id}
          open={isEditUnitOpen}
          onOpenChange={onEditUnitOpenChange}
          unit={selectedUnit}
          onUpdateUnit={updateUnit}
        />
      )}
    </div>
  );
}
