'use client';

import React from 'react';
import { ExpensesList } from '@/components/dashboard/expenses/expenses-list';
import { AddExpenseDialog } from '@/components/dashboard/expenses/add-expense-dialog';
import { expenses as initialExpenses } from '@/lib/data';
import type { Expense } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = React.useState<Expense[]>(initialExpenses);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(null);

  const handleOpenAddDialog = () => {
    setSelectedExpense(null);
    setIsAddExpenseOpen(true);
  };
  
  const handleOpenEditDialog = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsAddExpenseOpen(true);
  };

  const addExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: Math.max(0, ...expenses.map((e) => e.id)) + 1,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setSelectedExpense(null);
  }

  const deleteExpense = (expenseId: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
        setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    }
  };

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
          onAddExpense={addExpense}
          onUpdateExpense={updateExpense}
          expense={selectedExpense}
        >
          <button
            onClick={handleOpenAddDialog}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddExpenseDialog>
      </div>
      <ExpensesList expenses={expenses} onEdit={handleOpenEditDialog} onDelete={deleteExpense} />
    </div>
  );
}
