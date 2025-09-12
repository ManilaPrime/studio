
'use client';

import type { Unit } from '@/lib/types';
import { useEffect, useState } from 'react';

export function EditUnitDialog({
  open,
  onOpenChange,
  unit,
  onUpdateUnit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit | null;
  onUpdateUnit: (unit: Unit) => void;
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState(0);
  const [maxOccupancy, setMaxOccupancy] = useState(0);
  const [description, setDescription] = useState('');
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [bookingcomUrl, setBookingcomUrl] = useState('');
  const [directUrl, setDirectUrl] = useState('');


  useEffect(() => {
    if (unit) {
      setName(unit.name);
      setType(unit.type);
      setRate(unit.rate);
      setMaxOccupancy(unit.maxOccupancy);
      setDescription(unit.description);
      setAirbnbUrl(unit.calendars.airbnb);
      setBookingcomUrl(unit.calendars.bookingcom);
      setDirectUrl(unit.calendars.direct);
    }
  }, [unit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!unit) return;

    const updatedUnit = {
      ...unit,
      name,
      type,
      rate,
      maxOccupancy,
      description,
      calendars: {
        airbnb: airbnbUrl,
        bookingcom: bookingcomUrl,
        direct: directUrl,
      },
    };
    onUpdateUnit(updatedUnit);
    onOpenChange(false);
  };
  
  if (!open) {
    return null;
  }

  return (
    <div id="editUnitModal" className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit {unit?.name}</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="editUnitForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="unitName" className="block text-sm font-medium text-gray-700 mb-1">Unit Name</label>
                    <input type="text" id="unitName" className="prime-input" value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor="unitType" className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                    <select id="unitType" className="prime-input" value={type} onChange={e=>setType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="Studio">Studio</option>
                        <option value="1BR">1 Bedroom</option>                        
                        <option value="2BR">2 Bedroom</option>
                        <option value="3BR">3 Bedroom</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="unitRate" className="block text-sm font-medium text-gray-700 mb-1">Nightly Rate (₱)</label>
                    <input type="number" id="unitRate" min="0" step="100" className="prime-input" value={rate} onChange={e=>setRate(parseInt(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor="maxOccupancy" className="block text-sm font-medium text-gray-700 mb-1">Maximum Occupancy</label>
                    <input type="number" id="maxOccupancy" min="1" className="prime-input" value={maxOccupancy} onChange={e=>setMaxOccupancy(parseInt(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor="unitDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="unitDescription" rows={3} className="prime-input" placeholder="Unit features and amenities..." value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Calendar iCal Links</h4>
                  <div>
                      <label htmlFor="airbnbUrl" className="block text-sm font-medium text-gray-700 mb-1">Airbnb URL</label>
                      <input type="url" id="airbnbUrl" className="prime-input" placeholder="https://www.airbnb.com/calendar/ical/..." value={airbnbUrl} onChange={e=>setAirbnbUrl(e.target.value)} />
                  </div>
                   <div>
                      <label htmlFor="bookingcomUrl" className="block text-sm font-medium text-gray-700 mb-1 mt-2">Booking.com URL</label>
                      <input type="url" id="bookingcomUrl" className="prime-input" placeholder="https://admin.booking.com/hotel/hoteladmin/ical.html?t=..." value={bookingcomUrl} onChange={e=>setBookingcomUrl(e.target.value)} />
                  </div>
                   <div>
                      <label htmlFor="directUrl" className="block text-sm font-medium text-gray-700 mb-1 mt-2">Direct URL</label>
                      <input type="url" id="directUrl" className="prime-input" placeholder="https://example.com/ical/..." value={directUrl} onChange={e=>setDirectUrl(e.target.value)} />
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
