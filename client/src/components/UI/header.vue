<template>
  <header class="border-b border-gray-200">
    <div class="container mx-auto flex items-center justify-between py-2 px-4 h-10">
      <div class="text-[13px] text-gray-600 leading-none">
        Bienvenue sur Terra Flora
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1 text-[13px] text-gray-600 leading-none border-l border-gray-200">
          Langue:
          <select v-model="language" class="text-[13px] text-gray-600 leading-none focus:outline-none">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
    <p class="border-t border-gray-200 w-full"></p>
    <div class="container mx-auto flex items-center justify-between py-10 px-4">
      <div class="text-3xl font-bold text-black"><a href="/">Terra Flora</a></div>
      <nav class="flex space-x-6 text-sm font-medium">
        <router-link to="/" class="text-gray-700">ACCUEIL</router-link>
        <div class="relative group">
          <router-link to="/shop" class="text-gray-700">BOUTIQUE</router-link>
        </div>
      </nav>
      <div class="flex space-x-4 text-gray-700 align-center">
        <a href="#" @click.prevent="$emit('toggle-search')"><i class="bi bi-search" style="font-size: 1.5rem;"></i></a>
        <RouterLink v-if="!isAuthenticated" to="/login"><i class="bi bi-person" style="font-size: 1.5rem;"></i></RouterLink>
        <RouterLink v-else to="/dashboard"><i class="bi bi-person" style="font-size: 1.5rem;"></i></RouterLink>
        <RouterLink to="/wishlist"><i class="bi bi-heart" style="font-size: 1.5rem;"></i></RouterLink>
        <a href="#" @click.prevent="$emit('toggle-basket')"><i class="bi bi-cart" style="font-size: 1.5rem;"></i></a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref,computed } from 'vue';
import { useAuthStore } from '../../pinia/auth.js';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.token);

const language = ref('fr');

</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
