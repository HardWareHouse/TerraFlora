<template>
    <div class="product-detail-container max-w-7xl mx-auto py-8">
      <div class="flex flex-col lg:flex-row">
        <div class="product-images lg:w-1/2 p-4">
          <img src="/images/flower.webp" alt="Product Image" class="w-full h-96 object-cover rounded" />
        </div>
        <div class="product-info lg:w-1/2 p-4">
          <h1 class="text-3xl font-bold mb-4">{{ product.nom }}</h1>
          <div class="flex items-center mb-4">
            <div class="text-yellow-500 mr-2">
              <i class="bi bi-star text-gray-300" v-for="n in 5" :key="n"></i>
            </div>
            <span class="text-gray-500">0 Reviews</span>
          </div>
          <div class="flex items-center mb-4">
            <span class="text-2xl font-bold text-red-600 mr-2">${{ product.prix }}</span>
            <span v-if="product.isPromotion" class="line-through text-gray-500">${{ (product.prix / ((100 - product.pourcentagePromotion) / 100)).toFixed(2) }}</span>
          </div>
          <div class="mb-4 text-green-600 font-semibold">{{ product.stock }} IN STOCK</div>
          <p class="mb-4">{{ product.description }}</p>
          <div class="mb-4">
            <div>
              <label class="block text-gray-700">Taille:</label>
              <span>{{ product.taille }}</span>
            </div>
            <div class="mt-4">
              <label class="block text-gray-700">Couleur:</label>
              <span>{{ product.couleur }}</span>
            </div>
          </div>
          <div class="flex items-center mb-4">
            <div class="quantity flex items-center mr-4">
              <button class="px-4 py-2 bg-gray-200" @click="decreaseQuantity">-</button>
              <input type="text" v-model="quantity" class="w-12 text-center border-t border-b" />
              <button class="px-4 py-2 bg-gray-200" @click="increaseQuantity">+</button>
            </div>
            <button class="px-4 py-2 bg-red-600 text-white rounded" @click="addToCart">Add To Cart</button>
          </div>
          <button class="px-4 py-2 border rounded" @click="addToWishlist">Add to Wishlist</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const product = ref({});
  const quantity = ref(1);
  
  onMounted(async () => {
    const productId = route.params.id;
    try {
      const response = await axios.get(`http://localhost:8000/product/${productId}`);
      product.value = response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  });
  
  const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
  };
  
  const increaseQuantity = () => {
    quantity.value++;
  };
  
  const addToCart = () => {
  };
  
  const addToWishlist = () => {
  };
  </script>
  
  <style scoped>
  .product-detail-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .breadcrumbs a {
    color: #f56565;
    text-decoration: none;
  }
  
  .breadcrumbs span {
    color: #718096;
  }
  </style>
  