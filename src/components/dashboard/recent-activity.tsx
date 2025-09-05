import React from 'react';

const RecentActivity = () => {
  const activities = [
    { icon: '💰', title: 'Payment received', description: 'Anna Rodriguez - ₱7,500', time: '2h', color: 'green' },
    { icon: '📅', title: 'New booking', description: 'Michael Chen - Unit 1586 C2', time: '5h', color: 'blue' }
  ];

  return (
    <div className="fb-card">
      <div className="fb-header">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="fb-content">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`fb-avatar w-10 h-10`}>
                <span className={`text-${activity.color}-600`}>{activity.icon}</span>
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