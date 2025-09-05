'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/dashboard/header';
import BottomNav from '@/components/dashboard/bottom-nav';
import {
  Home,
  CalendarDays,
  ClipboardList,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
    { href: '/dashboard/reminders', label: 'Tasks', icon: ClipboardList },
    { href: '/dashboard/more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="bg-gray-50 min-h-screen max-w-sm mx-auto flex flex-col">
      <Header />
      <main className="flex-grow content-area">{children}</main>
      <BottomNav navItems={navItems} pathname={pathname} />
    </div>
  );
}
