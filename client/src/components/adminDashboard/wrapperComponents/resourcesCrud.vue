<template>
  <div class="container mx-auto px-4 py-8">
    <RessourcesTable 
      :availableResources="availableResources" 
      :resourcesData="resourcesData" 
      :selectedResource="selectedResource"
      @edit="editResource" 
      @delete="deleteResource" 
      @resourceChange="handleResourceChange"
    />
  </div>
</template>

<script>
import RessourcesTable from './resourcesComponents/RessourcesTable.vue';
import { useUser } from '../../../composables/useUser.js';
import { useInvoice } from '../../../composables/useInvoice.js';
import { useOrder } from '../../../composables/useOrder.js';

export default {
  components: {
    RessourcesTable,
  },
  data() {
    return {
      availableResources: ['Commandes', 'Factures', 'Utilisateurs'],
      resourcesData: {
        Commandes: [],
        Utilisateurs: [],
        Factures: [],
      },
      selectedResource: 'Commandes',
      loading: false,
    };
  },
  watch: {
    selectedResource: {
      handler: 'fetchResources',
      immediate: true,
    },
  },
  methods: {
    async fetchResources() {
      this.loading = true;
      try {
        if (this.selectedResource === 'Utilisateurs') {
          const { fetchUsers, users } = useUser();
          await fetchUsers();
          this.resourcesData.Utilisateurs = users.value;
        } else if (this.selectedResource === 'Commandes') {
          const { fetchOrders, orders } = useOrder();
          await fetchOrders();
          this.resourcesData.Commandes = orders.value;
        } else if (this.selectedResource === 'Factures') {
          const { fetchInvoices, invoices } = useInvoice();
          await fetchInvoices();
          this.resourcesData.Factures = invoices.value;
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${this.selectedResource}:`, error);
      } finally {
        this.loading = false;
      }
    },
    handleResourceChange(newResource) {
      this.selectedResource = newResource;
    },
    editResource(resource) {
      console.log('Modifier la ressource :', resource);
    },
    async deleteResource(id) {
      console.log('Supprimer la ressource avec ID :', id);
      this.resourcesData[this.selectedResource] = this.resourcesData[this.selectedResource].filter(resource => resource.id !== id);
    },
  },
  mounted() {
    this.fetchResources();
  },
};
</script>
