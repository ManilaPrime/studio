
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface BottomNavProps {
  navItems: NavItem[];
  pathname: string;
  onQuickActionsOpen: () => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


const BottomNav = ({ navItems, pathname, onQuickActionsOpen }: BottomNavProps) => {
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
            <item.icon />
            <span className="fb-nav-text">{item.label}</span>
          </Link>
        ))}

        <button
          onClick={onQuickActionsOpen}
          className="quick-action-btn"
          aria-label="Quick Actions"
        >
          <PlusIcon />
        </button>

        {navItems.slice(2).map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`fb-nav-item ${
              pathname === item.href ? 'active' : ''
            }`}
            id={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon />
            <span className="fb-nav-text">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
