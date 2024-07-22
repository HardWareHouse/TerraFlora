<template>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Configuration du site</h2>
          
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="px-6 py-4">
              <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                  <label for="siteTitle" class="block text-medium font-semibold text-gray-700">Titre du site</label>
                  <input v-model="formData.siteTitle" type="text" id="siteTitle" class="mt-1 block w-full px-3 py-2 text-base placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Titre du site">
                </div>
      
                <div class="mb-4">
                  <label for="siteDescription" class="block text-medium font-semibold text-gray-700">Description du site</label>
                  <textarea v-model="formData.siteDescription" id="siteDescription" rows="4" class="mt-1 block w-full px-3 py-2 text-base placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Description du site"></textarea>
                </div>
      
                <div class="mb-4">
                  <label for="logoUrl" class="block text-medium font-semibold text-gray-700">URL de l'image du logo</label>
                  <input v-model="formData.logoUrl" type="url" id="logoUrl" class="mt-1 block w-full px-3 py-2 text-base placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="URL de l'image du logo">
                </div>

                <div class="mb-4">
                  <label for="primaryColor" class="block text-medium font-semibold text-gray-700">Couleur principale du site</label>
                  <input v-model="formData.primaryColor" type="color" id="primaryColor" class="mt-1 block w-full px-3 py-2 text-base placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
      
                <div>
                  <button type="submit" class="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <i class="bi bi-save mr-2"></i>
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
    const formData = ref({
        siteTitle: "Mon Site Web",
        siteDescription: "Bienvenue sur mon site !",
        logoUrl: "https://example.com/logo.png",
        primaryColor: "#3490dc",
    });

    const handleSubmit = () => {
        // Logique pour soumettre les données de configuration via API
        console.log("Formulaire soumis avec les données :", formData.value);
        // Envoie des données via Axios ou une autre méthode
    };
</script>
  
<style scoped>
</style>
  