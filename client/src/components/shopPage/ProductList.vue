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
      <div>Affichage {{ startItem }}–{{ endItem }} sur {{ filteredProducts.length }} résultats</div>
      <div>
        Trier par:
        <select v-model="sortBy" class="border p-1 rounded">
          <option value="relevance">Pertinence</option>
          <option value="name">Nom</option>
          <option value="model">Marque</option>
        </select>
      </div>
    </div>

    <div v-if="viewMode === 'grid'" class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product border p-4 rounded hover:shadow-lg transition-shadow relative" @click="goToProductDetail(product)">
        <div class="product-image relative">
          <img :src="getImageUrl(product.Images[0]?.imageUrl)" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.isPromotion"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">PROMOTION</span>
          <span v-if="product.pourcentagePromotion"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.pourcentagePromotion }}% OFF</span>
          <div class="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center space-y-2 opacity-0 hover:opacity-100 transition-opacity">
            <button v-if="product.stock > 0" class="relative bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300" @click.stop="addToCart(product)">
              <i class="bi bi-cart"></i>
              <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10"> Ajouter au panier</span>
            </button>
            <button class="relative bg-white text-red-600 p-2 border border-red-600 rounded-full shadow-lg hover:bg-red-100 transition duration-300" @click.stop="goToProductDetail(product)">
              <i class="bi bi-eye"></i>
              <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10">Voir produit</span>
            </button>
          </div>
        </div>
        <div class="product-info mt-4 text-center">
          <h3 class="text-lg font-semibold">{{ product.nom }}</h3>
          <p class="text-gray-500">${{ product.prix }}</p>
          <p v-if="product.stock <= product.stockThreshold && product.stock > 0" class="text-yellow-500 text-sm">Il reste très peu de produits en stock</p>
          <p v-if="product.stock === 0" class="text-red-600 text-sm">En rupture de stock</p>
        </div>
      </div>
    </div>

    <div v-else class="product-list space-y-6">
      <div v-for="product in paginatedProducts" :key="product.id"
        class="product flex border p-4 rounded hover:shadow-lg transition-shadow" @click="goToProductDetail(product)">
        <div class="product-image relative w-1/3">
          <img :src="getImageUrl(product.Images[0]?.imageUrl)" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <span v-if="product.isPromotion"
            class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">PROMOTION</span>
          <span v-if="product.pourcentagePromotion"
            class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.pourcentagePromotion }}% OFF</span>
        </div>
        <div class="product-info ml-4 w-2/3">
          <h3 class="text-lg font-semibold">{{ product.nom }}</h3>
          <p class="text-gray-500">{{ product.prix }} €</p>
          <p v-if="viewMode === 'list'" class="text-gray-600">Marque: {{ product.marque }}</p>
          <p class="mt-2 text-gray-700">{{ product.description }}</p>
          <div class="flex space-x-2 mt-4">
            <button v-if="product.stock > 0" class="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition duration-300" @click.stop="addToCart(product)">
              <i class="bi bi-cart-plus"></i> Ajouter au panier
            </button>
            <button class="px-4 py-2 bg-white text-red-600 border border-red-600 rounded hover:bg-red-100 transition duration-300" @click.stop="goToProductDetail(product)">
              <i class="bi bi-eye"></i>
            </button>
          </div>
          <p v-if="product.stock <= product.stockThreshold && product.stock > 0" class="text-yellow-500 text-sm mt-2">Il reste très peu de produits en stock</p>
          <p v-if="product.stock === 0" class="text-red-600 text-sm mt-2">En rupture de stock</p>
        </div>
      </div>
    </div>

    <Pagination :totalItems="filteredProducts.length" v-model:modelValue="currentPage" :itemsPerPage="itemsPerPage" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '../../pinia/cart.js';
import Pagination from './Pagination.vue';
import axios from 'axios';

const props = defineProps({
  filters: Object
});

const sortBy = ref('relevance');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const viewMode = ref('grid');
const products = ref([]);
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const fetchProducts = async () => {
  try {
    const searchQuery = route.query.search || '';
    const response = await axios.get('http://localhost:8000/product/filter', {
      params: { ...props.filters, search: searchQuery }
    });
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

function getImageUrl(imagePath) {
  if (!imagePath) {
    return '/images/flower.webp';
  }
  return `http://localhost:8000/${imagePath}`;
}

watch(() => props.filters, fetchProducts, { immediate: true });
watch(() => route.query.search, fetchProducts, { immediate: true });
watch(sortBy, fetchProducts, { immediate: true });

const filteredProducts = computed(() => {
  let sortedProducts = products.value;

  if (sortBy.value === 'name') {
    sortedProducts = [...sortedProducts].sort((a, b) => a.nom.localeCompare(b.nom));
  } else if (sortBy.value === 'model') {
    sortedProducts = [...sortedProducts].sort((a, b) => a.marque.localeCompare(b.marque));
  }

  return sortedProducts.filter(product => product.prix <= props.filters.maxPrix);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredProducts.value.length));

function goToProductDetail(product) {
  if (!product || !product.nom) {
    console.error("Invalid product data", product);
    return;
  }
  const productName = encodeURIComponent(product.nom);
  router.push({ name: 'ProductDetail', params: { name: productName } });
}

function addToCart(product) {
  const cartItem = cartStore.items.find(item => item.id === product.id);
  const totalQuantity = cartItem ? cartItem.quantity + 1 : 1;

  if (totalQuantity <= product.stock) {
    cartStore.addToCart(product, 1);
    console.log(`Added 1 ${product.nom} to cart`);
  } else {
    alert('La quantité totale demandée dépasse le stock disponible');
  }
}
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

button span {
  display: none;
}

button:hover span {
  display: inline-block;
  z-index: 10;
}

.text-yellow-500 {
  font-size: 0.875rem;
}

.text-red-600 {
  font-size: 0.875rem; 
}
</style>
