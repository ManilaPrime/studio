'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookingsList } from '@/components/dashboard/bookings/bookings-list';
import { AddBookingDialog } from '@/components/dashboard/bookings/add-booking-dialog';

export default function BookingsPage() {
  const [isAddBookingOpen, setIsAddBookingOpen] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
          <p className="text-sm text-gray-500">Manage all reservations</p>
        </div>
        <AddBookingDialog
          open={isAddBookingOpen}
          onOpenChange={setIsAddBookingOpen}
        >
          <button
            onClick={() => setIsAddBookingOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddBookingDialog>
      </div>
      <BookingsList />
    </div>
  );
}
