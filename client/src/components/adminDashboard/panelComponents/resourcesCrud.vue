<template>
  <div>
    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div class="px-6 py-4">
        <div class="mb-4">
          <label for="resourceSelect" class="block text-xl font-bold text-gray-700">Gestion des ressources</label>
          <select v-model="selectedResource" id="resourceSelect" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-3">
            <option v-for="resource in availableResources" :key="resource" :value="resource">{{ resource }}</option>
          </select>
        </div>
        <!-- <h2 class="text-sm font-semibold text-gray-800 mb-2">Les {{ selectedResource }}</h2> -->
        <table class="min-w-full bg-white">
          <thead>
            <tr class="w-full bg-gray-200">
              <th class="text-left py-2 px-4">ID</th>
              <th class="text-left py-2 px-4">Nom</th>
              <th class="text-left py-2 px-4">Date de création</th>
              <th class="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in resources" :key="resource.id" class="border-b border-gray-200">
              <td class="py-2 px-4">{{ resource.id }}</td>
              <td class="py-2 px-4">{{ resource.name }}</td>
              <td class="py-2 px-4">{{ resource.createdAT }}</td>
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
      selectedResource: 'Produits',
      availableResources: ['Produits', 'Categories', 'Utilisateurs'],
      resourcesData: {
        Produits: [
          { id: 1, name: 'Produit 1', createdAT: '2021-09-01'},
          { id: 2, name: 'Produit 2', createdAT: '2021-09-02'},
          { id: 3, name: 'Produit 3', createdAT: '2021-09-03'},
        ],
        Categories: [
          { id: 1, name: 'Categorie 1', createdAT: '2021-09-01'},
          { id: 2, name: 'Categorie 2', createdAT: '2021-09-02'},
          { id: 3, name: 'Categorie 3', createdAT: '2021-09-03'},
        ],
        Utilisateurs: [
          { id: 1, name: 'Utilisateur 1', createdAT: '2021-09-01'},
          { id: 2, name: 'Utilisateur 2', createdAT: '2021-09-02'},
          { id: 3, name: 'Utilisateur 3', createdAT: '2021-09-03'},
        ],
      },
    };
  },
  computed: {
    resources() {
      return this.resourcesData[this.selectedResource];
    },
  },
  methods: {
    editResource(resource) {
      console.log('Modifier la ressource :', resource);
    },
    deleteResource(id) {
      console.log('Supprimer la ressource avec ID :', id);
      this.resourcesData[this.selectedResource] = this.resourcesData[this.selectedResource].filter(
        resource => resource.id !== id
      );
    },
  },
};
</script>

<style scoped>
</style>
