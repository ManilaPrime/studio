'use client';

import { investors } from '@/lib/data';
import type { Investor } from '@/lib/types';
import { useEffect } from 'react';

export function AddInvestorDialog({
  children,
  open,
  onOpenChange,
  investor,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
}) {
  useEffect(() => {
    if (open && !investor) {
      // Set today's date as default join date for new investors
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById(
        'investorJoinDate'
      ) as HTMLInputElement;
      if (dateInput) dateInput.value = today;
    }
  }, [open, investor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (investor) {
      // Update existing investor
      const existingInvestor = investors.find((i) => i.id === investor.id);
      if (existingInvestor) {
        existingInvestor.name = formData.get('investorName') as string;
        existingInvestor.email = formData.get('investorEmail') as string;
        existingInvestor.phone = formData.get('investorPhone') as string;
        existingInvestor.investmentAmount = parseFloat(
          formData.get('investorAmount') as string
        );
        existingInvestor.sharePercentage = parseFloat(
          formData.get('investorShare') as string
        );
        existingInvestor.joinDate = formData.get('investorJoinDate') as string;
      }
    } else {
      // Add new investor
      const newInvestor = {
        id: Math.max(...investors.map((i) => i.id), 0) + 1,
        name: formData.get('investorName') as string,
        email: formData.get('investorEmail') as string,
        phone: formData.get('investorPhone') as string,
        investmentAmount: parseFloat(
          formData.get('investorAmount') as string
        ),
        sharePercentage: parseFloat(formData.get('investorShare') as string),
        joinDate: formData.get('investorJoinDate') as string,
        status: 'active' as const,
      };
      investors.push(newInvestor);
    }

    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addInvestorModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{investor ? 'Edit' : 'Add New'} Investor</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="investorForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='investorName' className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="investorName" id="investorName" className="prime-input" defaultValue={investor?.name} required />
                </div>
                
                <div>
                    <label htmlFor='investorEmail' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="investorEmail" id="investorEmail" className="prime-input" defaultValue={investor?.email} required />
                </div>
                
                <div>
                    <label htmlFor='investorPhone' className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" name="investorPhone" id="investorPhone" className="prime-input" defaultValue={investor?.phone} required />
                </div>
                
                <div>
                    <label htmlFor='investorAmount' className="block text-sm font-medium text-gray-700 mb-1">Investment Amount (₱)</label>
                    <input type="number" name="investorAmount" id="investorAmount" min="0" className="prime-input" defaultValue={investor?.investmentAmount} required />
                </div>
                
                <div>
                    <label htmlFor='investorShare' className="block text-sm font-medium text-gray-700 mb-1">Share Percentage (%)</label>
                    <input type="number" name="investorShare" id="investorShare" min="0" max="100" step="0.1" className="prime-input" defaultValue={investor?.sharePercentage} required />
                </div>
                
                <div>
                    <label htmlFor='investorJoinDate' className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <input type="date" name="investorJoinDate" id="investorJoinDate" className="prime-input" defaultValue={investor?.joinDate} required />
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                       {investor ? 'Save Changes' : 'Add Investor'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}
