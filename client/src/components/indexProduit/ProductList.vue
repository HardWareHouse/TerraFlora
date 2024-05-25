<template>
    <div class="product-list-container p-4 flex-1">
      <div class="flex justify-between items-center mb-4">
        <div>Showing 1–5 of 8 Results</div>
        <div>
          Sort By:
          <select v-model="sortBy" class="border p-1 rounded">
            <option value="relevance">Relevance</option>
            <option value="name">Name</option>
            <option value="model">Model</option>
          </select>
        </div>
      </div>
      <div class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="product border p-4 rounded hover:shadow-lg transition-shadow">
          <div class="product-image relative">
            <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded" />
            <span v-if="product.new" class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg">NEW</span>
            <span v-if="product.discount" class="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">{{ product.discount }}% OFF</span>
          </div>
          <div class="product-info mt-4 text-center">
            <h3 class="text-lg font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500">${{ product.price }}</p>
            <p v-if="product.originalPrice" class="line-through text-gray-400">${{ product.originalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const sortBy = ref('relevance');
  
  //à changer pour plus tard
  const products = ref([
    { id: 1, name: 'Flowers daisy pink stick', price: 40, image: '/images/flower.webp' },
    { id: 2, name: 'Jasmine flowers white', price: 20, image: '/images/flower.webp' },
    { id: 3, name: 'Blossom bouquet flower', price: 35, image: '/images/flower.webp' },
    { id: 4, name: 'Orchid flowers purple', price: 25, image: '/images/flower.webp' },
    { id: 5, name: 'Rose flowers red', price: 30, image: '/images/flower.webp' },
    { id: 6, name: 'Hyacinth flowers blue', price: 45, image: '/images/flower.webp' },
    { id: 7, name: 'Bouquet flowers mix', price: 50, image: '/images/flower.webp' },
    { id: 8, name: 'Blossom bouquet flower', price: 35, image: '/images/flower.webp' },
    { id: 9, name: 'Orchid flowers purple', price: 25, image: '/images/flower.webp'},
  ]);
  </script>
  
  <style scoped>
  .product-list-container {
    display: flex;
    flex-direction: column;
  }
  .product-image img {
    transition: transform 0.2s;
  }
  .product-image img:hover {
    transform: scale(1.05);
  }
  </style>
  