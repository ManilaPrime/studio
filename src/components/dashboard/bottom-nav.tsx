'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
            <div className="fb-nav-text">{item.label}</div>
          </Link>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="quick-action-btn"
              aria-label="Quick Actions"
            >
              <Plus className="text-2xl font-bold" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Actions</DialogTitle>
            </DialogHeader>
            <QuickActions />
          </DialogContent>
        </Dialog>

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
            <div className="fb-nav-text">{item.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
