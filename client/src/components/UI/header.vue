<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow">
    <div class="container mx-auto flex items-center justify-between px-4 h-10">
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
    <div class="container mx-auto flex items-center justify-around px-4 lg:justify-between">
      <div><a href="/"><img src="../../assets/homePage/TerraFlora_logo.png" alt="Terra Flora" class="h-32" /></a></div>
      <nav class="flex space-x-0 mr-4 text-sm font-medium lg:space-x-6">
        <router-link to="/" class="text-gray-700 hidden lg:block">ACCUEIL</router-link> 
        <div class="relative group">
          <router-link to="/shop" class="text-gray-700">BOUTIQUE</router-link>
        </div>
      </nav>
      <div class="flex space-x-4 text-gray-700 items-center">
        <a href="#" @click.prevent="$emit('toggle-search')"><i class="bi bi-search" style="font-size: 1.2rem;"></i></a>
        <RouterLink v-if="!isAuthenticated" to="/login"><i class="bi bi-person" style="font-size: 1.5rem;"></i></RouterLink>
        <RouterLink v-else to="/dashboard"><i class="bi bi-person" style="font-size: 1.5rem;"></i></RouterLink>
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
