<template>
    <div class="filters p-4 border-r border-gray-200">
      <h2 class="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category" class="mb-2">
          <input type="checkbox" :value="category" v-model="selectedCategories" />
          <span>{{ category }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Price</h2>
      <input type="range" v-model="priceRange" min="0" max="1000" step="10" />
      <div class="flex justify-between mt-2">
        <span>$0</span>
        <span>\${{ priceRange }}</span>
      </div>
  
      <h2 class="text-lg font-semibold my-4">Brand</h2>
      <ul>
        <li v-for="brand in brands" :key="brand" class="mb-2">
          <input type="checkbox" :value="brand" v-model="selectedBrands" />
          <span>{{ brand }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Color</h2>
      <ul>
        <li v-for="color in colors" :key="color" class="mb-2">
          <input type="checkbox" :value="color" v-model="selectedColors" />
          <span>{{ color }}</span>
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold my-4">Size</h2>
      <ul>
        <li v-for="size in sizes" :key="size" class="mb-2">
          <input type="checkbox" :value="size" v-model="selectedSizes" />
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
  