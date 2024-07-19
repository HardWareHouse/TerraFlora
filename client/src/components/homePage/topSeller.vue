<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold text-center mb-4">Meilleures ventes</h2>
    <p class="text-center text-[14px] text-gray-600 mb-8">Nos meilleurs ventes</p> 
    <Carousel :wrap-around="true" :items-to-show="1" :breakpoints="breakpoints" class="product-carousel">
      <Slide v-for="product in topProducts" :key="product.id">
        <div class="relative product-card">
        <div class="border rounded-lg overflow-hidden">
          <div class="relative">
            <img :src="product.image || '/images/flower.webp'" :alt="product.nom" class="w-full h-64 object-cover">
            <div class="absolute top-2 left-2 flex space-y-1 w-11/12 justify-between">
              <span v-if="product.isPromotion"
                class="bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">PROMOTION</span>
              <span v-if="product.pourcentagePromotion"
                class="bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg mt-0">{{ product.pourcentagePromotion }}% OFF</span>
            </div>
            <div class="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center space-y-2 opacity-0 product-card-hover mr-2">
              <button class="relative bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300" @click.stop="addToCart(product)">
                <i class="bi bi-cart"></i>
                <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10">Ajouter au panier</span>
              </button>
              <button @click.stop="goToProductDetail(product)" class="relative bg-white text-red-600 p-2 border border-red-600 rounded-full shadow-lg hover:bg-red-100 transition duration-300">
                <i class="bi bi-eye"></i>
                <span class="absolute right-full mr-2 bg-red-600 text-white px-2 py-1 rounded z-10">Voir en détail</span>
              </button>
            </div>
          </div>
        </div>
        <div class="p-4 mt-2">
          <h3 class="text-[16px] flex justify-start mb-2">{{ product.nom }}</h3>
          <div class="flex items-center w-3/12 justify-between text-[17px]">
            <span class="font-bold text-black">{{ product.prix }}€</span>
            <span class="line-through text-gray-500" v-if="product.oldPrice">{{ product.oldPrice }} €</span>
          </div>
        </div>
      </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../pinia/cart.js';
import axios from 'axios';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';


const router = useRouter();
const cartStore = useCartStore();
const products = ref([]);

function goToProductDetail(product) {
  if (!product || !product.nom) {
    console.error("Invalid product data", product);
    return;
  }
  const productName = encodeURIComponent(product.nom);
  router.push({ name: 'ProductDetail', params: { name: productName } });
}

function addToCart(product) {
  cartStore.addToCart(product, 1);
}

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/product');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const topProducts = computed(() => products.value.slice(0, 10));

const breakpoints = ref({
  700: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.product-card {
  position: relative;
  overflow: hidden;
}

.product-card img {
  transition: transform 0.2s;
}

.product-card:hover img {
  transform: scale(1.05);
}

.product-card:hover .product-card-hover {
  opacity: 1;
}

.product-card-hover {
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
