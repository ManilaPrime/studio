'use client';

import { expenses, units } from '@/lib/data';
import type { Expense } from '@/lib/types';
import { useEffect } from 'react';

export function AddExpenseDialog({
  children,
  open,
  onOpenChange,
  expense,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
}) {
  useEffect(() => {
    if (open && !expense) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById(
        'expenseDate'
      ) as HTMLInputElement;
      if (dateInput) dateInput.value = today;
    }
  }, [open, expense]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (expense) {
      // Update existing expense
      const existingExpense = expenses.find((ex) => ex.id === expense.id);
      if (existingExpense) {
        existingExpense.title = formData.get('expenseTitle') as string;
        existingExpense.category = formData.get(
          'expenseCategory'
        ) as Expense['category'];
        existingExpense.amount = parseFloat(
          formData.get('expenseAmount') as string
        );
        existingExpense.date = formData.get('expenseDate') as string;
        const unitId = formData.get('expenseUnit') as string;
        existingExpense.unitId = unitId ? parseInt(unitId) : null;
        existingExpense.description = formData.get(
          'expenseDescription'
        ) as string;
        existingExpense.status = formData.get(
          'expenseStatus'
        ) as Expense['status'];
      }
    } else {
      // Add new expense
      const unitId = formData.get('expenseUnit') as string;
      const newExpense: Expense = {
        id: Math.max(...expenses.map((ex) => ex.id), 0) + 1,
        title: formData.get('expenseTitle') as string,
        category: formData.get('expenseCategory') as Expense['category'],
        amount: parseFloat(formData.get('expenseAmount') as string),
        date: formData.get('expenseDate') as string,
        unitId: unitId ? parseInt(unitId) : null,
        description: formData.get('expenseDescription') as string,
        status: formData.get('expenseStatus') as Expense['status'],
      };
      expenses.push(newExpense);
    }

    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
    {children}
    <div id="addExpenseModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{expense ? 'Edit' : 'Add New'} Expense</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="expenseForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="expenseTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" name="expenseTitle" id="expenseTitle" className="prime-input" defaultValue={expense?.title} required />
                </div>
                
                <div>
                    <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="expenseCategory" id="expenseCategory" className="prime-input" defaultValue={expense?.category} required>
                        <option value="">Select Category</option>
                        <option value="utilities">Utilities</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="supplies">Supplies</option>
                        <option value="insurance">Insurance</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                    <input type="number" name="expenseAmount" id="expenseAmount" min="0" step="0.01" className="prime-input" defaultValue={expense?.amount} required />
                </div>
                
                <div>
                    <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="expenseDate" id="expenseDate" className="prime-input" defaultValue={expense?.date} required />
                </div>
                
                <div>
                    <label htmlFor="expenseUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit (Optional)</label>
                    <select name="expenseUnit" id="expenseUnit" className="prime-input" defaultValue={expense?.unitId?.toString()}>
                        <option value="">All Units</option>
                        {units.map(unit => (
                            <option key={unit.id} value={String(unit.id)}>{unit.name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="expenseStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="expenseStatus" id="expenseStatus" className="prime-input" defaultValue={expense?.status || 'paid'} required>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="expenseDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="expenseDescription" id="expenseDescription" rows={3} className="prime-input" placeholder="Additional details..." defaultValue={expense?.description}></textarea>
                </div>
                
                <div className="flex space-x-3">
                    <button type="button" onClick={() => onOpenChange(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 prime-button py-3 rounded-lg font-semibold">
                        {expense ? 'Save Changes' : 'Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}
