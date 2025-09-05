'use client';

import React from 'react';
import { ExpensesList } from '@/components/dashboard/expenses/expenses-list';
import { AddExpenseDialog } from '@/components/dashboard/expenses/add-expense-dialog';

export default function ExpensesPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Expenses</h2>
          <p className="text-sm text-gray-500">Track all property expenses</p>
        </div>
        <AddExpenseDialog
          open={isAddExpenseOpen}
          onOpenChange={setIsAddExpenseOpen}
        >
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddExpenseDialog>
      </div>
      <ExpensesList />
    </div>
  );
}
