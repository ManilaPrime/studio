'use client';

import { units } from '@/lib/data';

export function UnitsList() {
  if (units.length === 0) {
    return <p className="text-gray-500 text-center py-8">No units found</p>;
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
          <div key={unit.id} className="fb-card">
            <div className="fb-header">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {unit.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {unit.type} - Max {unit.maxOccupancy} guests
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusVariant[unit.status]
                }`}
              >
                {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
              </span>
            </div>
            <div className="fb-content">
              <div className="mb-3">
                <p className="text-2xl font-bold text-yellow-600">
                  ₱{unit.rate.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">per night</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">{unit.description}</p>
            </div>
            <div className="fb-actions">
              <button
                onClick={() => alert(`Editing ${unit.name}`)}
                className="fb-btn fb-btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => alert(`Deleting ${unit.name}`)}
                className="fb-btn fb-btn-secondary"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
