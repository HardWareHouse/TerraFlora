<template>
  <div class="pagination flex justify-center items-center mt-4">
    <button 
      :disabled="currentPage === 1" 
      @click="goToPage(currentPage - 1)"
      class="px-4 py-2 mx-1 border rounded disabled:opacity-50">
      Previous
    </button>
    <button 
      v-for="page in totalPages" 
      :key="page" 
      @click="goToPage(page)"
      :class="{'bg-blue-500 text-white': currentPage === page, 'bg-white text-blue-500': currentPage !== page}"
      class="px-4 py-2 mx-1 border rounded">
      {{ page }}
    </button>
    <button 
      :disabled="currentPage === totalPages" 
      @click="goToPage(currentPage + 1)"
      class="px-4 py-2 mx-1 border rounded disabled:opacity-50">
      Next
    </button>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(['update:modelValue']);

const { totalItems, itemsPerPage, modelValue } = toRefs(props);

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const currentPage = computed(() => modelValue.value);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emits('update:modelValue', page);
  }
};
</script>

<style scoped>
.pagination button {
  transition: background-color 0.2s, color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: #3b82f6;
  color: white;
}

.pagination button:disabled {
  cursor: not-allowed;
}
</style>
