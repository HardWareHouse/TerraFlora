<template>
  <header class="border-b border-gray-200">
    <div class="container mx-auto flex items-center justify-between py-2 px-4 h-10">
      <div class="text-[13px] text-gray-600 leading-none">
        Welcome to Terra Flora online store
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1 text-[13px] text-gray-600 leading-none border-l border-gray-200">
          Language:
          <select v-model="language" class="text-[13px] text-gray-600 leading-none focus:outline-none">
            <option value="en">English</option>
            <option value="fr">French</option>
            <!-- Ajoutez d'autres langues ici -->
          </select>
        </div>
        <div class="flex items-center space-x-1 text-[13px] text-gray-600 leading-none">
          Currency:
          <select v-model="currency" class="ttext-[13px] text-gray-600 leading-none focus:outline-none">
            <option value="usd">$ USD</option>
            <option value="eur">€ EUR</option>
            <!-- Ajoutez d'autres devises ici -->
          </select>
        </div>
      </div>
    </div>
    <p class="border-t border-gray-200 w-full"></p>
    <div class="container mx-auto flex items-center justify-between py-10 px-4">
      <div class="text-3xl font-bold">Terra Flora</div>
      <nav class="flex space-x-6 text-sm font-medium">
        <a href="#" class="text-red-600">HOME</a>
        <div class="relative group">
          <a href="#" class="text-gray-700">PAGES</a>&nbsp;<i class="bi bi-chevron-down"></i>
          <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
            <a href="#" class="block text-gray-700">About Us</a>
            <a href="#" class="block text-gray-700">Contact Us</a>
            <!-- Ajoutez d'autres liens ici -->
          </div>
        </div>
        <div class="relative group">
          <a href="#" class="text-gray-700">SHOP</a>&nbsp;<i class="bi bi-chevron-down"></i>
          <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
            <a href="#" class="block text-gray-700">All Products</a>
            <a href="#" class="block text-gray-700">Categories</a>
            <!-- Ajoutez d'autres liens ici -->
          </div>
        </div>
        <div class="relative group">
          <a href="#" class="text-gray-700">BLOG</a>&nbsp;<i class="bi bi-chevron-down"></i>
          <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 p-2 space-y-2">
            <a href="#" class="block text-gray-700">Latest Posts</a>
            <a href="#" class="block text-gray-700">Categories</a>
            <!-- Ajoutez d'autres liens ici -->
          </div>
        </div>
        <a href="#" class="text-gray-700">CONTACT US</a>
      </nav>
      <div class="flex space-x-4 text-gray-700 align-center">
        <a href="#"><i class="bi bi-search" style="font-size: 1.2rem;"></i></a>
        <a href="#"><i class="bi bi-person" style="font-size: 1.4rem;"></i></a>
        <a href="#"><i class="bi bi-heart" style="font-size: 1.2rem;"></i></a>
        <a href="#"><i class="bi bi-cart" style="font-size: 1.2rem;"></i></a>
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