import type { Task } from '../store/todoStore';

export const loadTasksFromLocalStorage = (): Task[] => {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
