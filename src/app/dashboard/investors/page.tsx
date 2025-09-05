'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { InvestorsList } from '@/components/dashboard/investors/investors-list';
import { AddInvestorDialog } from '@/components/dashboard/investors/add-investor-dialog';

export default function InvestorsPage() {
  const [isAddInvestorOpen, setIsAddInvestorOpen] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Investor Dashboard</h2>
          <p className="text-sm text-gray-500">Financial performance & returns</p>
        </div>
        <AddInvestorDialog
          open={isAddInvestorOpen}
          onOpenChange={setIsAddInvestorOpen}
        >
          <Button
            onClick={() => setIsAddInvestorOpen(true)}
            className="prime-button px-4 py-2 text-sm"
          >
            + Add
          </Button>
        </AddInvestorDialog>
      </div>
      <InvestorsList />
    </div>
  );
}
