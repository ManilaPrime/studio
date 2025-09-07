'use client';

import React from 'react';
import Calendar from '@/components/dashboard/calendar';
import StatsCards from '@/components/dashboard/stats-cards';
import RecentActivity from '@/components/dashboard/recent-activity';
import { bookings as initialBookings, expenses as initialExpenses } from '@/lib/data';
import type { Booking, Expense } from '@/lib/types';

export default function DashboardPage() {
  // In a real app, this state would likely be managed by a global state manager (e.g., Context, Redux)
  // and fetched from an API, but for this example, we'll manage it here.
  const [bookings, setBookings] = React.useState<Booking[]>(initialBookings);
  const [expenses, setExpenses] = React.useState<Expense[]>(initialExpenses);

  return (
    <div id="dashboardSection" className="section p-4">
      <Calendar bookings={bookings} />
      <StatsCards bookings={bookings} expenses={expenses} />
      <RecentActivity bookings={bookings} expenses={expenses} />
    </div>
  );
}
