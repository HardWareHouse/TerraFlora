<template>
  <div>
    <RessourcesTable
      :availableResources="availableResources"
      :resourcesData="resourcesData"
      @edit="editResource"
      @delete="deleteResource"
    />
  </div>
</template>

<script>
import RessourcesTable from "./resourcesComponents/RessourcesTable.vue";
import axios from "axios"; // Import axios for API calls

export default {
  components: {
    RessourcesTable,
  },
  data() {
    return {
      availableResources: ["Produits", "Categories", "Utilisateurs"],
      resourcesData: {
        Produits: [],
        Categories: [],
        Utilisateurs: [],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Fetch data from the API for each resource
        const [produits, categories, utilisateurs] = await Promise.all([
          axios.get("http://localhost:8000/product"), // Endpoint for products
          axios.get("http://localhost:8000/categories"), // Endpoint for categories
          axios.get("http://localhost:8000/users"), // Endpoint for users
        ]);

        // Update resourcesData with the fetched data
        this.resourcesData.Produits = produits.data;
        this.resourcesData.Categories = categories.data;
        this.resourcesData.Utilisateurs = utilisateurs.data;
        console.log(utilisateurs.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    editResource(resource) {
      console.log("Modifier la ressource :", resource);
      // Implement the logic to edit the resource via API
    },
    async deleteResource(id) {
      console.log("Supprimer la ressource avec ID :", id);
      try {
        console.log("Try");
        // Make an API call to delete the resource
        await axios.delete(`http://localhost:8000/users/${id}`); // Adjust the endpoint for the appropriate resource

        // Update local resourcesData after deletion
        this.resourcesData[this.selectedResource] = this.resourcesData[
          this.selectedResource
        ].filter((resource) => resource.id !== id);
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    },
  },
};
</script>
