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
        <div v-for="product in products" :key="product.id" class="product border p-4 rounded">
          <div class="product-image">
            <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded" />
          </div>
          <div class="product-info mt-4">
            <h3 class="text-lg font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500">${{ product.price }}</p>
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
    { id: 1, name: 'Flowers daisy pink stick', price: 40, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Jasmine flowers white', price: 20, image: '/path/to/image2.jpg' },
    { id: 3, name: 'Blossom bouquet flower', price: 35, image: '/path/to/image3.jpg' },
    { id: 4, name: 'Orchid flowers purple', price: 25, image: '/path/to/image4.jpg' },
    { id: 5, name: 'Rose flowers red', price: 30, image: '/path/to/image5.jpg' },
    { id: 6, name: 'Hyacinth flowers blue', price: 45, image: '/path/to/image6.jpg' },
    { id: 7, name: 'Bouquet flowers mix', price: 50, image: '/path/to/image7.jpg' },
    { id: 8, name: 'Blossom bouquet flower', price: 35, image: '/path/to/image8.jpg' },
    { id: 9, name: 'Orchid flowers purple', price: 25, image: '/path/to/image9.jpg'},
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
  