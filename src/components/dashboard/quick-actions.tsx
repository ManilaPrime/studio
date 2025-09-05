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
import { AddReminderDialog } from './reminders/add-reminder-dialog';
import { AddExpenseDialog } from './expenses/add-expense-dialog';
import { AddInvestorDialog } from './investors/add-investor-dialog';
import { AddAgentDialog } from './agents/add-agent-dialog';


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
    DialogComponent: AddReminderDialog,
  },
  {
    label: 'Add Expense',
    icon: CircleDollarSign,
    color: 'red',
    DialogComponent: AddExpenseDialog,
  },
  {
    label: 'Add Investor',
    icon: User,
    color: 'purple',
    DialogComponent: AddInvestorDialog,
  },
  {
    label: 'Add Agent',
    icon: Handshake,
    color: 'indigo',
    DialogComponent: AddAgentDialog,
  },
];

export function QuickActions() {
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  const handleOpenDialog = (label: string) => {
    // We must close the current dialog before opening a new one
    // when chaining dialogs from the QuickActions menu.
    const quickActionsDialogTrigger = document.querySelector('[aria-label="Quick Actions"]') as HTMLElement | null;
    if(quickActionsDialogTrigger) {
      quickActionsDialogTrigger.click();
    }
    setTimeout(() => setOpenDialog(label), 100);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {actionComponents.map((item) => {
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
              onClick={() => handleOpenDialog(item.label)}
              className={`flex flex-col items-center p-4 bg-${item.color}-50 rounded-lg hover:bg-${item.color}-100 transition-colors`}
            >
              <item.icon className={`text-3xl mb-2 text-${item.color}-800`} />
              <span className={`font-semibold text-${item.color}-800`}>
                {item.label}
              </span>
            </button>
          </Dialog>
        );
      })}
    </div>
  );
}
