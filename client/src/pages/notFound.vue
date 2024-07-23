<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <div class="bg-red-100 text-red-600 p-6 rounded-full mb-4">
        <i class="bi bi-exclamation-triangle-fill" style="font-size: 3rem;"></i>
      </div>
      <h1 class="text-3xl font-bold mb-4">Erreur 404 : Page non trouvée</h1>
      <p class="text-gray-600 mb-4">Nous sommes désolés, mais la page que vous recherchez n'existe pas ou a été déplacée.</p>
      <router-link to="/" class="px-4 py-2 bg-red-600 text-white rounded">Retour à l'accueil</router-link>
      <router-link to="/shop" class="px-4 py-2 bg-gray-600 text-white rounded mt-2">Voir les produits</router-link>
    </div>
  </template>
  
  <script setup>
  </script> 