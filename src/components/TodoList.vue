<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTaskStore } from '../store/taskStore';
import { FILTERS, type Filter as FilterType } from '../store/filterStore';

import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';
import Filter from './Filter.vue';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
</script>

<template>
  <div
    class="max-w-2xl w-full mx-auto mt-10 p-6 bg-white border-2 border-black rounded-xl">
    <h1 class="text-3xl font-semibold text-black text-center mb-6">
      Список дел
    </h1>

    <TodoInput />

    <div class="flex justify-center gap-4 mt-4">
      <Filter
        v-for="filter in Object.keys(FILTERS) as FilterType[]"
        :key="filter"
        :filter="filter" />
    </div>

    <ul class="mt-6">
      <li v-if="tasks.length === 0" class="text-center text-gray-500">
        Нет задач
      </li>

      <TodoItem
        v-for="task in tasks"
        :key="task.text"
        :task="task"
        :index="tasks.indexOf(task)" />
    </ul>
  </div>
</template>
