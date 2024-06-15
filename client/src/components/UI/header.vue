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
          </select>
        </div>
        <div class="flex items-center space-x-1 text-[13px] text-gray-600 leading-none">
          Currency:
          <select v-model="currency" class="text-[13px] text-gray-600 leading-none focus:outline-none">
            <option value="usd">$ USD</option>
            <option value="eur">€ EUR</option>
          </select>
        </div>
      </div>
    </div>
    <p class="border-t border-gray-200 w-full"></p>
    <div class="container mx-auto flex items-center justify-between py-10 px-4">
      <div class="text-3xl font-bold">Terra Flora</div>
      <nav class="flex space-x-6 text-sm font-medium">
        <router-link to="/" class="text-gray-700">HOME</router-link>
        <div class="relative group">
          <router-link to="/shop" class="text-gray-700">SHOP</router-link>
        </div>
      </nav>
      <div class="flex space-x-4 text-gray-700 align-center">
        <a href="#" @click.prevent="$emit('toggle-search')"><i class="bi bi-search" style="font-size: 1.5rem;"></i></a>
        <RouterLink to="/login"><i class="bi bi-person" style="font-size: 1.5rem;"></i></RouterLink>
        <RouterLink to="/wishlist"><i class="bi bi-heart" style="font-size: 1.5rem;"></i></RouterLink>
        <a href="#" @click.prevent="$emit('toggle-basket')"><i class="bi bi-cart" style="font-size: 1.5rem;"></i></a>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

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
