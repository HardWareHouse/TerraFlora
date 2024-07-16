<template>
  <div class="bg-gray-100 py-20 w-full">
    <div class="container mx-auto text-center">
      <h1 class="text-3xl font-semibold mb-2">Détails de la commande</h1>
      <nav class="text-sm font-medium text-gray-500" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex justify-center space-x-2">
          <li class="flex items-center">
            <router-link to="/" class="flex items-center text-gray-500 hover:text-gray-700">
              <i class="bi bi-house"></i>
            </router-link>
          </li>
          <li>
            <span class="text-gray-400 mx-2">/</span>
          </li>
          <li class="flex items-center">
            <router-link to="/dashboard" class="text-gray-500 hover:text-gray-700">
              Commandes
            </router-link>
          </li>
          <li>
            <span class="text-gray-400 mx-2">/</span>
          </li>
          <li class="flex items-center">
            <span class="text-red-600">Détails de la commande</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
