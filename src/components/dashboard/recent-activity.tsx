import React from 'react';
import { ActivityPaymentIcon, ActivityBookingIcon } from './icons';

const RecentActivity = () => {
  const activities = [
    { icon: ActivityPaymentIcon, title: 'Payment received', description: 'Anna Rodriguez - ₱7,500', time: '2h', color: 'green' },
    { icon: ActivityBookingIcon, title: 'New booking', description: 'Michael Chen - Unit 1586 C2', time: '5h', color: 'blue' }
  ];

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
          {activities.map((activity, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
