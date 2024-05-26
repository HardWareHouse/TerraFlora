<template>
    <div class="flex justify-center my-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded-l hover:bg-gray-200">‹</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{'bg-red-600 text-white': page === currentPage, 'bg-white': page !== currentPage}"
        class="px-3 py-1 border-t border-b hover:bg-gray-200"
      >{{ page }}</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded-r hover:bg-gray-200">›</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Number,
      default: 1
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const currentPage = ref(props.modelValue);
  
  watch(() => props.modelValue, (newVal) => {
    currentPage.value = newVal;
  });
  
  watch(currentPage, (newPage) => {
    emit('update:modelValue', newPage);
  });
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const goToPage = (page) => {
    currentPage.value = page;
  };
  </script>
  
  <style scoped>
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
  