'use client';

import { useState } from 'react';
import { agents } from '@/lib/data';
import type { Agent } from '@/lib/types';
import { AddAgentDialog } from './add-agent-dialog';
import { formatDate } from '@/lib/utils';

export function AgentsList() {
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsAddAgentOpen(true);
  };

  if (agents.length === 0) {
    return <p className="text-gray-500 text-center py-8">No agents found.</p>;
  }

  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.id} className="prime-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">{agent.name}</h3>
              <p className="text-sm text-gray-600">{agent.email}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                agent.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
            <div>
              <p>
                <strong>Commission Rate:</strong> {agent.commissionRate}%
              </p>
              <p>
                <strong>Total Bookings:</strong> {agent.totalBookings}
              </p>
            </div>
            <div>
              <p>
                <strong>Total Commissions:</strong> ₱
                {agent.totalCommissions.toLocaleString()}
              </p>
              <p>
                <strong>Joined:</strong> {formatDate(agent.joinDate)}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditAgent(agent)}
              className="flex-1 fb-btn bg-blue-500 text-white hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => alert('Removing agent soon!')}
              className="flex-1 fb-btn bg-red-500 text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <AddAgentDialog
        open={isAddAgentOpen}
        onOpenChange={setIsAddAgentOpen}
        agent={selectedAgent}
      />
    </div>
  );
}
