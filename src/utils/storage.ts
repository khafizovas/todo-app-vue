import type { Task } from '../store/taskStore';

export const loadTasksFromLocalStorage = (): Task[] => {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
