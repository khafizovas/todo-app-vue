import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));

  const newTaskText = ref('');
  const newTaskError = ref(false);

  const editTaskIndex = ref<number | null>(null);
  const editTaskText = ref('');
  const editTaskError = ref(false);

  const addTask = () => {
    if (!newTaskText.value.trim()) {
      newTaskError.value = true;
      return;
    }

    resetAddTaskError();

    const newTask: Task = {
      id: uuidv4(),
      text: newTaskText.value.trim(),
      completed: false,
    };

    tasks.value.push(newTask);
    newTaskText.value = '';
  };

  const resetAddTaskError = () => {
    newTaskError.value = false;
  };

  const startEditTask = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (!task) {
      return;
    }

    editTaskIndex.value = tasks.value.indexOf(task);
    editTaskText.value = task.text;
  };

  const saveEditTask = () => {
    const trimmedText = editTaskText.value.trim();

    if (!trimmedText || !editTaskIndex.value) {
      editTaskError.value = true;
      return;
    }

    tasks.value[editTaskIndex.value].text = trimmedText;
    editTaskIndex.value = null;

    resetEditTaskError();
  };

  const cancelEditTask = () => {
    editTaskIndex.value = null;
    editTaskText.value = '';
    editTaskError.value = false;
  };

  const resetEditTaskError = () => {
    editTaskError.value = false;
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const toggleTask = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (!task) {
      return;
    }

    task.completed = !task.completed;
  };

  const saveTasksToLocalStorage = debounce(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }, 500);

  watch(
    tasks,
    () => {
      saveTasksToLocalStorage();
    },
    { deep: true }
  );

  return {
    tasks,
    newTaskText,
    newTaskError,
    editTaskIndex,
    editTaskText,
    editTaskError,
    addTask,
    resetAddTaskError,
    startEditTask,
    saveEditTask,
    cancelEditTask,
    resetEditTaskError,
    deleteTask,
    toggleTask,
  };
});
