'use client';

import { useState, useMemo } from 'react';
import { bookings } from '@/lib/data';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarGrid = useMemo(() => {
    const grid = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayBookings = bookings.filter(booking => {
        const checkin = new Date(booking.checkinDate);
        checkin.setHours(0,0,0,0);
        const checkout = new Date(booking.checkoutDate);
        checkout.setHours(0,0,0,0);
        const currentDate = new Date(dateStr);
        return checkin <= currentDate && checkout > currentDate;
      });

      let statusClass = 'status-available';
      if (dayBookings.length > 0) {
        statusClass = dayBookings[0].paymentStatus === 'paid' ? 'status-booked' : 'status-pending';
      }

      const today = new Date();
      today.setHours(0,0,0,0);
      const isToday = new Date(dateStr).getTime() === today.getTime();

      grid.push(
        <div key={day} className={`calendar-day w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 ${statusClass} ${isToday ? 'shadow-[0_0_0_2px_#3B82F6]' : ''}`}>
          {day}
        </div>
      );
    }
    return grid;
  }, [currentYear, currentMonth, firstDay, daysInMonth]);

  const previousMonth = () => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-yellow-400">
          <div className="flex items-center justify-between">
            <button onClick={previousMonth} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm">
              <span className="text-base text-black font-bold">‹</span>
            </button>
            <h4 id="currentMonth" className="text-base font-bold text-black professional-title">
              {monthNames[currentMonth]} {currentYear}
            </h4>
            <button onClick={nextMonth} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm">
              <span className="text-base text-black font-bold">›</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-600 py-1">{day}</div>
            ))}
          </div>
          
          <div id="calendarGrid" className="grid grid-cols-7 gap-1 mb-4">
            {calendarGrid}
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-xs pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-white border-2 border-gray-300 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
              <span className="text-gray-600">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;