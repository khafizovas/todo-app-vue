<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useTaskStore } from '../store/taskStore';
import { useErrorStore } from '../store/errorStore';

const taskStore = useTaskStore();
const errorStore = useErrorStore();

const { newTaskText } = storeToRefs(taskStore);
const { addTaskError } = storeToRefs(errorStore);

const borderClass = computed(() =>
  addTaskError.value ? 'border-red-500' : 'border-black'
);

const handleAddTask = (event: Event) => {
  event.preventDefault();
  taskStore.addTask();
};
</script>

<template>
  <form @submit="handleAddTask" class="flex">
    <input
      v-model="newTaskText"
      @focus="errorStore.resetAddTaskError"
      placeholder="Добавить задачу..."
      id="new-task"
      class="flex-1 p-3 bg-white text-black border-2 rounded-l-xl focus:outline-none"
      :class="borderClass" />

    <button
      type="submit"
      aria-label="Добавить задачу"
      class="bg-white text-black px-6 rounded-r-xl border-2 border-l-0 border-black hover:bg-black hover:text-white cursor-pointer">
      +
    </button>
  </form>

  <p v-if="addTaskError" class="text-red-500 text-sm mt-1">
    Введите задачу перед добавлением
  </p>
</template>
