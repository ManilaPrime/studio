'use client';

import React from 'react';
import { InvestorsList } from '@/components/dashboard/investors/investors-list';
import { AddInvestorDialog } from '@/components/dashboard/investors/add-investor-dialog';
import { PayProfitDialog } from '@/components/dashboard/investors/pay-profit-dialog';
import { investors as initialInvestors, profitPayments as initialProfitPayments } from '@/lib/data';
import type { Investor, ProfitPayment } from '@/lib/types';

export default function InvestorsPage() {
  const [investors, setInvestors] = React.useState<Investor[]>(initialInvestors);
  const [profitPayments, setProfitPayments] = React.useState<ProfitPayment[]>(initialProfitPayments);
  const [isAddInvestorOpen, setIsAddInvestorOpen] = React.useState(false);
  const [isPayProfitOpen, setIsPayProfitOpen] = React.useState(false);
  const [selectedInvestor, setSelectedInvestor] = React.useState<Investor | null>(null);

  const handleOpenAddDialog = () => {
    setSelectedInvestor(null);
    setIsAddInvestorOpen(true);
  };
  
  const handleOpenEditDialog = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsAddInvestorOpen(true);
  };
  
  const handleOpenPayProfitDialog = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsPayProfitOpen(true);
  };

  const addInvestor = (newInvestorData: Omit<Investor, 'id' | 'status'>) => {
    const newInvestor: Investor = {
      ...newInvestorData,
      id: Math.max(0, ...investors.map((i) => i.id)) + 1,
      status: 'active',
    };
    setInvestors((prev) => [...prev, newInvestor]);
  };

  const updateInvestor = (updatedInvestor: Investor) => {
    setInvestors((prev) =>
      prev.map((i) => (i.id === updatedInvestor.id ? updatedInvestor : i))
    );
    setSelectedInvestor(null);
  };

  const deleteInvestor = (investorId: number) => {
     if (confirm('Are you sure you want to remove this investor?')) {
        setInvestors((prev) => prev.filter((i) => i.id !== investorId));
    }
  };

  const recordProfitPayment = (newPaymentData: Omit<ProfitPayment, 'id' | 'status'>) => {
    const newPayment: ProfitPayment = {
      ...newPaymentData,
      id: Math.max(0, ...profitPayments.map((p) => p.id)) + 1,
      status: 'paid',
    };
    setProfitPayments((prev) => [...prev, newPayment]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Investor Dashboard</h2>
          <p className="text-sm text-gray-500">Financial performance & returns</p>
        </div>
        <AddInvestorDialog
          open={isAddInvestorOpen}
          onOpenChange={setIsAddInvestorOpen}
          onAddInvestor={addInvestor}
          onUpdateInvestor={updateInvestor}
          investor={selectedInvestor}
        >
          <button
            onClick={handleOpenAddDialog}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddInvestorDialog>
      </div>
      <InvestorsList 
        investors={investors} 
        profitPayments={profitPayments}
        onEdit={handleOpenEditDialog} 
        onDelete={deleteInvestor}
        onPayProfit={handleOpenPayProfitDialog}
      />
      <PayProfitDialog
        open={isPayProfitOpen}
        onOpenChange={setIsPayProfitOpen}
        investor={selectedInvestor}
        onRecordPayment={recordProfitPayment}
      />
    </div>
  );
}
