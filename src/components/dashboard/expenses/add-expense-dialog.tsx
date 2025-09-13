
'use client';

import type { Expense, Unit } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function AddExpenseDialog({
  children,
  open,
  onOpenChange,
  expense,
  onAddExpense,
  onUpdateExpense,
  units,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit' : 'Add New'} Expense</DialogTitle>
        </DialogHeader>
        <form
          id="expenseForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseTitle" className="text-right">
              Title
            </Label>
            <Input
              id="expenseTitle"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseCategory" className="text-right">
              Category
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as Expense['category'])}
            >
              <SelectTrigger className="col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseAmount" className="text-right">
              Amount (₱)
            </Label>
            <Input
              id="expenseAmount"
              type="number"
              min="0"
              step="0.01"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseDate" className="text-right">
              Date
            </Label>
            <Input
              id="expenseDate"
              type="date"
              className="col-span-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseUnit" className="text-right">
              Unit
            </Label>
            <Select
              value={unitId ?? ''}
              onValueChange={(v) => setUnitId(v ? v : null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="All Units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Units</SelectItem>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id!}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseStatus" className="text-right">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as Expense['status'])}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expenseDescription" className="text-right">
              Description
            </Label>
            <Textarea
              id="expenseDescription"
              className="col-span-3"
              placeholder="Additional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {expense ? 'Save Changes' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
