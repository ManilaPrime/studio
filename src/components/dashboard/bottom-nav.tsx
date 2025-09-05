'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { QuickActions } from './quick-actions';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface BottomNavProps {
  navItems: NavItem[];
  pathname: string;
}

const BottomNav = ({ navItems, pathname }: BottomNavProps) => {
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.slice(0, 2).map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`fb-nav-item ${
              pathname === item.href ? 'active' : ''
            }`}
            id={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon className="fb-nav-icon" size={24} />
            <span className="fb-nav-text">{item.label}</span>
          </Link>
        ))}

        <button
          onClick={() => setIsQuickActionsOpen(true)}
          className="quick-action-btn"
          aria-label="Quick Actions"
        >
          <Plus className="text-2xl font-bold" />
        </button>

        <QuickActions
          open={isQuickActionsOpen}
          onOpenChange={setIsQuickActionsOpen}
        />

        {navItems.slice(2).map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`fb-nav-item ${
              pathname === item.href ? 'active' : ''
            }`}
            id={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon className="fb-nav-icon" size={24} />
            <span className="fb-nav-text">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
