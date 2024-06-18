<template>
  <div class="filters p-6 border-r border-gray-300 bg-gray-50">
    <h2 class="text-xl font-bold mb-6 text-gray-800">Categories</h2>
    <ul class="space-y-3">
      <li v-for="category in categories" :key="category.id" class="flex items-center space-x-2">
        <input type="checkbox" :value="category.id" v-model="selectedCategories" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ category.nom }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Prix</h2>
    <div class="relative w-full my-4">
      <input type="range" v-model="priceRange" min="0" max="1000" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider" />
      <div class="flex justify-between mt-2 text-gray-700">
        <span>0€</span>
        <span>{{ priceRange }}€</span>
      </div>
    </div>
    <button @click="applyFilter" class="w-full mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition duration-300">Filter</button>

    <h2 class="text-xl font-bold my-6 text-gray-800">Marque</h2>
    <ul class="space-y-3">
      <li v-for="brand in brands" :key="brand" class="flex items-center space-x-2">
        <input type="checkbox" :value="brand" v-model="selectedBrands" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ brand }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Couleur</h2>
    <ul class="space-y-3">
      <li v-for="color in colors" :key="color" class="flex items-center space-x-2">
        <input type="checkbox" :value="color" v-model="selectedColors" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ color }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold my-6 text-gray-800">Taille</h2>
    <ul class="space-y-3">
      <li v-for="size in sizes" :key="size" class="flex items-center space-x-2">
        <input type="checkbox" :value="size" v-model="selectedSizes" class="form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-0" />
        <span class="text-gray-700">{{ size }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const categories = ref([
  { id: 'df777499-a0db-4b8e-968e-d511b9313e80', nom: 'Fleurs coupées' },
  { id: '19ce17f0-70c8-4f8b-9d55-50e3a9510235', nom: 'Bouquets' },
  { id: '7e2885cb-c3ef-465e-b911-94efdeece564', nom: 'Plantes en pot' },
  { id: 'c8da4897-435d-4ab7-b7c7-c07d55a4be79', nom: 'Fleurs séchées' },
]);
const selectedCategories = ref([]);
const priceRange = ref(500);

const brands = ref(['Fleurs de joie', 'Eclat floral', 'Les jardins épanouis', 'Boutique florale', 'Pétales d\'amour']);
const selectedBrands = ref([]);

const colors = ref(['Noir', 'Rouge', 'Bleu', 'Vert', 'Rose']);
const selectedColors = ref([]);

const sizes = ref(['S', 'M', 'L', 'XL']);
const selectedSizes = ref([]);

const emit = defineEmits(['filter']);

const applyFilter = () => {
  const filters = {
    categorie: selectedCategories.value.join(','),
    marque: selectedBrands.value.join(','),
    couleur: selectedColors.value.join(','),
    taille: selectedSizes.value.join(','),
    maxPrix: priceRange.value
  };
  emit('filter', filters);
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
