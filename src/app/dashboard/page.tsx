'use client';

import React from 'react';
import Calendar from '@/components/dashboard/calendar';
import StatsCards from '@/components/dashboard/stats-cards';
import RecentActivity from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <div id="dashboardSection" className="section p-4">
      <Calendar />
      <StatsCards />
      <RecentActivity />
    </div>
  );
}