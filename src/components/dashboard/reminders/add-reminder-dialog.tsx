'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
    if(open) {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('reminderDate') as HTMLInputElement;
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
      category: formData.get('reminderCategory') as 'payment' | 'maintenance' | 'cleaning' | 'booking' | 'inspection' | 'meeting' | 'other',
      priority: formData.get('reminderPriority') as 'high' | 'medium' | 'low',
      dueDate: formData.get('reminderDate') as string,
      dueTime: formData.get('reminderTime') as string,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    reminders.push(newReminder);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
        </DialogHeader>
        <form id="reminderForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="reminderTitle" className="mb-1">
              Title
            </Label>
            <Input name="reminderTitle" id="reminderTitle" className="prime-input" required />
          </div>

          <div>
            <Label htmlFor="reminderDescription" className="mb-1">
              Description
            </Label>
            <Textarea
              name="reminderDescription"
              id="reminderDescription"
              rows={3}
              className="prime-input"
              placeholder="Additional details..."
            />
          </div>

          <div>
            <Label htmlFor="reminderCategory" className="mb-1">
              Category
            </Label>
            <Select name="reminderCategory" required>
              <SelectTrigger className="prime-input">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reminderPriority" className="mb-1">
              Priority
            </Label>
            <Select name="reminderPriority" defaultValue="medium" required>
              <SelectTrigger className="prime-input">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reminderDate" className="mb-1">
                Due Date
              </Label>
              <Input name="reminderDate" id="reminderDate" type="date" className="prime-input" required />
            </div>
            <div>
              <Label htmlFor="reminderTime" className="mb-1">
                Due Time
              </Label>
              <Input name="reminderTime" id="reminderTime" type="time" className="prime-input" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              Add Reminder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
