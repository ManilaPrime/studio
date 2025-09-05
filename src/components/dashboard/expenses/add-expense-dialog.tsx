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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { expenses, units } from '@/lib/data';
import type { Expense } from '@/lib/types';
import { useEffect } from 'react';

export function AddExpenseDialog({
  children,
  open,
  onOpenChange,
  expense
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
}) {
    useEffect(() => {
        if(open && !expense) {
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('expenseDate') as HTMLInputElement;
            if(dateInput) dateInput.value = today;
        }
    }, [open, expense]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (expense) {
        // Update existing expense
        const existingExpense = expenses.find(ex => ex.id === expense.id);
        if (existingExpense) {
            existingExpense.title = formData.get('expenseTitle') as string;
            existingExpense.category = formData.get('expenseCategory') as Expense['category'];
            existingExpense.amount = parseFloat(formData.get('expenseAmount') as string);
            existingExpense.date = formData.get('expenseDate') as string;
            const unitId = formData.get('expenseUnit') as string;
            existingExpense.unitId = unitId ? parseInt(unitId) : null;
            existingExpense.description = formData.get('expenseDescription') as string;
            existingExpense.status = formData.get('expenseStatus') as Expense['status'];
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit' : 'Add New'} Expense</DialogTitle>
        </DialogHeader>
        <form id="expenseForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="expenseTitle">Title</Label>
            <Input name="expenseTitle" id="expenseTitle" className="prime-input" defaultValue={expense?.title} required />
          </div>
          <div>
            <Label htmlFor="expenseCategory">Category</Label>
            <Select name="expenseCategory" defaultValue={expense?.category} required>
                <SelectTrigger className="prime-input">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expenseAmount">Amount (₱)</Label>
            <Input name="expenseAmount" id="expenseAmount" type="number" min="0" step="0.01" className="prime-input" defaultValue={expense?.amount} required />
          </div>
          <div>
            <Label htmlFor="expenseDate">Date</Label>
            <Input name="expenseDate" id="expenseDate" type="date" className="prime-input" defaultValue={expense?.date} required />
          </div>
          <div>
            <Label htmlFor="expenseUnit">Unit (Optional)</Label>
            <Select name="expenseUnit" defaultValue={expense?.unitId?.toString()}>
                <SelectTrigger className="prime-input">
                    <SelectValue placeholder="Select Unit or All Units" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Units</SelectItem>
                    {units.map(unit => (
                        <SelectItem key={unit.id} value={String(unit.id)}>{unit.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
           <div>
            <Label htmlFor="expenseStatus">Status</Label>
            <Select name="expenseStatus" defaultValue={expense?.status || 'paid'} required>
                <SelectTrigger className="prime-input">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expenseDescription">Description</Label>
            <Textarea name="expenseDescription" id="expenseDescription" rows={3} className="prime-input" placeholder="Additional details..." defaultValue={expense?.description} />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              {expense ? 'Save Changes' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
