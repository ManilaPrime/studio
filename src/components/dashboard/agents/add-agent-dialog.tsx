'use client';

import type { Agent } from '@/lib/types';
import { useEffect, useState } from 'react';

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
  
  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addAgentModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{agent ? 'Edit' : 'Add New'} Agent</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="agentForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='agentName' className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="agentName" className="prime-input" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor='agentEmail' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="agentEmail" className="prime-input" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor='agentPhone' className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" id="agentPhone" className="prime-input" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                
                <div>
                    <label htmlFor='agentCommission' className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                    <input type="number" id="agentCommission" min="0" max="100" step="1" className="prime-input" value={commissionRate} onChange={e => setCommissionRate(parseFloat(e.target.value))} required />
                </div>
                
                <div>
                    <label htmlFor='agentJoinDate' className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <input type="date" id="agentJoinDate" className="prime-input" value={joinDate} onChange={e => setJoinDate(e.target.value)} required />
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        {agent ? 'Save Changes' : 'Add Agent'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}
