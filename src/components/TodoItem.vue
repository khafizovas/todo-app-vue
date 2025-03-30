<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { storeToRefs } from 'pinia';

import { useErrorStore } from '../store/errorStore';
import { type Task, useTaskStore } from '../store/taskStore';

const props = defineProps<{
  index: number;
  task: Task;
}>();

const taskStore = useTaskStore();
const errorStore = useErrorStore();

const { editTaskIndex, editTaskText } = storeToRefs(taskStore);
const { editTaskError } = storeToRefs(errorStore);

const isEditing = computed(() => editTaskIndex.value === props.index);

const handleEditTaskBlur = () => {
  taskStore.cancelEditTask();
  errorStore.resetEditTaskError();
};
</script>

<template>
  <li class="flex items-center p-3 border-b border-black">
    <input
      type="checkbox"
      :checked="props.task.completed"
      @change="taskStore.toggleTask(props.task.id)"
      class="mr-3 w-5 h-5 accent-black" />

    <input
      v-if="isEditing"
      v-model="editTaskText"
      autofocus
      @focus="errorStore.resetEditTaskError"
      @blur="handleEditTaskBlur"
      @keyup.enter="taskStore.saveEditTask"
      id="edit-task"
      class="flex-1 p-1 border rounded" />

    <span
      v-else
      @click="taskStore.startEditTask(props.task.id)"
      class="text-black cursor-pointer"
      :class="{ 'line-through text-gray-500': props.task.completed }">
      {{ props.task.text }}
    </span>

    <div class="w-full md:flex justify-end items-center">
      <p v-if="editTaskError" class="text-red-500 text-sm mt-1">
        Введите задачу перед изменением
      </p>

      <button
        @click="taskStore.deleteTask(props.task.id)"
        class="w-6 h-6 text-red-500 cursor-pointer">
        x
      </button>
    </div>
  </li>
</template>
