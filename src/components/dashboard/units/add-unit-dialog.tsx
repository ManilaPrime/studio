'use client';

import type { Unit } from '@/lib/types';

export function AddUnitDialog({
  children,
  open,
  onOpenChange,
  onAddUnit,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUnit: (unit: Omit<Unit, 'id' | 'status' | 'calendars'>) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUnit = {
      name: formData.get('unitName') as string,
      type: formData.get('unitType') as string,
      rate: parseInt(formData.get('unitRate') as string),
      maxOccupancy: parseInt(formData.get('maxOccupancy') as string),
      description: formData.get('unitDescription') as string,
    };
    onAddUnit(newUnit);
    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
    {children}
    <div id="addUnitModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Unit</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="unitForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="unitName" className="block text-sm font-medium text-gray-700 mb-1">Unit Name</label>
                    <input type="text" name="unitName" id="unitName" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="unitType" className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                    <select name="unitType" id="unitType" className="prime-input" required>
                        <option value="">Select Type</option>
                        <option value="Studio">Studio</option>
                        <option value="1BR">1 Bedroom</option>                        
                        <option value="2BR">2 Bedroom</option>
                        <option value="3BR">3 Bedroom</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="unitRate" className="block text-sm font-medium text-gray-700 mb-1">Nightly Rate (₱)</label>
                    <input type="number" name="unitRate" id="unitRate" min="0" step="100" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="maxOccupancy" className="block text-sm font-medium text-gray-700 mb-1">Maximum Occupancy</label>
                    <input type="number" name="maxOccupancy" id="maxOccupancy" min="1" defaultValue="4" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="unitDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="unitDescription" id="unitDescription" rows={3} className="prime-input" placeholder="Unit features and amenities..."></textarea>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        Add Unit
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}
