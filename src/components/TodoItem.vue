<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodoStore, type Task } from '../store/todoStore';

const props = defineProps<{
  index: number;
  task: Task;
}>();

const store = useTodoStore();
const { editTaskIndex, editTaskText, editTaskError } = storeToRefs(store);

const isEditing = computed(() => editTaskIndex.value === props.index);
</script>

<template>
  <li class="flex items-center p-3 border-b border-black">
    <input
      type="checkbox"
      :checked="props.task.completed"
      @change="store.toggleTask(props.task.id)"
      class="mr-3 w-5 h-5 accent-black" />

    <input
      v-if="isEditing"
      v-model="editTaskText"
      autofocus
      @focus="store.resetEditTaskError"
      @blur="store.cancelEditTask"
      @keyup.enter="store.saveEditTask"
      id="edit-task"
      class="flex-1 p-1 border rounded" />

    <span
      v-else
      @click="store.startEditTask(props.task.id)"
      class="text-black cursor-pointer"
      :class="{ 'line-through text-gray-500': props.task.completed }">
      {{ props.task.text }}
    </span>

    <div class="w-full md:flex justify-end items-center">
      <p v-if="editTaskError" class="text-red-500 text-sm mt-1">
        Введите задачу перед изменением
      </p>

      <button
        @click="store.deleteTask(props.task.id)"
        class="w-6 h-6 text-red-500 cursor-pointer">
        x
      </button>
    </div>
  </li>
</template>
