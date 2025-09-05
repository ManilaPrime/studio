'use client';

import { useState } from 'react';
import type { Unit, SyncedEvent } from '@/lib/types';
import { syncCalendars } from '@/app/actions/sync-calendars';
import { formatDate } from '@/lib/utils';
import { Calendar, Link, List } from 'lucide-react';

export function SmartSyncCard({ unit }: { unit: Unit }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<SyncedEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setError(null);
    setEvents([]);
    try {
      const result = await syncCalendars(unit.calendars);
      setEvents(result);
      if (result.length === 0) {
        setError('No events found in the provided calendars. The URLs might be incorrect, empty, or placeholder examples.');
      }
    } catch (e) {
      console.error('Syncing failed:', e);
      setError('An error occurred while syncing calendars. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };
  
  const platformColors = {
    'Airbnb': 'bg-red-50 text-red-700 border-red-200',
    'Booking.com': 'bg-blue-50 text-blue-700 border-blue-200',
    'Direct': 'bg-green-50 text-green-700 border-green-200',
  }

  return (
    <div className="fb-card">
      <div className="fb-header">
        <h3 className="font-semibold text-gray-800 text-lg">{unit.name} - Calendar Sync</h3>
        <button
          onClick={handleSync}
          className="fb-btn fb-btn-primary"
          disabled={loading}
        >
          {loading ? 'Syncing...' : 'Sync Calendars'}
        </button>
      </div>
      <div className="fb-content">
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-sm text-gray-600">
            <Link className="w-4 h-4 mr-2" /> 
            <span className="font-semibold mr-2">Airbnb:</span>
            <span className="truncate text-gray-500">{unit.calendars.airbnb}</span>
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <Link className="w-4 h-4 mr-2" /> 
            <span className="font-semibold mr-2">Booking.com:</span>
            <span className="truncate text-gray-500">{unit.calendars.bookingcom}</span>
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <Link className="w-4 h-4 mr-2" /> 
            <span className="font-semibold mr-2">Direct:</span>
            <span className="truncate text-gray-500">{unit.calendars.direct}</span>
          </p>
        </div>

        {loading && (
          <div className="text-center p-4">
            <p className="text-gray-600">Fetching and parsing calendar data...</p>
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm">
            <p>{error}</p>
          </div>
        )}

        {events.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <List className="w-5 h-5 mr-2" />
              Synced Bookings
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {events.map((event) => (
                <div key={event.uid} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                   <div className="flex items-center justify-between">
                     <p className="font-semibold text-gray-800 truncate">{event.summary}</p>
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${platformColors[event.platform]}`}>
                       {event.platform}
                     </span>
                   </div>
                   <p className="text-sm text-gray-600 flex items-center mt-1">
                     <Calendar className="w-4 h-4 mr-2" />
                     {formatDate(event.start)} - {formatDate(event.end)}
                   </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
