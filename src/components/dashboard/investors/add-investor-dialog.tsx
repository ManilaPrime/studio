
'use client';

import type { Investor, Unit } from '@/lib/types';
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
      unitId: unitId || undefined,
    };

    if (investor) {
      onUpdateInvestor({ ...investor, ...investorData });
    } else {
      onAddInvestor(investorData);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{investor ? 'Edit' : 'Add New'} Investor</DialogTitle>
        </DialogHeader>
        <form
          id="investorForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorName" className="text-right">
              Full Name
            </Label>
            <Input
              id="investorName"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorEmail" className="text-right">
              Email
            </Label>
            <Input
              id="investorEmail"
              type="email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorPhone" className="text-right">
              Phone
            </Label>
            <Input
              id="investorPhone"
              type="tel"
              className="col-span-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorUnit" className="text-right">
              Unit
            </Label>
            <Select value={unitId} onValueChange={(value) => setUnitId(value === '' ? undefined : value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id!}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorAmount" className="text-right">
              Investment (₱)
            </Label>
            <Input
              id="investorAmount"
              type="number"
              min="0"
              className="col-span-3"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorShare" className="text-right">
              Share (%)
            </Label>
            <Input
              id="investorShare"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className="col-span-3"
              value={sharePercentage}
              onChange={(e) => setSharePercentage(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investorJoinDate" className="text-right">
              Join Date
            </Label>
            <Input
              id="investorJoinDate"
              type="date"
              className="col-span-3"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {investor ? 'Save Changes' : 'Add Investor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
