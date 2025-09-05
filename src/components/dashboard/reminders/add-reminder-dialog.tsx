'use client';

import { reminders } from '@/lib/data';
import { useEffect } from 'react';

export function AddReminderDialog({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById(
        'reminderDate'
      ) as HTMLInputElement;
      if (dateInput) {
        dateInput.min = today;
        dateInput.value = today;
      }
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReminder = {
      id: Math.max(...reminders.map((r) => r.id), 0) + 1,
      title: formData.get('reminderTitle') as string,
      description: formData.get('reminderDescription') as string,
      category: formData.get('reminderCategory') as
        | 'payment'
        | 'maintenance'
        | 'cleaning'
        | 'booking'
        | 'inspection'
        | 'meeting'
        | 'other',
      priority: formData.get('reminderPriority') as 'high' | 'medium' | 'low',
      dueDate: formData.get('reminderDate') as string,
      dueTime: formData.get('reminderTime') as string,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    reminders.push(newReminder);
    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addReminderModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Reminder</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="reminderForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reminderTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" name="reminderTitle" id="reminderTitle" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="reminderDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="reminderDescription" id="reminderDescription" rows={3} className="prime-input" placeholder="Additional details..."></textarea>
                </div>
                
                <div>
                    <label htmlFor="reminderCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="reminderCategory" id="reminderCategory" className="prime-input" required>
                        <option value="">Select Category</option>
                        <option value="payment">Payment</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="booking">Booking</option>
                        <option value="inspection">Inspection</option>
                        <option value="meeting">Meeting</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="reminderPriority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select name="reminderPriority" id="reminderPriority" className="prime-input" defaultValue="medium" required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <input name="reminderDate" id="reminderDate" type="date" className="prime-input" required />
                    </div>
                    <div>
                        <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
                        <input name="reminderTime" id="reminderTime" type="time" className="prime-input" />
                    </div>
                </div>
                
                <div className="flex space-x-3">
                    <button type="button" onClick={() => onOpenChange(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 prime-button py-3 rounded-lg font-semibold">
                        Add Reminder
                    </button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}
