'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/header';
import BottomNav from '@/components/dashboard/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const showSection = (sectionName: string) => {
    setCurrentSection(sectionName);
    // In a real app with routing, this would navigate to the correct page.
    // For this component-based display, we just need to re-render the children.
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-sm mx-auto flex flex-col">
      <Header />
      <main className="flex-grow content-area">
        {children}
      </main>
      <BottomNav currentSection={currentSection} showSection={showSection} />
    </div>
  );
}