<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';

import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';

const taskStore = useTaskStore();
</script>

<template>
  <div
    class="max-w-2xl w-full mx-auto mt-10 p-6 bg-white border-2 border-black rounded-xl">
    <h1 class="text-3xl font-semibold text-black text-center mb-6">
      Список дел
    </h1>

    <TodoInput />

    <ul class="mt-6">
      <TodoItem
        v-for="task in taskStore.tasks"
        :key="task.text"
        :task="task"
        :index="taskStore.tasks.indexOf(task)" />
    </ul>
  </div>
</template>
