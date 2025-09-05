'use client';

import { useState } from 'react';
import { reminders } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { Reminder } from '@/lib/types';

type FilterType = 'all' | 'pending' | 'overdue' | 'today' | 'completed';

export function RemindersList() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [, setForceUpdate] = useState({}); // To force re-render on data change

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleStatusChange = (reminderId: number, newStatus: 'pending' | 'completed') => {
    const reminder = reminders.find(r => r.id === reminderId);
    if(reminder) {
        reminder.status = newStatus;
        setForceUpdate({}); // Force re-render
    }
  };

  const handleDelete = (reminderId: number) => {
      const index = reminders.findIndex(r => r.id === reminderId);
      if (index > -1) {
          reminders.splice(index, 1);
          setForceUpdate({}); // Force re-render
      }
  }

  const getFilteredReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reminders.filter((reminder) => {
      const dueDate = new Date(reminder.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      switch (filter) {
        case 'pending':
          return reminder.status === 'pending';
        case 'overdue':
          return reminder.status === 'pending' && dueDate < today;
        case 'today':
          return dueDate.getTime() === today.getTime();
        case 'completed':
          return reminder.status === 'completed';
        case 'all':
        default:
          return true;
      }
    });
  };

  const filteredReminders = getFilteredReminders();

  const categoryIcons: Record<Reminder['category'], string> = {
    payment: '💰',
    maintenance: '🔧',
    cleaning: '🧹',
    booking: '📅',
    inspection: '🔍',
    meeting: '👥',
    other: '📝',
  };

  const priorityVariant: Record<Reminder['priority'], string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };
  
  const priorityBorder: Record<Reminder['priority'], string> = {
    high: 'border-l-4 border-red-400',
    medium: 'border-l-4 border-yellow-400',
    low: 'border-l-4 border-green-400',
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {(['all', 'pending', 'overdue', 'today', 'completed'] as FilterType[]).map(
          (f) => (
            <Button
              key={f}
              onClick={() => handleFilterChange(f)}
              variant={filter === f ? 'default' : 'outline'}
              className={`whitespace-nowrap ${filter === f ? 'prime-button' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          )
        )}
      </div>

      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reminders found for this filter.</p>
        ) : (
          filteredReminders.map((reminder) => {
            const isOverdue = new Date(reminder.dueDate) < new Date() && reminder.status === 'pending';
            return (
              <div key={reminder.id} className={`prime-card ${priorityBorder[reminder.priority]}`}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{categoryIcons[reminder.category]}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                        <p className="text-sm text-gray-600">{reminder.category.charAt(0).toUpperCase() + reminder.category.slice(1)}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityVariant[reminder.priority]}`}>
                      {reminder.priority.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                        <p><strong>Due:</strong> {formatDate(reminder.dueDate)} {reminder.dueTime || ''}</p>
                    </div>
                    <div>
                        <p><strong>Status:</strong> {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}</p>
                    </div>
                  </div>

                  {isOverdue && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                          <p className="text-red-800 text-sm font-semibold">⚠️ OVERDUE</p>
                      </div>
                  )}

                  <div className="flex space-x-2">
                    {reminder.status === 'pending' ? (
                        <Button onClick={() => handleStatusChange(reminder.id, 'completed')} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold">
                            Mark Complete
                        </Button>
                    ) : (
                        <Button onClick={() => handleStatusChange(reminder.id, 'pending')} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold">
                            Mark Pending
                        </Button>
                    )}
                    <Button onClick={() => handleDelete(reminder.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-semibold">
                        Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
