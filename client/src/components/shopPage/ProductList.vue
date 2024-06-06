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
      <div>Showing {{ startItem }}–{{ endItem }} of {{ products.length }} Results</div>
      <div>
        Sort By:
        <select v-model="sortBy" class="border p-1 rounded">
          <option value="relevance">Relevance</option>
          <option value="name">Name</option>
          <option value="model">Model</option>
        </select>
      </div>
    </div>

    <div v-if="viewMode === 'grid'" class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product border p-4 rounded hover:shadow-lg transition-shadow relative">
        <div class="product-image relative">
          <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.new"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">NEW</span>
          <span v-if="product.discount"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.discount
            }}% OFF</span>
          <!-- Buttons to appear on hover -->
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
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-gray-500">${{ product.price }}</p>
          <p v-if="product.originalPrice" class="line-through text-gray-400">${{ product.originalPrice }}</p>
        </div>
      </div>
    </div>

    <div v-else class="product-list space-y-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product flex border p-4 rounded hover:shadow-lg transition-shadow">
        <div class="product-image relative w-1/3">
          <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.new"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">NEW</span>
          <span v-if="product.discount"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.discount
            }}% OFF</span>
        </div>
        <div class="product-info ml-4 w-2/3">
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-gray-500">${{ product.price }}</p>
          <p v-if="product.originalPrice" class="line-through text-gray-400">${{ product.originalPrice }}</p>
          <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde perspiciatis quod numquam, sit
            fugiat, deserunt ipsa mollitia sunt quam corporis ullam rem, accusantium adipisci officia eaque.</p>
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

    <Pagination :totalItems="products.length" v-model:modelValue="currentPage" :itemsPerPage="itemsPerPage" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from './Pagination.vue';

const sortBy = ref('relevance');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const viewMode = ref('grid'); // State for view mode (grid or list)

const products = ref([
  { id: 1, name: 'A', price: 40, image: '/images/flower.webp' },
  { id: 2, name: 'C', price: 20, image: '/images/flower.webp' },
  { id: 3, name: 'D', price: 35, image: '/images/flower.webp' },
  { id: 4, name: 'E', price: 25, image: '/images/flower.webp' },
  { id: 5, name: 'F', price: 30, image: '/images/flower.webp' },
  { id: 6, name: 'G', price: 45, image: '/images/flower.webp' },
  { id: 7, name: 'H', price: 50, image: '/images/flower.webp' },
  { id: 8, name: 'I', price: 35, image: '/images/flower.webp' },
  { id: 9, name: 'J', price: 25, image: '/images/flower.webp' },
  { id: 10, name: 'K', price: 30, image: '/images/flower.webp' },
  { id: 11, name: 'L', price: 45, image: '/images/flower.webp' },
  { id: 12, name: 'M', price: 50, image: '/images/flower.webp' },
  { id: 13, name: 'Fleur A', price: 35, image: '/images/flower.webp' },
  { id: 14, name: 'Fleur B', price: 25, image: '/images/flower.webp' },
  { id: 15, name: 'Fleur C', price: 30, image: '/images/flower.webp' },
  { id: 16, name: 'Fleur D', price: 45, image: '/images/flower.webp' },
  { id: 17, name: 'Fleur E', price: 50, image: '/images/flower.webp' },
  { id: 18, name: 'Fleur F', price: 35, image: '/images/flower.webp' },
  { id: 19, name: 'Fleur G', price: 25, image: '/images/flower.webp' },
  { id: 20, name: 'Fleur H', price: 30, image: '/images/flower.webp' },
  { id: 21, name: 'Fleur I', price: 45, image: '/images/flower.webp' },
  { id: 22, name: 'Fleur J', price: 50, image: '/images/flower.webp' },
  { id: 23, name: 'Fleur K', price: 35, image: '/images/flower.webp' },
  { id: 24, name: 'Fleur L', price: 25, image: '/images/flower.webp' },
  { id: 25, name: 'Fleur M', price: 30, image: '/images/flower.webp' },
  { id: 26, name: 'Fleur N', price: 45, image: '/images/flower.webp' },
  { id: 27, name: 'Fleur O', price: 50, image: '/images/flower.webp' },
  { id: 28, name: 'Fleur P', price: 35, image: '/images/flower.webp' },
  { id: 29, name: 'Fleur Q', price: 25, image: '/images/flower.webp' },
  { id: 30, name: 'Fleur R', price: 30, image: '/images/flower.webp' },
]);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, products.value.length));
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
