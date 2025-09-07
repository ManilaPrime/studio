'use client';

import React from 'react';
import { RemindersList } from '@/components/dashboard/reminders/reminders-list';
import { AddReminderDialog } from '@/components/dashboard/reminders/add-reminder-dialog';
import { reminders as initialReminders } from '@/lib/data';
import type { Reminder } from '@/lib/types';

export default function RemindersPage() {
  const [reminders, setReminders] = React.useState<Reminder[]>(initialReminders);
  const [isAddReminderOpen, setIsAddReminderOpen] = React.useState(false);

  const addReminder = (newReminderData: Omit<Reminder, 'id' | 'createdAt' | 'status'>) => {
    const newReminder: Reminder = {
      ...newReminderData,
      id: Math.max(0, ...reminders.map((r) => r.id)) + 1,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setReminders((prev) => [...prev, newReminder]);
  };

  const updateReminderStatus = (reminderId: number, status: 'pending' | 'completed') => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminderId ? { ...r, status } : r))
    );
  };

  const deleteReminder = (reminderId: number) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
        setReminders((prev) => prev.filter((r) => r.id !== reminderId));
    }
  };


  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reminders</h2>
          <p className="text-sm text-gray-500">Task management system</p>
        </div>
        <AddReminderDialog
          open={isAddReminderOpen}
          onOpenChange={setIsAddReminderOpen}
          onAddReminder={addReminder}
        >
          <button
            onClick={() => setIsAddReminderOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddReminderDialog>
      </div>
      <RemindersList 
        reminders={reminders}
        onUpdateStatus={updateReminderStatus}
        onDelete={deleteReminder}
      />
    </div>
  );
}
