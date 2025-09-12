
'use client';

import type { Expense, Unit } from '@/lib/types';
import { useEffect, useState } from 'react';

export function AddExpenseDialog({
  children,
  open,
  onOpenChange,
  expense,
  onAddExpense,
  onUpdateExpense,
  units
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
  onAddExpense: (data: Omit<Expense, 'id'>) => void;
  onUpdateExpense: (expense: Expense) => void;
  units: Unit[];
}) {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Expense['category']>('other');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [unitId, setUnitId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Expense['status']>('paid');


  useEffect(() => {
    if (open) {
      if (expense) {
        setTitle(expense.title);
        setCategory(expense.category);
        setAmount(expense.amount);
        setDate(expense.date);
        setUnitId(expense.unitId);
        setDescription(expense.description);
        setStatus(expense.status);
      } else {
        // Reset form for new expense
        setTitle('');
        setCategory('other');
        setAmount(0);
        setDate(new Date().toISOString().split('T')[0]);
        setUnitId(null);
        setDescription('');
        setStatus('paid');
      }
    }
  }, [open, expense]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const expenseData = {
      title,
      category,
      amount,
      date,
      unitId,
      description,
      status,
    };

    if (expense) {
      onUpdateExpense({ ...expense, ...expenseData });
    } else {
      onAddExpense(expenseData);
    }

    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
    {children}
    <div id="addExpenseModal" className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-full overflow-y-auto z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{expense ? 'Edit' : 'Add New'} Expense</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="expenseForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="expenseTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" id="expenseTitle" className="prime-input" value={title} onChange={e=>setTitle(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="expenseCategory" className="prime-input" value={category} onChange={e=>setCategory(e.target.value as Expense['category'])} required>
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
                    <input type="number" id="expenseAmount" min="0" step="0.01" className="prime-input" value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" id="expenseDate" className="prime-input" value={date} onChange={e=>setDate(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor="expenseUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit (Optional)</label>
                    <select id="expenseUnit" className="prime-input" value={unitId ?? ''} onChange={e=>setUnitId(e.target.value ? e.target.value : null)}>
                        <option value="">All Units</option>
                        {units.map(unit => (
                            <option key={unit.id} value={String(unit.id)}>{unit.name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="expenseStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select id="expenseStatus" className="prime-input" value={status} onChange={e=>setStatus(e.target.value as Expense['status'])} required>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="expenseDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="expenseDescription" rows={3} className="prime-input" placeholder="Additional details..." value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        {expense ? 'Save Changes' : 'Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}
