'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [notificationCount, setNotificationCount] = useState(2); // Sample count

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    window.location.href = '/';
  };

  return (
    <header className="mobile-header">
      {/* Main Header Section */}
      <div className="px-4 py-3 bg-yellow-400">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-yellow-600 text-sm font-bold professional-title">MP</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-black professional-title truncate">Manila Prime</h1>
              <p className="text-xs text-black professional-subtitle">Management App</p>
            </div>
          </div>
          
          {/* Notification and Settings */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center relative border border-gray-300 hover:border-yellow-600 transition-colors">
              <span className="text-gray-600 text-lg">🔔</span>
              {notificationCount > 0 && (
                <span id="notificationBadge" className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            <button onClick={handleLogout} className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:border-yellow-600 transition-colors">
              <span className="text-gray-600 text-lg">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Date Display */}
      <div className="px-4 py-2 bg-yellow-300 border-t border-yellow-500">
        <div className="text-center">
          <p id="currentDate" className="text-xs font-medium text-black professional-subtitle">
            {currentDate}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
