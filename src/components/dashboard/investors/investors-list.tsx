'use client';

import { useState } from 'react';
import { investors, profitPayments } from '@/lib/data';
import { PayProfitDialog } from './pay-profit-dialog';
import { AddInvestorDialog } from './add-investor-dialog';
import type { Investor } from '@/lib/types';

export function InvestorsList() {
  const [isPayProfitOpen, setIsPayProfitOpen] = useState(false);
  const [isAddInvestorOpen, setIsAddInvestorOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
    null
  );

  const handlePayProfit = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsPayProfitOpen(true);
  };

  const handleEditInvestor = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsAddInvestorOpen(true);
  };

  if (investors.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">No investors found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {investors.map((investor) => {
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const monthlyProfit = 32500; // Sample net profit
        const investorShare = (monthlyProfit * investor.sharePercentage) / 100;
        const currentPayment = profitPayments.find(
          (p) => p.investorId === investor.id && p.month === currentMonth
        );
        const paymentStatus = currentPayment ? 'paid' : 'pending';
        const totalPayments = profitPayments
          .filter((p) => p.investorId === investor.id)
          .reduce((sum, p) => sum + p.amount, 0);

        return (
          <div key={investor.id} className="prime-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{investor.name}</h3>
                <p className="text-sm text-gray-600">{investor.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  investor.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {investor.status.charAt(0).toUpperCase() +
                  investor.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
              <div>
                <p>
                  <strong>Investment:</strong> ₱
                  {investor.investmentAmount.toLocaleString()}
                </p>
                <p>
                  <strong>Share:</strong> {investor.sharePercentage}%
                </p>
              </div>
              <div>
                <p>
                  <strong>Dec Share:</strong> ₱{investorShare.toLocaleString()}
                </p>
                <p>
                  <strong>Total Received:</strong> ₱
                  {totalPayments.toLocaleString()}
                </p>
              </div>
            </div>

            <div
              className={`mb-3 p-2 rounded-lg ${
                paymentStatus === 'paid'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    paymentStatus === 'paid'
                      ? 'text-green-800'
                      : 'text-yellow-800'
                  }`}
                >
                  December 2024:{' '}
                  {paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}
                </span>
                {paymentStatus === 'pending' ? (
                  <button
                    onClick={() => handlePayProfit(investor)}
                    className="text-xs bg-yellow-500 text-white px-2 py-1 rounded font-semibold h-auto"
                  >
                    Pay Now
                  </button>
                ) : (
                  <span className="text-xs text-green-600">
                    {new Date(currentPayment!.paymentDate).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric' }
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => alert('Payment History Coming Soon!')}
                className="flex-1 fb-btn bg-blue-500 text-white hover:bg-blue-600"
              >
                History
              </button>
              <button
                onClick={() => handleEditInvestor(investor)}
                className="flex-1 fb-btn bg-gray-500 text-white hover:bg-gray-600"
              >
                Edit
              </button>
              <button
                onClick={() => alert('Removing investor soon!')}
                className="flex-1 fb-btn bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <PayProfitDialog
        open={isPayProfitOpen}
        onOpenChange={setIsPayProfitOpen}
        investor={selectedInvestor}
      />
      <AddInvestorDialog
        open={isAddInvestorOpen}
        onOpenChange={setIsAddInvestorOpen}
        investor={selectedInvestor}
      />
    </div>
  );
}
