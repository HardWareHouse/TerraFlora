<template>
    <div>
      <!-- Interface CRUD pour les ressources -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Gestion des Ressources</h2>
          <!-- Exemple d'une table CRUD fictive -->
          <table class="min-w-full bg-white">
            <thead>
              <tr class="w-full bg-gray-200">
                <th class="text-left py-2 px-4">ID</th>
                <th class="text-left py-2 px-4">Nom</th>
                <th class="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Exemple de lignes de données fictives -->
              <tr v-for="resource in resources" :key="resource.id" class="border-b border-gray-200">
                <td class="py-2 px-4">{{ resource.id }}</td>
                <td class="py-2 px-4">{{ resource.name }}</td>
                <td class="py-2 px-4 flex items-center space-x-2">
                  <button @click="editResource(resource)" class="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <i class="bi bi-pencil-square mr-2"></i>
                    <span class="hidden md:inline">Modifier</span>
                  </button>
                  <button @click="deleteResource(resource.id)" class="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    <i class="bi bi-trash3 mr-2"></i>
                    <span class="hidden md:inline">Supprimer</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        resources: [
          { id: 1, name: 'Ressource 1' },
          { id: 2, name: 'Ressource 2' },
          { id: 3, name: 'Ressource 3' },
          { id: 4, name: 'Ressource 4' },
          // Exemple de données fictives pour le CRUD
        ],
      };
    },
    methods: {
      editResource(resource) {
        // Logique pour éditer une ressource
        console.log('Modifier la ressource :', resource);
      },
      deleteResource(id) {
        // Logique pour supprimer une ressource
        console.log('Supprimer la ressource avec ID :', id);
      },
    },
  };
  </script>
  