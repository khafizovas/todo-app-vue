import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const addTaskError = ref(false);
  const editTaskError = ref(false);

  const setAddTaskError = (value: boolean) => {
    addTaskError.value = value;
  };

  const resetAddTaskError = () => {
    addTaskError.value = false;
  };

  const setEditTaskError = (value: boolean) => {
    editTaskError.value = value;
  };

  const resetEditTaskError = () => {
    editTaskError.value = false;
  };

  return {
    addTaskError,
    editTaskError,
    setAddTaskError,
    resetAddTaskError,
    setEditTaskError,
    resetEditTaskError,
  };
});
