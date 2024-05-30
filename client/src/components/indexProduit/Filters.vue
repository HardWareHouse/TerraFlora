<template>
  <div class="filters p-6 border-r border-gray-300 bg-gray-50">
    <h2 class="text-xl font-bold mb-6 text-gray-800">Categories</h2>
    <ul class="space-y-3">
      <li v-for="category in categories" :key="category" class="flex items-center space-x-2">
        <input type="checkbox" :value="category" v-model="selectedCategories" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ category }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Price</h2>
    <div class="relative w-full my-4">
      <input type="range" v-model="priceRange" min="0" max="1000" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider" />
      <div class="flex justify-between mt-2 text-gray-700">
        <span>$0</span>
        <span>\${{ priceRange }}</span>
      </div>
    </div>
    <button @click="applyFilter" class="w-full mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition duration-300">Filter</button>

    <h2 class="text-xl font-bold my-6 text-gray-800">Brand</h2>
    <ul class="space-y-3">
      <li v-for="brand in brands" :key="brand" class="flex items-center space-x-2">
        <input type="checkbox" :value="brand" v-model="selectedBrands" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ brand }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Color</h2>
    <ul class="space-y-3">
      <li v-for="color in colors" :key="color" class="flex items-center space-x-2">
        <input type="checkbox" :value="color" v-model="selectedColors" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ color }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Size</h2>
    <ul class="space-y-3">
      <li v-for="size in sizes" :key="size" class="flex items-center space-x-2">
        <input type="checkbox" :value="size" v-model="selectedSizes" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ size }}</span>
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

const applyFilter = () => {
  console.log('Applied filters:', {
    selectedCategories: selectedCategories.value,
    priceRange: priceRange.value,
    selectedBrands: selectedBrands.value,
    selectedColors: selectedColors.value,
    selectedSizes: selectedSizes.value,
  });
};
</script>

<style scoped>
.filters {
  width: 300px;
}

input[type="range"].range-slider {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"].range-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  background: #ddd;
  border-radius: 10px;
}

input[type="range"].range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #d9534f;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
}

input[type="range"].range-slider:focus::-webkit-slider-runnable-track {
  background: #ccc;
}

input[type="range"].range-slider::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  background: #ddd;
  border-radius: 10px;
}

input[type="range"].range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #d9534f;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
}

input[type="range"].range-slider:focus::-moz-range-track {
  background: #ccc;
}
</style>
