'use client';

import { useState } from 'react';
import {
  detectBookingConflict,
  DetectBookingConflictOutput,
} from '@/ai/flows/smart-conflict-detection';

export function SmartConflictDetection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectBookingConflictOutput | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const input = {
      calendar1Events: formData.get('calendar1') as string,
      calendar2Events: formData.get('calendar2') as string,
      unitName: formData.get('unitName') as string,
    };

    try {
      const conflictResult = await detectBookingConflict(input);
      setResult(conflictResult);
    } catch (error) {
      console.error('Error detecting conflict:', error);
      alert('An error occurred while checking for conflicts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="prime-card p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="unitName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rental Unit Name
            </label>
            <input
              type="text"
              name="unitName"
              id="unitName"
              className="prime-input"
              placeholder="e.g., Beachside Villa"
              required
            />
          </div>
          <div>
            <label
              htmlFor="calendar1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Calendar 1 (iCal Format)
            </label>
            <textarea
              name="calendar1"
              id="calendar1"
              rows={8}
              className="prime-input"
              placeholder="Paste iCal data from your first platform (e.g., Airbnb)"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="calendar2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Calendar 2 (iCal Format)
            </label>
            <textarea
              name="calendar2"
              id="calendar2"
              rows={8}
              className="prime-input"
              placeholder="Paste iCal data from your second platform (e.g., Booking.com)"
              required
            ></textarea>
          </div>
          <button type="submit" className="prime-button w-full py-3" disabled={loading}>
            {loading ? 'Checking...' : 'Check for Conflicts'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center">
          <p className="text-gray-600">Analyzing calendars for conflicts...</p>
        </div>
      )}

      {result && (
        <div
          className={`prime-card p-4 ${
            result.hasConflict
              ? 'border-red-500 bg-red-50'
              : 'border-green-500 bg-green-50'
          }`}
        >
          <h3 className="text-lg font-bold mb-2">
            {result.hasConflict ? '🚨 Conflict Detected' : '✅ No Conflicts Found'}
          </h3>
          <p
            className={`text-sm ${
              result.hasConflict ? 'text-red-800' : 'text-green-800'
            }`}
          >
            {result.conflictDescription}
          </p>
        </div>
      )}
    </div>
  );
}
