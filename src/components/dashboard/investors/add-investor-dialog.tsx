
'use client';

import type { Investor, Unit } from '@/lib/types';
import { useEffect, useState } from 'react';

export function AddInvestorDialog({
  children,
  open,
  onOpenChange,
  investor,
  onAddInvestor,
  onUpdateInvestor,
  units,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
  onAddInvestor: (data: Omit<Investor, 'id' | 'status'>) => void;
  onUpdateInvestor: (investor: Investor) => void;
  units: Unit[];
}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [sharePercentage, setSharePercentage] = useState(0);
  const [joinDate, setJoinDate] = useState('');
  const [unitId, setUnitId] = useState<string | undefined>(undefined);


  useEffect(() => {
    if (open) {
      if (investor) {
        setName(investor.name);
        setEmail(investor.email);
        setPhone(investor.phone);
        setInvestmentAmount(investor.investmentAmount);
        setSharePercentage(investor.sharePercentage);
        setJoinDate(investor.joinDate);
        setUnitId(investor.unitId);
      } else {
        // Reset form for new investor
        setName('');
        setEmail('');
        setPhone('');
        setInvestmentAmount(0);
        setSharePercentage(0);
        setJoinDate(new Date().toISOString().split('T')[0]);
        setUnitId(undefined);
      }
    }
  }, [open, investor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const investorData = {
        name,
        email,
        phone,
        investmentAmount,
        sharePercentage,
        joinDate,
        unitId,
    };

    if (investor) {
      onUpdateInvestor({ ...investor, ...investorData });
    } else {
      onAddInvestor(investorData);
    }

    onOpenChange(false);
  };
  
  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addInvestorModal" className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
        <div className="bg-white rounded-xl p-6 w-full max-w-md overflow-y-auto z-50 max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{investor ? 'Edit' : 'Add New'} Investor</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="investorForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='investorName' className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="investorName" className="prime-input" value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor='investorEmail' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="investorEmail" className="prime-input" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor='investorPhone' className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" id="investorPhone" className="prime-input" value={phone} onChange={e=>setPhone(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="investorUnit" className="block text-sm font-medium text-gray-700 mb-1">Associated Unit</label>
                    <select id="investorUnit" className="prime-input" value={unitId} onChange={e=>setUnitId(e.target.value)}>
                        <option value="">Select Unit</option>
                        {units.map(unit => (
                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor='investorAmount' className="block text-sm font-medium text-gray-700 mb-1">Investment Amount (₱)</label>
                    <input type="number" id="investorAmount" min="0" className="prime-input" value={investmentAmount} onChange={e=>setInvestmentAmount(parseFloat(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor='investorShare' className="block text-sm font-medium text-gray-700 mb-1">Share Percentage (%)</label>
                    <input type="number" id="investorShare" min="0" max="100" step="0.1" className="prime-input" value={sharePercentage} onChange={e=>setSharePercentage(parseFloat(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor='investorJoinDate' className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <input type="date" id="investorJoinDate" className="prime-input" value={joinDate} onChange={e=>setJoinDate(e.target.value)} required />
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
