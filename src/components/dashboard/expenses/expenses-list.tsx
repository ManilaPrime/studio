'use client';

import { useState } from 'react';
import { expenses, units } from '@/lib/data';
import type { Expense } from '@/lib/types';
import { AddExpenseDialog } from './add-expense-dialog';
import { formatDate } from '@/lib/utils';

export function ExpensesList() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsAddExpenseOpen(true);
  };

  const categoryIcons: Record<Expense['category'], string> = {
    utilities: '⚡️',
    maintenance: '🔧',
    cleaning: '🧹',
    supplies: '📦',
    insurance: '🛡️',
    other: '💸',
  };

  if (expenses.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">No expenses found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const unit = expense.unitId
          ? units.find((u) => u.id === expense.unitId)
          : null;
        return (
          <div key={expense.id} className="prime-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {categoryIcons[expense.category] || '💸'}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {expense.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {expense.category.charAt(0).toUpperCase() +
                      expense.category.slice(1)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">
                  ₱{expense.amount.toLocaleString()}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    expense.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {expense.status.charAt(0).toUpperCase() +
                    expense.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">
                {expense.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>
                    <strong>Date:</strong> {formatDate(expense.date)}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Unit:</strong> {unit ? unit.name : 'All Units'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditExpense(expense)}
                className="flex-1 fb-btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => alert('Deleting expense soon!')}
                className="flex-1 fb-btn bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        expense={selectedExpense}
      />
    </div>
  );
}
