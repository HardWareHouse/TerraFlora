<template>
    <div class="filters p-4 border-r border-gray-200">
      <h2 class="text-lg font-semibold mb-4">Categories</h2>
      <ul class="space-y-2">
        <li v-for="category in categories" :key="category" class="flex items-center space-x-2">
          <input type="checkbox" :value="category" v-model="selectedCategories" class="form-checkbox h-4 w-4 text-red-600" />
          <span>{{ category }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Price</h2>
      <input type="range" v-model="priceRange" min="0" max="1000" step="10" class="w-full" />
      <div class="flex justify-between mt-2">
        <span>$0</span>
        <span>\${{ priceRange }}</span>
      </div>
  
      <h2 class="text-lg font-semibold my-4">Brand</h2>
      <ul class="space-y-2">
        <li v-for="brand in brands" :key="brand" class="flex items-center space-x-2">
          <input type="checkbox" :value="brand" v-model="selectedBrands" class="form-checkbox h-4 w-4 text-red-600" />
          <span>{{ brand }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Color</h2>
      <ul class="space-y-2">
        <li v-for="color in colors" :key="color" class="flex items-center space-x-2">
          <input type="checkbox" :value="color" v-model="selectedColors" class="form-checkbox h-4 w-4 text-red-600" />
          <span>{{ color }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Size</h2>
      <ul class="space-y-2">
        <li v-for="size in sizes" :key="size" class="flex items-center space-x-2">
          <input type="checkbox" :value="size" v-model="selectedSizes" class="form-checkbox h-4 w-4 text-red-600" />
          <span>{{ size }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const categories = ref(['Jasmine', 'Rose', 'Orchid', 'Blossom', 'Hyacinth', 'Bouquet']);
  const selectedCategories = ref([]);
  const priceRange = ref(500);
  
  const brands = ref(['Studio', 'Hastech', 'Quickiin', 'Graphic Corner', 'DevItems']);
  const selectedBrands = ref([]);
  
  const colors = ref(['Black', 'Red', 'Blue', 'Green', 'Pink']);
  const selectedColors = ref([]);
  
  const sizes = ref(['S', 'M', 'L', 'XL']);
  const selectedSizes = ref([]);
  </script>
  
  <style scoped>
  .filters {
    width: 250px;
  }
  </style>
  