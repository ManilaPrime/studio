'use client';

import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/dashboard/header';
import BottomNav from '@/components/dashboard/bottom-nav';
import { useAuth } from '@/hooks/use-auth.tsx';
import React, { useEffect, useState, cloneElement } from 'react';
import { QuickActions } from '@/components/dashboard/quick-actions';

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fb-nav-icon"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BookingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fb-nav-icon"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const TasksIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fb-nav-icon"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fb-nav-icon"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  // State for all dialogs
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddInvestorOpen, setIsAddInvestorOpen] = useState(false);
  const [isPayProfitOpen, setIsPayProfitOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);


  const navItems = [
    { href: '/dashboard', label: 'Home', icon: HomeIcon },
    { href: '/dashboard/bookings', label: 'Bookings', icon: BookingsIcon },
    { href: '/dashboard/reminders', label: 'Tasks', icon: TasksIcon },
    { href: '/dashboard/more', label: 'More', icon: MoreIcon },
  ];

  const anyDialogOpen =
    isQuickActionsOpen ||
    isAddUnitOpen ||
    isEditUnitOpen ||
    isAddBookingOpen ||
    isEditBookingOpen ||
    isAddAgentOpen ||
    isAddExpenseOpen ||
    isAddInvestorOpen ||
    isPayProfitOpen ||
    isAddReminderOpen;

  const pageSpecificProps: { [key: string]: any } = {
    '/dashboard/units': {
      isAddUnitOpen,
      onAddUnitOpenChange: setIsAddUnitOpen,
      isEditUnitOpen,
      onEditUnitOpenChange: setIsEditUnitOpen,
    },
    '/dashboard/bookings': {
      isAddBookingOpen,
      onAddBookingOpenChange: setIsAddBookingOpen,
      isEditBookingOpen,
      onEditBookingOpenChange: setIsEditBookingOpen,
    },
     '/dashboard/agents': {
      open: isAddAgentOpen,
      onOpenChange: setIsAddAgentOpen,
    },
    '/dashboard/expenses': {
      open: isAddExpenseOpen,
      onOpenChange: setIsAddExpenseOpen,
    },
    '/dashboard/investors': {
      isAddInvestorOpen,
      onAddInvestorOpenChange: setIsAddInvestorOpen,
      isPayProfitOpen,
      onPayProfitOpenChange: setIsPayProfitOpen,
    },
    '/dashboard/reminders': {
        open: isAddReminderOpen,
        onOpenChange: setIsAddReminderOpen,
    }
  };

  const childrenWithProps = React.isValidElement(children)
    ? cloneElement(children, pageSpecificProps[pathname] || {})
    : children;
  
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <p>Loading...</p>
        </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-sm mx-auto grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        <main
          className={`content-area relative contain-layout ${
            anyDialogOpen ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {childrenWithProps}
        </main>
        <BottomNav 
          navItems={navItems} 
          pathname={pathname}
          onQuickActionsOpen={() => setIsQuickActionsOpen(true)}
        />
        <QuickActions
          open={isQuickActionsOpen}
          onOpenChange={setIsQuickActionsOpen}
        />
      </div>
    </div>
  );
}
