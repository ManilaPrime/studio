'use client';

import { profitPayments } from '@/lib/data';
import type { Investor } from '@/lib/types';
import { useEffect, useState } from 'react';

export function PayProfitDialog({
  open,
  onOpenChange,
  investor,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
}) {
  const [suggestedAmount, setSuggestedAmount] = useState(0);

  useEffect(() => {
    if (open && investor) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById(
        'paymentDate'
      ) as HTMLInputElement;
      if (dateInput) dateInput.value = today;

      const currentMonthInput = document.getElementById(
        'paymentMonth'
      ) as HTMLInputElement;
      if (currentMonthInput)
        currentMonthInput.value = new Date().toISOString().slice(0, 7);

      // Calculate suggested profit amount
      const monthlyProfit = 32500; // Sample current month profit
      const amount = (monthlyProfit * investor.sharePercentage) / 100;
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
      paymentMethod: formData.get('paymentMethod') as
        | 'bank_transfer'
        | 'gcash'
        | 'cash'
        | 'check',
      notes: formData.get('paymentNotes') as string,
      status: 'paid' as const,
    };

    profitPayments.push(newPayment);
    onOpenChange(false);
  };
  
  if (!open) {
    return null;
  }

  return (
    <div id="payProfitModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Record Profit Payment for {investor?.name}</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="profitPaymentForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="paymentMonth" className="block text-sm font-medium text-gray-700 mb-1">Payment Month</label>
                    <input name="paymentMonth" id="paymentMonth" type="month" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="profitAmount" className="block text-sm font-medium text-gray-700 mb-1">Profit Amount (₱)</label>
                    <input name="profitAmount" id="profitAmount" type="number" min="0" className="prime-input" defaultValue={suggestedAmount} required />
                </div>
                
                <div>
                    <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input name="paymentDate" id="paymentDate" type="date" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select name="paymentMethod" id="paymentMethod" className="prime-input" required>
                        <option value="">Select Method</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="gcash">GCash</option>
                        <option value="cash">Cash</option>
                        <option value="check">Check</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="paymentNotes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea name="paymentNotes" id="paymentNotes" rows={3} className="prime-input" placeholder="Additional notes..."></textarea>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        Record Payment
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
