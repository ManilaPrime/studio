'use client';

import { agents } from '@/lib/data';
import type { Agent } from '@/lib/types';
import { useEffect } from 'react';

export function AddAgentDialog({
  children,
  open,
  onOpenChange,
  agent,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: Agent | null;
}) {
  useEffect(() => {
    if (open && !agent) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById(
        'agentJoinDate'
      ) as HTMLInputElement;
      if (dateInput) dateInput.value = today;
    }
  }, [open, agent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (agent) {
      // Update existing agent
      const existingAgent = agents.find((a) => a.id === agent.id);
      if (existingAgent) {
        existingAgent.name = formData.get('agentName') as string;
        existingAgent.email = formData.get('agentEmail') as string;
        existingAgent.phone = formData.get('agentPhone') as string;
        existingAgent.commissionRate = parseFloat(
          formData.get('agentCommission') as string
        );
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
  
  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addAgentModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{agent ? 'Edit' : 'Add New'} Agent</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="agentForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='agentName' className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="agentName" id="agentName" className="prime-input" defaultValue={agent?.name} required />
                </div>
                
                <div>
                    <label htmlFor='agentEmail' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="agentEmail" id="agentEmail" className="prime-input" defaultValue={agent?.email} required />
                </div>
                
                <div>
                    <label htmlFor='agentPhone' className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" name="agentPhone" id="agentPhone" className="prime-input" defaultValue={agent?.phone} required />
                </div>
                
                <div>
                    <label htmlFor='agentCommission' className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                    <input type="number" name="agentCommission" id="agentCommission" min="0" max="100" step="1" className="prime-input" defaultValue={agent?.commissionRate} required />
                </div>
                
                <div>
                    <label htmlFor='agentJoinDate' className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <input type="date" name="agentJoinDate" id="agentJoinDate" className="prime-input" defaultValue={agent?.joinDate} required />
                </div>
                
                <div className="flex space-x-3">
                    <button type="button" onClick={() => onOpenChange(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 prime-button py-3 rounded-lg font-semibold">
                        {agent ? 'Save Changes' : 'Add Agent'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}
