<template>
    <div v-if="isVisible" class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 py-8">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
        </div>
        <div class="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full p-6">
          <div class="flex items-start justify-between">
            <h3 class="text-xl font-semibold text-gray-800">{{ modalTitle }}</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">Close</span>
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="mt-4">
            <div v-for="field in editableFields" :key="field" class="mb-4">
              <label :for="field" class="block text-sm font-medium text-gray-700">{{ transformKey(field) }}</label>
              <input v-model="localResource[field]" :id="field" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="close" class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Annuler
            </button>
            <button @click="editResource" class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      resource: {
        type: Object,
        required: true,
      },
      editableFields: {
        type: Array,
        required: true,
      },
      modalTitle: {
        type: String,
        required: true,
      },
      resourceType: {
        type: String,
        required: true,
      },
      editResourceMethod: {
        type: Function,
        required: true,
      }
    },
    data() {
      return {
        localResource: { ...this.resource },
      };
    },
    methods: {
      transformKey(key) {
        const keyTransformations = {
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
        };
        return keyTransformations[key] || key;
      },
      editResource() {
        this.editResourceMethod(this.localResource);
      },
      close() {
        this.$emit('close');
      },
    },
  };
</script>
  
<style scoped>
.fixed.z-50 {
z-index: 50;
}
</style>
  