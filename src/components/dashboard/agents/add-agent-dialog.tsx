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
import { agents } from '@/lib/data';
import type { Agent } from '@/lib/types';
import { useEffect } from 'react';

export function AddAgentDialog({
  children,
  open,
  onOpenChange,
  agent
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: Agent | null;
}) {

    useEffect(() => {
        if(open && !agent) {
             const today = new Date().toISOString().split('T')[0];
             const dateInput = document.getElementById('agentJoinDate') as HTMLInputElement;
             if(dateInput) dateInput.value = today;
        }
    }, [open, agent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (agent) {
        // Update existing agent
        const existingAgent = agents.find(a => a.id === agent.id);
        if (existingAgent) {
            existingAgent.name = formData.get('agentName') as string;
            existingAgent.email = formData.get('agentEmail') as string;
            existingAgent.phone = formData.get('agentPhone') as string;
            existingAgent.commissionRate = parseFloat(formData.get('agentCommission') as string);
            existingAgent.joinDate = formData.get('agentJoinDate') as string;
        }
    } else {
        // Add new agent
        const newAgent = {
          id: Math.max(...agents.map((a) => a.id), 0) + 1,
          name: formData.get('agentName') as string,
          email: formData.get('agentEmail') as string,
          phone: formData.get('agentPhone') as string,
          commissionRate: parseFloat(formData.get('agentCommission') as string),
          totalBookings: 0,
          totalCommissions: 0,
          joinDate: formData.get('agentJoinDate') as string,
          status: 'active' as const,
        };
        agents.push(newAgent);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{agent ? 'Edit' : 'Add New'} Agent</DialogTitle>
        </DialogHeader>
        <form id="agentForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="agentName">Full Name</Label>
            <Input name="agentName" id="agentName" className="prime-input" defaultValue={agent?.name} required />
          </div>
          <div>
            <Label htmlFor="agentEmail">Email</Label>
            <Input name="agentEmail" id="agentEmail" type="email" className="prime-input" defaultValue={agent?.email} required />
          </div>
          <div>
            <Label htmlFor="agentPhone">Phone Number</Label>
            <Input name="agentPhone" id="agentPhone" type="tel" className="prime-input" defaultValue={agent?.phone} required />
          </div>
          <div>
            <Label htmlFor="agentCommission">Commission Rate (%)</Label>
            <Input name="agentCommission" id="agentCommission" type="number" min="0" max="100" step="1" className="prime-input" defaultValue={agent?.commissionRate} required />
          </div>
          <div>
            <Label htmlFor="agentJoinDate">Join Date</Label>
            <Input name="agentJoinDate" id="agentJoinDate" type="date" className="prime-input" defaultValue={agent?.joinDate} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              {agent ? 'Save Changes' : 'Add Agent'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
