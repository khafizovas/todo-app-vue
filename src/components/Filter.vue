<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { FILTERS, useFilterStore, type Filter } from '../store/filterStore';

const props = defineProps<{
  filter: Filter;
}>();

const filterStore = useFilterStore();
const { filter: activeFilter } = storeToRefs(filterStore);

const isActive = computed(() => props.filter === activeFilter.value);
</script>

<template>
  <button
    @click="filterStore.setFilter(props.filter)"
    class="cursor-pointer"
    :class="{ 'font-bold': isActive }">
    {{ FILTERS[props.filter] }}
  </button>
</template>
