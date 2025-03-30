import { ref } from 'vue';
import { defineStore } from 'pinia';

export const FILTERS = {
  all: 'Все',
  completed: 'Выполненные',
  incomplete: 'Невыполненные',
};
export type Filter = keyof typeof FILTERS;

export const useFilterStore = defineStore('filter', () => {
  const filter = ref<Filter>('all');

  const setFilter = (newFilter: Filter) => {
    filter.value = newFilter;
  };

  return {
    filter,
    setFilter,
  };
});
