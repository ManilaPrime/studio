'use client';

import {
  CalendarDays,
  Building,
  ClipboardList,
  CircleDollarSign,
  User,
  Handshake,
} from 'lucide-react';
import React from 'react';
import { AddBookingDialog } from './bookings/add-booking-dialog';
import { AddUnitDialog } from './units/add-unit-dialog';

const actionComponents = [
  {
    label: 'Add Booking',
    icon: CalendarDays,
    color: 'blue',
    DialogComponent: AddBookingDialog,
  },
  {
    label: 'Add Unit',
    icon: Building,
    color: 'green',
    DialogComponent: AddUnitDialog,
  },
  {
    label: 'Add Reminder',
    icon: ClipboardList,
    color: 'yellow',
    action: () => alert('Add Reminder'),
  },
  {
    label: 'Add Expense',
    icon: CircleDollarSign,
    color: 'red',
    action: () => alert('Add Expense'),
  },
  {
    label: 'Add Investor',
    icon: User,
    color: 'purple',
    action: () => alert('Add Investor'),
  },
  {
    label: 'Add Agent',
    icon: Handshake,
    color: 'indigo',
    action: () => alert('Add Agent'),
  },
];

export function QuickActions() {
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {actionComponents.map((item) => {
        if (item.DialogComponent) {
          const Dialog = item.DialogComponent;
          return (
            <Dialog
              key={item.label}
              open={openDialog === item.label}
              onOpenChange={(isOpen) =>
                setOpenDialog(isOpen ? item.label : null)
              }
            >
              <button
                onClick={() => setOpenDialog(item.label)}
                className={`flex flex-col items-center p-4 bg-${item.color}-50 rounded-lg hover:bg-${item.color}-100 transition-colors`}
              >
                <item.icon className={`text-3xl mb-2 text-${item.color}-800`} />
                <span className={`font-semibold text-${item.color}-800`}>
                  {item.label}
                </span>
              </button>
            </Dialog>
          );
        }
        return (
          <button
            key={item.label}
            onClick={item.action}
            className={`flex flex-col items-center p-4 bg-${item.color}-50 rounded-lg hover:bg-${item.color}-100 transition-colors`}
          >
            <item.icon className={`text-3xl mb-2 text-${item.color}-800`} />
            <span className={`font-semibold text-${item.color}-800`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
