<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
    <div class="px-6 py-4">
      <div class="mb-4">
        <label for="resourceSelect" class="block text-xl font-bold text-gray-700">Choisissez une ressource</label>
        <select v-model="localSelectedResource" @change="emitResourceChange" id="resourceSelect" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-3">
          <option v-for="resource in availableResources" :key="resource" :value="resource">{{ resource }}</option>
        </select>
      </div>
      <table class="min-w-full bg-white">
        <thead>
          <tr class="w-full bg-gray-200">
            <th v-for="key in resourceKeys" :key="key" class="text-left py-2 px-4">{{ transformKey(key) }}</th>
            <th class="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in paginatedResources" :key="resource.id" class="border-b border-gray-200">
            <td v-for="key in resourceKeys" :key="key" class="py-2 px-4">{{ transformValue(resource[key], key) }}</td>
            <td class="py-2 px-4 flex items-center space-x-2">
              <button v-if="canEditResource(resource)" @click="openEditModal(resource)" class="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <i class="bi bi-pencil-square mr-2"></i>
                <span class="hidden md:inline">Modifier</span>
              </button>
              <DeleteButton
                v-if="canDeleteResource(resource)"
                :onConfirm="() => deleteResource(resource.id)"
                buttonClass="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                confirmationMessage="Êtes-vous sûr de vouloir supprimer cette ressource ?"
              >
                Supprimer
              </DeleteButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4 flex justify-between items-center">
        <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer">Précédent</button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer">Suivant</button>
      </div>
    </div>

    <EditResourceModal 
      v-if="editModalVisible"
      :isVisible="editModalVisible"
      :resource="selectedResourceForEdit"
      :editableFields="getEditableFields()"
      :resourceType="localSelectedResource"
      :editResourceMethod="emitEditResource"
      :modalTitle="`Éditer ${localSelectedResource}`"
      @edit="emitEditResource"
      @close="closeEditModal"
    />
  </div>
</template>

<script>
import DeleteButton from '../../../challengesRequirement/deleteButton.vue';
import EditResourceModal from '../../../challengesRequirement/editResourceModal.vue';

export default {
  components: {
    DeleteButton,
    EditResourceModal,
  },
  props: {
    availableResources: {
      type: Array,
      required: true,
    },
    resourcesData: {
      type: Object,
      required: true,
    },
    selectedResource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localSelectedResource: this.selectedResource,
      keyTransformations: {
        id: 'ID',
        numero: 'Numéro',
        statut: 'Statut',
        dateCommande: 'Date de Commande',
        total: 'Total',
        trackingNumber: 'Numéro de Suivi',
        statutPaiement: 'Statut de Paiement',
        datePaiement: 'Date de Paiement',
        dateLivraison: 'Date de Livraison',
        datePaiementDue: 'Date de Paiement Due',
        dateFacturation: 'Date de Facturation',
        wantsMailNewProduct: 'Mail Nouveau Produit',
        wantsMailRestockProduct: 'Mail Restock Produit',
        wantsMailChangingPrice: 'Mail Changement de Prix',
        wantsMailNewsletter: 'Mail Newsletter',
        nom: 'Nom',
        prenom: 'Prénom',
        telephone: 'Téléphone',
        email: 'Email',
        role: 'Rôle',
        subject: 'Sujet',
        message: 'Message',
        dateContact: 'Date de Contact',
        user: 'Utilisateur',
        status: 'Statut',
        voie: 'Voie',
        codePostal: 'Code Postal',
        ville: 'Ville',
        rue: 'Rue',
        isDeliveryAddress: 'Adresse de Livraison',
        isBillingAddress: 'Adresse de Facturation',
        description: 'Description',
      },
      valueTransformations: {
        true: 'Oui',
        false: 'Non',
        ROLE_USER: 'Utilisateur',
        ROLE_STORE_KEEPER: 'Gestionnaire de Stock',
        ROLE_COMPTABLE: 'Comptable',
      },
      currentPage: 1,
      itemsPerPage: 5,
      editModalVisible: false,
      selectedResourceForEdit: null,
    };
  },
  computed: {
    resources() {
      return this.resourcesData[this.localSelectedResource] || [];
    },
    resourceKeys() {
      return this.resources.length > 0 ? Object.keys(this.resources[0]) : [];
    },
    paginatedResources() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.resources.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.resources.length / this.itemsPerPage);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    transformKey(key) {
      return this.keyTransformations[key] || key;
    },
    transformValue(value, key) {
      if (key.toLowerCase().includes('date')) {
        return this.formatDate(value);
      } else if (key === 'message' && value.length > 100) {
        return `${value.slice(0, 100)}...`;
      } else if (key === 'user') {
        return `${value.nom.toUpperCase()} ${value.prenom}`;
      }
      return this.valueTransformations[value] || value;
    },
    canEditResource(resource) {
      if (this.localSelectedResource === 'Utilisateurs') return true;
      if (this.localSelectedResource === 'Commandes') return false;
      if (this.localSelectedResource === 'Factures') return false;
      if (this.localSelectedResource === 'Adresses') return false;
      if (this.localSelectedResource === 'Contacts') return false;
      if (this.localSelectedResource === 'Categories') return true;
      return false;
    },
    canDeleteResource(resource) {
      if (this.localSelectedResource === 'Utilisateurs') return true;
      if (this.localSelectedResource === 'Commandes') return true;
      if (this.localSelectedResource === 'Factures') return true;
      if (this.localSelectedResource === 'Adresses') return true;
      if (this.localSelectedResource === 'Contacts') return true;
      if (this.localSelectedResource === 'Categories') return true;
      return false;
    },
    openEditModal(resource) {
      this.selectedResourceForEdit = { ...resource };
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editModalVisible = false;
      this.selectedResourceForEdit = null;
    },
    emitEditResource(updatedResource) {
      this.$emit('edit', updatedResource);
      this.closeEditModal();
    },
    emitResourceChange() {
      this.$emit('resourceChange', this.localSelectedResource);
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    getEditableFields() {
      const fields = {
        Utilisateurs: ['nom', 'prenom', 'email', 'telephone', 'role'],
        Categories: ['nom', 'description'],
      };
      return fields[this.localSelectedResource] || [];
    },
    async deleteResource(resourceId) {
      try {
        await this.$emit('delete', resourceId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la ressource:', error);
      }
    },
  },
  watch: {
    selectedResource(newVal) {
      this.localSelectedResource = newVal;
    },
  },
};
</script>
