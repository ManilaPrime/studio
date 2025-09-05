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
    DialogComponent: AddBookingDialog,
  },
  {
    label: 'Add Unit',
    icon: Building,
    DialogComponent: AddUnitDialog,
  },
  {
    label: 'Add Reminder',
    icon: ClipboardList,
    DialogComponent: AddReminderDialog,
  },
  {
    label: 'Add Expense',
    icon: CircleDollarSign,
    DialogComponent: AddExpenseDialog,
  },
  {
    label: 'Add Investor',
    icon: User,
    DialogComponent: AddInvestorDialog,
  },
  {
    label: 'Add Agent',
    icon: Handshake,
    DialogComponent: AddAgentDialog,
  },
];

export function QuickActions({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void}) {
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  const handleOpenDialog = (label: string) => {
    onOpenChange(false); // Close the quick actions modal
    // A short delay is needed to allow the parent dialog to close first
    setTimeout(() => setOpenDialog(label), 150); 
  };

  const colorClasses = {
    'Add Booking': 'bg-blue-50 hover:bg-blue-100 text-blue-800',
    'Add Unit': 'bg-green-50 hover:bg-green-100 text-green-800',
    'Add Reminder': 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800',
    'Add Expense': 'bg-red-50 hover:bg-red-100 text-red-800',
    'Add Investor': 'bg-purple-50 hover:bg-purple-100 text-purple-800',
    'Add Agent': 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800',
  }

  if(!open) return null;

  return (
    <>
      <div id="quickActionsModal" className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {actionComponents.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleOpenDialog(item.label)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors ${colorClasses[item.label as keyof typeof colorClasses]}`}
                  >
                    <item.icon className="text-3xl mb-2" />
                    <span className="font-semibold">{item.label}</span>
                  </button>
              ))}
            </div>
        </div>
      </div>

      {actionComponents.map((item) => {
          const Dialog = item.DialogComponent;
          return (
            <Dialog
              key={item.label}
              open={openDialog === item.label}
              onOpenChange={(isOpen) =>
                setOpenDialog(isOpen ? item.label : null)
              }
            />
          );
      })}
    </>
  );
}
