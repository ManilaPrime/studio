'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AgentsList } from '@/components/dashboard/agents/agents-list';
import { AddAgentDialog } from '@/components/dashboard/agents/add-agent-dialog';

export default function AgentsPage() {
  const [isAddAgentOpen, setIsAddAgentOpen] = React.useState(false);

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
        >
          <Button
            onClick={() => setIsAddAgentOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </Button>
        </AddAgentDialog>
      </div>
      <AgentsList />
    </div>
  );
}
