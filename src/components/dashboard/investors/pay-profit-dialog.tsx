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
import { investors, profitPayments } from '@/lib/data';
import type { Investor } from '@/lib/types';
import { useEffect, useState } from 'react';

export function PayProfitDialog({
  open,
  onOpenChange,
  investor
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
}) {

    const [suggestedAmount, setSuggestedAmount] = useState(0);

    useEffect(() => {
        if (open && investor) {
             const today = new Date().toISOString().split('T')[0];
             const dateInput = document.getElementById('paymentDate') as HTMLInputElement;
             if(dateInput) dateInput.value = today;

             const currentMonthInput = document.getElementById('paymentMonth') as HTMLInputElement;
             if(currentMonthInput) currentMonthInput.value = new Date().toISOString().slice(0, 7);

             // Calculate suggested profit amount
             const monthlyProfit = 32500; // Sample current month profit
             const amount = monthlyProfit * investor.sharePercentage / 100;
             setSuggestedAmount(amount);
        }
    }, [open, investor]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!investor) return;

    const formData = new FormData(e.currentTarget);
    const newPayment = {
        id: Math.max(...profitPayments.map((p) => p.id), 0) + 1,
        investorId: investor.id,
        month: formData.get('paymentMonth') as string,
        amount: parseFloat(formData.get('profitAmount') as string),
        paymentDate: formData.get('paymentDate') as string,
        paymentMethod: formData.get('paymentMethod') as 'bank_transfer' | 'gcash' | 'cash' | 'check',
        notes: formData.get('paymentNotes') as string,
        status: 'paid' as const,
    };
    
    profitPayments.push(newPayment);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Profit Payment for {investor?.name}</DialogTitle>
        </DialogHeader>
        <form id="profitPaymentForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="paymentMonth">Payment Month</Label>
            <Input name="paymentMonth" id="paymentMonth" type="month" className="prime-input" required />
          </div>
           <div>
            <Label htmlFor="profitAmount">Profit Amount (₱)</Label>
            <Input name="profitAmount" id="profitAmount" type="number" min="0" className="prime-input" defaultValue={suggestedAmount} required />
          </div>
          <div>
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input name="paymentDate" id="paymentDate" type="date" className="prime-input" required />
          </div>
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select name="paymentMethod" required>
                <SelectTrigger className="prime-input">
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
           <div>
            <Label htmlFor="paymentNotes">Notes</Label>
            <Textarea name="paymentNotes" id="paymentNotes" rows={3} className="prime-input" placeholder="Additional notes..." />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              Record Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
