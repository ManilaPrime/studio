'use client';

import React from 'react';
import { AgentsList } from '@/components/dashboard/agents/agents-list';
import { AddAgentDialog } from '@/components/dashboard/agents/add-agent-dialog';
import { agents as initialAgents } from '@/lib/data';
import type { Agent } from '@/lib/types';

export default function AgentsPage() {
  const [agents, setAgents] = React.useState<Agent[]>(initialAgents);
  const [isAddAgentOpen, setIsAddAgentOpen] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);

  const handleOpenAddDialog = () => {
    setSelectedAgent(null);
    setIsAddAgentOpen(true);
  };
  
  const handleOpenEditDialog = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsAddAgentOpen(true);
  };

  const addAgent = (newAgentData: Omit<Agent, 'id' | 'totalBookings' | 'totalCommissions' | 'status'>) => {
    const newAgent: Agent = {
      ...newAgentData,
      id: Math.max(0, ...agents.map((a) => a.id)) + 1,
      totalBookings: 0,
      totalCommissions: 0,
      status: 'active',
    };
    setAgents((prev) => [...prev, newAgent]);
  };

  const updateAgent = (updatedAgent: Agent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
    );
    setSelectedAgent(null);
  }

  const deleteAgent = (agentId: number) => {
    if (confirm('Are you sure you want to remove this agent?')) {
        setAgents((prev) => prev.filter((a) => a.id !== agentId));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Agent Management</h2>
          <p className="text-sm text-gray-500">Partner agents & commissions</p>
        </div>
        <AddAgentDialog
          open={isAddAgentOpen}
          onOpenChange={setIsAddAgentOpen}
          onAddAgent={addAgent}
          onUpdateAgent={updateAgent}
          agent={selectedAgent}
        >
          <button
            onClick={handleOpenAddDialog}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </button>
        </AddAgentDialog>
      </div>
      <AgentsList agents={agents} onEdit={handleOpenEditDialog} onDelete={deleteAgent} />
    </div>
  );
}
