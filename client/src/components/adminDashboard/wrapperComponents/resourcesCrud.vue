<template>
  <div>
    <RessourcesTable :availableResources="availableResources" :resourcesData="resourcesData" @edit="editResource" @delete="deleteResource" />
  </div>
</template>

<script>
import RessourcesTable from './resourcesComponents/RessourcesTable.vue';

export default {
  components: {
    RessourcesTable
  },
  data() {
    return {
      availableResources: ['Produits', 'Categories', 'Utilisateurs'],
      resourcesData: {
        Produits: [
          { id: 1, name: 'Produit 1', createdAt: '2021-09-01' },
          { id: 2, name: 'Produit 2', createdAt: '2021-09-02' },
          { id: 3, name: 'Produit 3', createdAt: '2021-09-03' },
          { id: 4, name: 'Produit 4', createdAt: '2021-09-04' },
          { id: 5, name: 'Produit 5', createdAt: '2021-09-05' }
        ],
        Categories: [
          { id: 1, name: 'Categorie 1', createdAt: '2021-09-01' },
          { id: 2, name: 'Categorie 2', createdAt: '2021-09-02' },
          { id: 3, name: 'Categorie 3', createdAt: '2021-09-03' },
          { id: 4, name: 'Categorie 4', createdAt: '2021-09-04' },
          { id: 5, name: 'Categorie 5', createdAt: '2021-09-05' }
        ],
        Utilisateurs: [
          { id: 1, name: 'Utilisateur 1', createdAt: '2021-09-01' },
          { id: 2, name: 'Utilisateur 2', createdAt: '2021-09-02' },
          { id: 3, name: 'Utilisateur 3', createdAt: '2021-09-03' },
          { id: 4, name: 'Utilisateur 4', createdAt: '2021-09-04' },
          { id: 5, name: 'Utilisateur 5', createdAt: '2021-09-05' }
        ]
      }
    };
  },
  methods: {
    editResource(resource) {
      console.log('Modifier la ressource :', resource);
      // Implémentez la logique pour modifier la ressource via API
    },
    deleteResource(id) {
      console.log('Supprimer la ressource avec ID :', id);
      // Implémentez la logique pour supprimer la ressource via API
      // Pour l'exemple, nous allons supprimer localement
      this.resourcesData[this.selectedResource] = this.resourcesData[this.selectedResource].filter(resource => resource.id !== id);
    }
  }
};
</script>
