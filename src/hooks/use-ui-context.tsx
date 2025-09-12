"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isAddUnitOpen: boolean;
  setIsAddUnitOpen: (open: boolean) => void;
  isEditUnitOpen: boolean;
  setIsEditUnitOpen: (open: boolean) => void;
  isAddBookingOpen: boolean;
  setIsAddBookingOpen: (open: boolean) => void;
  isEditBookingOpen: boolean;
  setIsEditBookingOpen: (open: boolean) => void;
  isAddAgentOpen: boolean;
  setIsAddAgentOpen: (open: boolean) => void;
  isAddExpenseOpen: boolean;
  setIsAddExpenseOpen: (open: boolean) => void;
  isAddInvestorOpen: boolean;
  setIsAddInvestorOpen: (open: boolean) => void;
  isPayProfitOpen: boolean;
  setIsPayProfitOpen: (open: boolean) => void;
  isAddReminderOpen: boolean;
  setIsAddReminderOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddInvestorOpen, setIsAddInvestorOpen] = useState(false);
  const [isPayProfitOpen, setIsPayProfitOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);

  // Hide all other dialogs when one opens
  const createSetter = (setter: (open: boolean) => void) => (open: boolean) => {
    if (open) {
      setIsAddUnitOpen(false);
      setIsEditUnitOpen(false);
      setIsAddBookingOpen(false);
      setIsEditBookingOpen(false);
      setIsAddAgentOpen(false);
      setIsAddExpenseOpen(false);
      setIsAddInvestorOpen(false);
      setIsPayProfitOpen(false);
      setIsAddReminderOpen(false);
    }
    setter(open);
  };
  
  const value = {
    isAddUnitOpen,
    setIsAddUnitOpen: createSetter(setIsAddUnitOpen),
    isEditUnitOpen,
    setIsEditUnitOpen: createSetter(setIsEditUnitOpen),
    isAddBookingOpen,
    setIsAddBookingOpen: createSetter(setIsAddBookingOpen),
    isEditBookingOpen,
    setIsEditBookingOpen: createSetter(setIsEditBookingOpen),
    isAddAgentOpen,
    setIsAddAgentOpen: createSetter(setIsAddAgentOpen),
    isAddExpenseOpen,
    setIsAddExpenseOpen: createSetter(setIsAddExpenseOpen),
    isAddInvestorOpen,
    setIsAddInvestorOpen: createSetter(setIsAddInvestorOpen),
    isPayProfitOpen,
    setIsPayProfitOpen: createSetter(setIsPayProfitOpen),
    isAddReminderOpen,
    setIsAddReminderOpen: createSetter(setIsAddReminderOpen),
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
}