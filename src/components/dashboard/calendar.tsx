'use client';

import { useState, useMemo, useEffect } from 'react';
import { bookings } from '@/lib/data';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // This avoids the hydration mismatch.
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
  }, []);


  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarGrid = useMemo(() => {
    if (!today) {
        // Render placeholders or a loading state until the client-side `today` is set
        return Array.from({ length: 35 }).map((_, i) => (
            <div key={`placeholder-${i}`} className="w-8 h-8"></div>
        ));
    }

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

      let statusClass = 'bg-white border-2 border-gray-200 text-gray-800'; // Available
      if (dayBookings.length > 0) {
        statusClass = dayBookings[0].paymentStatus === 'paid' 
          ? 'bg-yellow-400 text-black border-2 border-yellow-400' // Booked
          : 'bg-yellow-200 text-black border-2 border-yellow-500'; // Pending
      }

      const isToday = today ? new Date(dateStr).getTime() === today.getTime() : false;
      const todayClass = isToday ? 'shadow-[0_0_0_2px_#3B82F6]' : '';

      grid.push(
        <div key={day} className={`calendar-day w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 ${statusClass} ${todayClass}`}>
          {day}
        </div>
      );
    }
    return grid;
  }, [currentYear, currentMonth, firstDay, daysInMonth, today]);

  const previousMonth = () => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  return (
    <div className="fb-card">
      <div className="fb-header">
        <h4 id="currentMonth" className="text-base font-bold text-black professional-title">
            {monthNames[currentMonth]} {currentYear}
        </h4>
        <div className="flex items-center">
            <button onClick={previousMonth} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm border">
                <span className="text-base text-black font-bold">‹</span>
            </button>
            <button onClick={nextMonth} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm border ml-2">
                <span className="text-base text-black font-bold">›</span>
            </button>
        </div>
      </div>
        
      <div className="fb-content">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-600 py-1">{day}</div>
            ))}
          </div>
          
          <div id="calendarGrid" className="grid grid-cols-7 gap-1 place-items-center mb-4">
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
  );
};

export default Calendar;
