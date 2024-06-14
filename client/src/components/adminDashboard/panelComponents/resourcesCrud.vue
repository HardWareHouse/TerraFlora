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
                <td class="py-2 px-4">
                  <button @click="editResource(resource)" class="text-blue-500 hover:text-blue-700 mr-2">Modifier</button>
                  <button @click="deleteResource(resource.id)" class="text-red-500 hover:text-red-700">Supprimer</button>
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
  