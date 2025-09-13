
'use client';

import type { Agent } from '@/lib/types';
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

export function AddAgentDialog({
  children,
  open,
  onOpenChange,
  agent,
  onAddAgent,
  onUpdateAgent,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: Agent | null;
  onAddAgent: (data: Omit<Agent, 'id' | 'totalBookings' | 'totalCommissions' | 'status'>) => void;
  onUpdateAgent: (agent: Agent) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [commissionRate, setCommissionRate] = useState(0);
  const [joinDate, setJoinDate] = useState('');

  useEffect(() => {
    if (open) {
      if (agent) {
        setName(agent.name);
        setEmail(agent.email);
        setPhone(agent.phone);
        setCommissionRate(agent.commissionRate);
        setJoinDate(agent.joinDate);
      } else {
        // Reset form for new agent
        setName('');
        setEmail('');
        setPhone('');
        setCommissionRate(0);
        setJoinDate(new Date().toISOString().split('T')[0]);
      }
    }
  }, [open, agent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agent) {
      onUpdateAgent({
        ...agent,
        name,
        email,
        phone,
        commissionRate,
        joinDate,
      });
    } else {
      onAddAgent({
        name,
        email,
        phone,
        commissionRate,
        joinDate,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{agent ? 'Edit' : 'Add New'} Agent</DialogTitle>
        </DialogHeader>
        <form id="agentForm" className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentName" className="text-right">
              Full Name
            </Label>
            <Input
              id="agentName"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentEmail" className="text-right">
              Email
            </Label>
            <Input
              id="agentEmail"
              type="email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentPhone" className="text-right">
              Phone
            </Label>
            <Input
              id="agentPhone"
              type="tel"
              className="col-span-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentCommission" className="text-right">
              Commission (%)
            </Label>
            <Input
              id="agentCommission"
              type="number"
              min="0"
              max="100"
              step="1"
              className="col-span-3"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentJoinDate" className="text-right">
              Join Date
            </Label>
            <Input
              id="agentJoinDate"
              type="date"
              className="col-span-3"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">{agent ? 'Save Changes' : 'Add Agent'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
