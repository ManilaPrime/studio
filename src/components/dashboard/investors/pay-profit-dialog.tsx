
'use client';

import type { Investor, ProfitPayment } from '@/lib/types';
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

export function PayProfitDialog({
  open,
  onOpenChange,
  investor,
  onRecordPayment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
  onRecordPayment: (payment: Omit<ProfitPayment, 'id' | 'status'>) => void;
}) {
  const [suggestedAmount, setSuggestedAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMonth, setPaymentMonth] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  useEffect(() => {
    if (open && investor) {
      const today = new Date();
      setPaymentDate(today.toISOString().split('T')[0]);
      setPaymentMonth(today.toISOString().slice(0, 7));

      // Calculate suggested profit amount
      const monthlyProfit = 32500; // Sample current month profit
      const amount = (monthlyProfit * investor.sharePercentage) / 100;
      setSuggestedAmount(amount);
      setPaymentAmount(amount);
    }
  }, [open, investor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!investor) return;

    const formData = new FormData(e.currentTarget);
    const newPayment = {
      investorId: investor.id!,
      month: formData.get('paymentMonth') as string,
      amount: parseFloat(formData.get('profitAmount') as string),
      paymentDate: formData.get('paymentDate') as string,
      paymentMethod: formData.get('paymentMethod') as
        | 'bank_transfer'
        | 'gcash'
        | 'cash'
        | 'check',
      notes: formData.get('paymentNotes') as string,
    };

    onRecordPayment(newPayment);
    onOpenChange(false);
  };

  if (!investor) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Profit Payment for {investor.name}</DialogTitle>
        </DialogHeader>
        <form
          id="profitPaymentForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentMonth" className="text-right">
              Month
            </Label>
            <Input
              id="paymentMonth"
              name="paymentMonth"
              type="month"
              className="col-span-3"
              value={paymentMonth}
              onChange={(e) => setPaymentMonth(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profitAmount" className="text-right">
              Amount (₱)
            </Label>
            <Input
              id="profitAmount"
              name="profitAmount"
              type="number"
              min="0"
              className="col-span-3"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentDate" className="text-right">
              Date
            </Label>
            <Input
              id="paymentDate"
              name="paymentDate"
              type="date"
              className="col-span-3"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentMethod" className="text-right">
              Method
            </Label>
            <Select name="paymentMethod" required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="gcash">GCash</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentNotes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="paymentNotes"
              name="paymentNotes"
              className="col-span-3"
              placeholder="Additional notes..."
            />
          </div>
          <DialogFooter>
            <Button type="submit">Record Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
