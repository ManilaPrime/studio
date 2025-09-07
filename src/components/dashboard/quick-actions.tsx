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

const actionComponents = [
  {
    label: 'Add Booking',
    icon: CalendarDays,
  },
  {
    label: 'Add Unit',
    icon: Building,
  },
  {
    label: 'Add Reminder',
    icon: ClipboardList,
  },
  {
    label: 'Add Expense',
    icon: CircleDollarSign,
  },
  {
    label: 'Add Investor',
    icon: User,
  },
  {
    label: 'Add Agent',
    icon: Handshake,
  },
];

export function QuickActions({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void}) {

  const handleOpenDialog = (label: string) => {
    onOpenChange(false);
    alert(`Please use the '+ Add' button on the respective page to ${label}.`);
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
      <div id="quickActionsModal" className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
        <div className="bg-white rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
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
    </>
  );
}
