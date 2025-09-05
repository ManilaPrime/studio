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
import { investors } from '@/lib/data';
import type { Investor } from '@/lib/types';
import { useEffect } from 'react';

export function AddInvestorDialog({
  children,
  open,
  onOpenChange,
  investor
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
            const dateInput = document.getElementById('investorJoinDate') as HTMLInputElement;
            if(dateInput) dateInput.value = today;
        }
    }, [open, investor]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (investor) {
        // Update existing investor
        const existingInvestor = investors.find(i => i.id === investor.id);
        if (existingInvestor) {
            existingInvestor.name = formData.get('investorName') as string;
            existingInvestor.email = formData.get('investorEmail') as string;
            existingInvestor.phone = formData.get('investorPhone') as string;
            existingInvestor.investmentAmount = parseFloat(formData.get('investorAmount') as string);
            existingInvestor.sharePercentage = parseFloat(formData.get('investorShare') as string);
            existingInvestor.joinDate = formData.get('investorJoinDate') as string;
        }
    } else {
        // Add new investor
        const newInvestor = {
          id: Math.max(...investors.map((i) => i.id), 0) + 1,
          name: formData.get('investorName') as string,
          email: formData.get('investorEmail') as string,
          phone: formData.get('investorPhone') as string,
          investmentAmount: parseFloat(formData.get('investorAmount') as string),
          sharePercentage: parseFloat(formData.get('investorShare') as string),
          joinDate: formData.get('investorJoinDate') as string,
          status: 'active' as const,
        };
        investors.push(newInvestor);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{investor ? 'Edit' : 'Add New'} Investor</DialogTitle>
        </DialogHeader>
        <form id="investorForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="investorName">Full Name</Label>
            <Input name="investorName" id="investorName" className="prime-input" defaultValue={investor?.name} required />
          </div>
          <div>
            <Label htmlFor="investorEmail">Email</Label>
            <Input name="investorEmail" id="investorEmail" type="email" className="prime-input" defaultValue={investor?.email} required />
          </div>
          <div>
            <Label htmlFor="investorPhone">Phone Number</Label>
            <Input name="investorPhone" id="investorPhone" type="tel" className="prime-input" defaultValue={investor?.phone} required />
          </div>
          <div>
            <Label htmlFor="investorAmount">Investment Amount (₱)</Label>
            <Input name="investorAmount" id="investorAmount" type="number" min="0" className="prime-input" defaultValue={investor?.investmentAmount} required />
          </div>
           <div>
            <Label htmlFor="investorShare">Share Percentage (%)</Label>
            <Input name="investorShare" id="investorShare" type="number" min="0" max="100" step="0.1" className="prime-input" defaultValue={investor?.sharePercentage} required />
          </div>
          <div>
            <Label htmlFor="investorJoinDate">Join Date</Label>
            <Input name="investorJoinDate" id="investorJoinDate" type="date" className="prime-input" defaultValue={investor?.joinDate} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              {investor ? 'Save Changes' : 'Add Investor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
