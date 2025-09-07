'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { BookingsList } from '@/components/dashboard/bookings/bookings-list';
import { AddBookingDialog } from '@/components/dashboard/bookings/add-booking-dialog';
import { bookings as initialBookings } from '@/lib/data';
import type { Booking } from '@/lib/types';

export default function BookingsPage() {
  const [bookings, setBookings] = React.useState<Booking[]>(initialBookings);
  const [isAddBookingOpen, setIsAddBookingOpen] = React.useState(false);

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...newBookingData,
      id: Math.max(0, ...bookings.map((b) => b.id)) + 1,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const deleteBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };


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
          onAddBooking={addBooking}
        >
          <button
            onClick={() => setIsAddBookingOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddBookingDialog>
      </div>
      <BookingsList bookings={bookings} onDelete={deleteBooking} />
    </div>
  );
}
