<template>
  <div class="product-list-container p-4 flex-1">
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-2">
        <button
          @click="viewMode = 'grid'"
          :class="{'bg-red-600 text-white': viewMode === 'grid', 'bg-white text-red-600': viewMode !== 'grid'}"
          class="px-4 py-2 border rounded hover:bg-red-500 hover:text-white transition">
          <i class="bi bi-grid-fill"></i>
        </button>
        <button
          @click="viewMode = 'list'"
          :class="{'bg-red-600 text-white': viewMode === 'list', 'bg-white text-red-600': viewMode !== 'list'}"
          class="px-4 py-2 border rounded hover:bg-red-500 hover:text-white transition">
          <i class="bi bi-list-ul"></i>
        </button>
      </div>
      <div>Showing {{ startItem }}–{{ endItem }} of {{ filteredProducts.length }} Results</div>
      <div>
        Trier par:
        <select v-model="sortBy" class="border p-1 rounded">
          <option value="relevance">Pertinence</option>
          <option value="name">Nom</option>
          <option value="model">Marque</option>
        </select>
      </div>
    </div>

    <div class="filters-container mb-4">
      <Filters @filter="applyFilter" />
    </div>

    <div v-if="viewMode === 'grid'" class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product border p-4 rounded hover:shadow-lg transition-shadow relative">
        <div class="product-image relative">
          <img :src="product.image || '/images/flower.webp'" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.isPromotion"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">PROMOTION</span>
          <span v-if="product.pourcentagePromotion"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.pourcentagePromotion
            }}% OFF</span>
          <div class="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center space-y-2 opacity-0 hover:opacity-100 transition-opacity">
            <button class="relative bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300">
              <i class="bi bi-cart"></i>
              <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10">Add to Cart</span>
            </button>
            <button class="relative bg-white text-red-600 p-2 border border-red-600 rounded-full shadow-lg hover:bg-red-100 transition duration-300">
              <i class="bi bi-heart"></i>
              <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10">Add to Wishlist</span>
            </button>
          </div>
        </div>
        <div class="product-info mt-4 text-center">
          <h3 class="text-lg font-semibold">{{ product.nom }}</h3>
          <p class="text-gray-500">${{ product.prix }}</p>
        </div>
      </div>
    </div>

    <div v-else class="product-list space-y-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product flex border p-4 rounded hover:shadow-lg transition-shadow">
        <div class="product-image relative w-1/3">
          <img :src="product.image || '/images/flower.webp'" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.isPromotion"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">PROMOTION</span>
          <span v-if="product.pourcentagePromotion"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.pourcentagePromotion
            }}% OFF</span>
        </div>
        <div class="product-info ml-4 w-2/3">
          <h3 class="text-lg font-semibold">{{ product.nom }}</h3>
          <p class="text-gray-500">${{ product.prix }}</p>
          <p class="mt-2 text-gray-700">{{ product.description }}</p>
          <div class="flex space-x-2 mt-4">
            <button class="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition duration-300">
              Add to Cart
            </button>
            <button class="px-4 py-2 bg-white text-red-600 border border-red-600 rounded hover:bg-red-100 transition duration-300">
              <i class="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination :totalItems="filteredProducts.length" v-model:modelValue="currentPage" :itemsPerPage="itemsPerPage" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Pagination from './Pagination.vue';
import Filters from './Filters.vue';
import axios from 'axios';

const sortBy = ref('relevance');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const viewMode = ref('grid');
const products = ref([]);
const filters = ref({});

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/product/filter', {
      params: filters.value
    });
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const applyFilter = (newFilters) => {
  filters.value = newFilters;
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  return products.value.filter(product => product.prix <= filters.value.maxPrix);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredProducts.value.length));
</script>

<style scoped>
.product-list-container {
  display: flex;
  flex-direction: column;
}

.product-image img {
  transition: transform 0.2s;
}

.product-image:hover img {
  transform: scale(1.05);
}

.product-image:hover .absolute {
  opacity: 1;
}

.absolute {
  transition: opacity 0.2s;
  opacity: 0;
}

button span {
  display: none;
}

button:hover span {
  display: inline-block;
  z-index: 10;
}
</style>
