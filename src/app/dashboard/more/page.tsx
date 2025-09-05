'use client';

import {
  Building,
  LineChart,
  Users,
  Handshake,
  CircleDollarSign,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { label: 'Units', icon: Building, href: '/dashboard/units' },
  { label: 'Reports', icon: LineChart, href: '/dashboard/reports' },
  {
    label: 'Investor Dashboard',
    icon: Users,
    href: '/dashboard/investors',
  },
  {
    label: 'Agent Management',
    icon: Handshake,
    href: '/dashboard/agents',
  },
  { label: 'Expenses', icon: CircleDollarSign, href: '/dashboard/expenses' },
];

export default function MorePage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would clear session, etc.
    router.push('/');
  };

  return (
    <div className="p-4">
        <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">More Options</h2>
              <p className="text-sm text-gray-500">Additional management sections</p>
            </div>
        </div>
        <div className="space-y-3">
        {menuItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
            <item.icon className="text-2xl text-gray-600" />
            <span className="font-semibold text-gray-800">{item.label}</span>
            </Link>
        ))}

        <div className="border-t border-gray-200 pt-3 mt-3">
            <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
            <LogOut className="text-2xl text-red-700" />
            <span className="font-semibold text-red-800">Logout</span>
            </button>
        </div>
        </div>
    </div>
  );
}
