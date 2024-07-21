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
import { useAddress } from '../../../composables/useAddress.js';
import { useUser } from '../../../composables/useUser.js';
import { useInvoice } from '../../../composables/useInvoice.js';
import { useOrder } from '../../../composables/useOrder.js';
import { useContact } from '../../../composables/useContact.js';
import { useCategorie } from '../../../composables/useCategorie.js';

export default {
  components: {
    RessourcesTable,
  },
  data() {
    return {
      availableResources: ['Adresses', 'Commandes', 'Contacts', 'Categories', 'Factures', 'Utilisateurs'],
      resourcesData: {
        Commandes: [],
        Contacts: [],
        Categories: [],
        Utilisateurs: [],
        Factures: []
      },
      selectedResource: 'Adresses',
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
        } else if (this.selectedResource === 'Adresses') {
          const { fetchAddresses, addresses } = useAddress();
          await fetchAddresses();
          this.resourcesData.Adresses = addresses.value;
        }else if (this.selectedResource === 'Commandes') {
          const { fetchOrders, orders } = useOrder();
          await fetchOrders();
          this.resourcesData.Commandes = orders.value;
        } else if (this.selectedResource === 'Contacts') {
          const { fetchContacts, contacts } = useContact();
          await fetchContacts();
          this.resourcesData.Contacts = contacts.value;
        } else if (this.selectedResource === 'Categories') {
          const { fetchCategories, categories } = useCategorie();
          await fetchCategories();
          this.resourcesData.Categories = categories.value;
        }
        else if (this.selectedResource === 'Factures') {
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
