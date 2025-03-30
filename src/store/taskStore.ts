import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from '../utils/storage';

import { useErrorStore } from './errorStore';
import { useFilterStore } from './filterStore';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const useTaskStore = defineStore('task', () => {
  const errorStore = useErrorStore();
  const filterStore = useFilterStore();

  const tasks = ref<Task[]>(loadTasksFromLocalStorage());

  const newTaskText = ref('');

  const editTaskIndex = ref<number | null>(null);
  const editTaskText = ref('');

  const filteredTasks = computed(() => {
    const filter = filterStore.filter;

    switch (filter) {
      case 'completed':
        return tasks.value.filter((task) => task.completed);
      case 'incomplete':
        return tasks.value.filter((task) => !task.completed);
    }

    return tasks.value;
  });

  const addTask = () => {
    const trimmedText = newTaskText.value.trim();

    if (!trimmedText) {
      errorStore.setAddTaskError(true);
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      text: trimmedText,
      completed: false,
    };

    tasks.value.push(newTask);
    newTaskText.value = '';
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const toggleTask = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const startEditTask = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (!task) return;

    editTaskIndex.value = tasks.value.indexOf(task);
    editTaskText.value = task.text;
  };

  const saveEditTask = () => {
    const trimmedText = editTaskText.value.trim();
    if (!trimmedText || editTaskIndex.value === null) {
      errorStore.setEditTaskError(true);
      return;
    }

    tasks.value[editTaskIndex.value].text = trimmedText;
    resetEditState();
  };

  const cancelEditTask = () => {
    resetEditState();
  };

  const resetEditState = () => {
    editTaskIndex.value = null;
    editTaskText.value = '';
  };

  const saveTasksToLocalStorageDebounced = debounce(() => {
    saveTasksToLocalStorage(tasks.value);
  }, 500);

  watch(tasks, saveTasksToLocalStorageDebounced, { deep: true });

  return {
    tasks: filteredTasks,
    newTaskText,
    editTaskIndex,
    editTaskText,
    addTask,
    deleteTask,
    toggleTask,
    startEditTask,
    saveEditTask,
    cancelEditTask,
  };
});
