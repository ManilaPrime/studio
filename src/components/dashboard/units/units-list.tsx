'use client';

import { units } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function UnitsList() {
  if (units.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">No units found</p>
    );
  }

  return (
    <div className="space-y-4">
      {units.map((unit) => {
        const statusVariant = {
          available: 'bg-green-100 text-green-800',
          occupied: 'bg-red-100 text-red-800',
          maintenance: 'bg-yellow-100 text-yellow-800',
        };

        return (
          <div key={unit.id} className="prime-card">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{unit.name}</h3>
                        <p className="text-sm text-gray-600">{unit.type} - Max {unit.maxOccupancy} guests</p>
                    </div>
                     <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusVariant[unit.status]
                        }`}
                    >
                        {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                    </span>
                </div>
            </div>
            <div className="p-4 pt-0">
              <div className="mb-3">
                <p className="text-2xl font-bold text-prime-gold">₱{unit.rate.toLocaleString()}</p>
                <p className="text-sm text-gray-600">per night</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">{unit.description}</p>
            </div>
            <div className="p-4 pt-0 flex space-x-2">
              <Button onClick={() => alert(`Editing ${unit.name}`)} className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-600">
                Edit
              </Button>
              <Button onClick={() => alert(`Deleting ${unit.name}`)} className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
