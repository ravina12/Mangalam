import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BudgetItem = {
  id: string;
  title: string;
  amount: number;
};

type BudgetContextType = {
  items: BudgetItem[];
  budgetLimit: number;
  setBudgetLimit: (value: number) => void;
  addItem: (title: string, amount: number) => void;
  removeItem: (id: string) => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number>(0);

  const addItem = (title: string, amount: number) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      title,
      amount,
    };
    setItems(prev => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{ items, budgetLimit, setBudgetLimit, addItem, removeItem }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) {
    throw new Error('useBudget must be used inside BudgetProvider');
  }
  return ctx;
};
