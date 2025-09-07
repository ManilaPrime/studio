import React from 'react';
import { ActivityPaymentIcon, ActivityBookingIcon } from './icons';
import type { Booking, Expense } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface RecentActivityProps {
  bookings: Booking[];
  expenses: Expense[];
}

const RecentActivity = ({ bookings, expenses }: RecentActivityProps) => {
  const bookingActivities = bookings.slice(0, 2).map(b => ({
    type: 'booking' as const,
    icon: ActivityBookingIcon,
    title: 'New booking',
    description: `${b.guestFirstName} ${b.guestLastName} - ₱${b.totalAmount.toLocaleString()}`,
    time: formatDate(b.createdAt),
    color: 'blue'
  }));

  const expenseActivities = expenses.slice(0, 1).map(e => ({
    type: 'expense' as const,
    icon: ActivityPaymentIcon,
    title: 'Expense paid',
    description: `${e.title} - ₱${e.amount.toLocaleString()}`,
    time: formatDate(e.date),
    color: 'green'
  }));

  const activities = [...bookingActivities, ...expenseActivities]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 3);


  const colorVariants: { [key: string]: string } = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="fb-card">
      <div className="fb-header">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="fb-content">
        <div className="space-y-3">
          {activities.length > 0 ? activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorVariants[activity.color]}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
