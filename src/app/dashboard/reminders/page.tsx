'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RemindersList } from '@/components/dashboard/reminders/reminders-list';
import { AddReminderDialog } from '@/components/dashboard/reminders/add-reminder-dialog';

export default function RemindersPage() {
  const [isAddReminderOpen, setIsAddReminderOpen] = React.useState(false);

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
        >
          <Button
            onClick={() => setIsAddReminderOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </Button>
        </AddReminderDialog>
      </div>
      <RemindersList />
    </div>
  );
}
