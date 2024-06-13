<template>
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button @click.prevent="$emit('close')" class="absolute top-16 right-20 text-gray-600 hover:text-gray-800">
        <i class="bi bi-x-lg" style="font-size: 2rem; color: white;"></i>
      </button>
      <div class="w-full max-w-screen-lg p-4 rounded relative">
        <div class="flex items-center w-full">
          <input
            type="text"
            placeholder="Search entire storage here..."
            class=" w-full border-b border-red-600 bg-transparent pb-2 text-xl text-white outline outline-0 focus:border-red-600 focus:outline-0 placeholder:text-white placeholder-opacity-50"
            v-model="searchQuery"
          />
          <button @click="performSearch" class="text-white px-4 py-2 flex items-center space-x-2 focus:outline-none">
            <i class="bi bi-search" style="font-size: 2rem; color: white;"></i>
            <span class="text-xl">Search</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  
  const searchQuery = ref('');
  
  function performSearch() {
    console.log('Perform search with query:', searchQuery.value);
  }
</script>
  