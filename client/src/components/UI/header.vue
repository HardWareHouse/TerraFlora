<template>
    <header class="border-b border-gray-200">
      <div class="container mx-auto flex items-center justify-between py-2 px-4">
        <div class="text-sm text-gray-600">
          Welcome to Floda online store
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1">
            <span>Language:</span>
            <select v-model="language" class="text-sm border-none focus:outline-none">
              <option value="en">English</option>
              <option value="fr">French</option>
              <!-- Ajoutez d'autres langues ici -->
            </select>
          </div>
          <div class="flex items-center space-x-1">
            <span>Currency:</span>
            <select v-model="currency" class="text-sm border-none focus:outline-none">
              <option value="usd">$ USD</option>
              <option value="eur">€ EUR</option>
              <!-- Ajoutez d'autres devises ici -->
            </select>
          </div>
        </div>
      </div>
      <div class="container mx-auto flex items-center justify-between py-4 px-4">
        <div class="text-3xl font-bold">Floda</div>
        <nav class="flex space-x-6 text-sm">
          <a href="#" class="text-red-500">HOME</a>
          <div class="relative group">
            <a href="#" class="text-gray-700">PAGES</a>
            <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
              <a href="#" class="block text-gray-700">About Us</a>
              <a href="#" class="block text-gray-700">Contact Us</a>
              <!-- Ajoutez d'autres liens ici -->
            </div>
          </div>
          <div class="relative group">
            <a href="#" class="text-gray-700">SHOP</a>
            <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
              <a href="#" class="block text-gray-700">All Products</a>
              <a href="#" class="block text-gray-700">Categories</a>
              <!-- Ajoutez d'autres liens ici -->
            </div>
          </div>
          <div class="relative group">
            <a href="#" class="text-gray-700">BLOG</a>
            <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
              <a href="#" class="block text-gray-700">Latest Posts</a>
              <a href="#" class="block text-gray-700">Categories</a>
              <!-- Ajoutez d'autres liens ici -->
            </div>
          </div>
          <a href="#" class="text-gray-700">CONTACT US</a>
        </nav>
        <div class="flex space-x-4 text-gray-700">
          <a href="#"><i class="fas fa-search"></i></a>
          <a href="#"><i class="fas fa-user"></i></a>
          <a href="#" class="relative">
            <i class="fas fa-heart"></i>
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">0</span>
          </a>
          <a href="#" class="relative">
            <i class="fas fa-shopping-cart"></i>
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">2</span>
          </a>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        language: 'en',
        currency: 'usd'
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>