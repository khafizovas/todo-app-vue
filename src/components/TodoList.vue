<script setup>
import { ref, watch } from 'vue';

const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || []);

const newTaskText = ref('');
const newTaskError = ref(false);

const editTaskIndex = ref(null);
const editTaskText = ref('');
const editTaskError = ref(false);

const addTask = () => {
  if (!newTaskText.value.trim()) {
    newTaskError.value = true;
    return;
  }

  resetAddTaskError();
  tasks.value.push({ text: newTaskText.value, completed: false });
  newTaskText.value = '';
};

const resetAddTaskError = () => {
  newTaskError.value = false;
};

const startEditTask = (index) => {
  editTaskIndex.value = index;
  editTaskText.value = tasks.value[index].text;
};

const saveEditTask = () => {
  if (!editTaskText.value.trim()) {
    editTaskError.value = true;
    return;
  }

  resetEditTaskError();
  tasks.value[editTaskIndex.value].text = editTaskText.value;
  editTaskIndex.value = null;
};

const cancelEditTask = () => {
  editTaskIndex.value = null;
  editTaskText.value = '';
  editTaskError.value = false;
};

const resetEditTaskError = () => {
  editTaskError.value = false;
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  },
  { deep: true }
);
</script>

<template>
  <div
    class="max-w-2xl w-full mx-auto mt-10 p-6 bg-white border-2 border-black rounded-xl">
    <h1 class="text-3xl font-semibold text-black text-center mb-6">
      Список дел
    </h1>

    <div class="flex">
      <input
        v-model="newTaskText"
        @keyup.enter="addTask"
        @focus="resetAddTaskError"
        placeholder="Добавить задачу"
        id="new-task"
        :class="[
          'flex-1 p-3 bg-white text-black border-2 rounded-l-xl focus:outline-none',
          newTaskError ? 'border-red-500' : 'border-black',
        ]" />
      <button
        @click="addTask"
        class="bg-white text-black px-6 rounded-r-xl border-2 border-l-0 border-black hover:bg-black hover:text-white cursor-pointer">
        +
      </button>
    </div>

    <p v-if="newTaskError" class="text-red-500 text-sm mt-1">
      Введите задачу перед добавлением
    </p>

    <ul class="mt-6">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center p-3 border-b border-black">
        <input
          type="checkbox"
          v-model="task.completed"
          class="mr-3 w-5 h-5 accent-black" />

        <span
          v-if="editTaskIndex !== index"
          @click="startEditTask(index)"
          class="text-black"
          :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.text }}
        </span>

        <input
          v-else
          v-model="editTaskText"
          @focus="resetEditTaskError"
          @blur="cancelEditTask"
          @keyup.enter="saveEditTask"
          id="edit-task"
          class="flex-1 p-1 border rounded" />

        <p v-if="editTaskError" class="text-red-500 text-sm mt-1">
          Введите задачу перед изменением
        </p>

        <button
          v-else
          @click="deleteTask(index)"
          class="ml-2 text-red-500 cursor-pointer">
          x
        </button>
      </li>
    </ul>
  </div>
</template>
