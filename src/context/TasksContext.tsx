import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialTasks: Task[] = [
  { id: '1', title: 'Finalize venue', done: false },
  { id: '2', title: 'Book photographer', done: true },
  { id: '3', title: 'Shortlist decor', done: false },
  { id: '4', title: 'Send invitations', done: false },
];

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      done: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used inside TasksProvider');
  }
  return ctx;
};
