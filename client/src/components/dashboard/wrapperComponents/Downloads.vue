<template>
  <div id="download" class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-medium mb-4">Factures</h3>

    <div class="mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Rechercher par numéro de facture" 
        class="w-full p-2 border rounded" 
      />
    </div>

    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else>
      <div v-if="filteredInvoices.length > 0" class="overflow-x-auto">
        <table class="min-w-full border border-gray-200 text-center">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border border-gray-200">Numéro de Facture</th>
              <th class="px-4 py-2 border border-gray-200">Date de Facturation</th>
              <th class="px-4 py-2 border border-gray-200">Status de Paiement</th>
              <th class="px-4 py-2 border border-gray-200">Total</th>
              <th class="px-4 py-2 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in filteredInvoices" :key="invoice.id">
              <td class="p-3 border border-gray-200 md:p-4 lg:p-4">{{ invoice.numero }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ formatDate(invoice.dateFacturation) }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ invoice.statutPaiement }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ invoice.total }} €</td>
              <td class="p-3 border border-gray-200 lg:p-4">
                <router-link to="/basket" class="bg-red-600 text-white px-3 py-3 rounded-lg">
                  <i class="bi bi-cloud-download"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center">
        Vous n'avez pas encore de factures avec votre compte.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { useAuthStore } from '../../../pinia/auth.js';
import { useInvoice } from '../../../composables/useInvoice.js';

const authStore = useAuthStore();
const { invoices, loading, fetchInvoices } = useInvoice();

const userId = inject('userId');
const myUserId = ref(null);
const myInvoices = ref([]);
const searchQuery = ref('');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const filteredInvoices = computed(() => {
  if (!searchQuery.value) {
    return myInvoices.value;
  }
  return myInvoices.value.filter(invoice => 
    invoice.numero.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  if (userId && userId.value) {
    fetchInvoices().then(() => {
      myUserId.value = userId.value;
      myInvoices.value = invoices.value;
    });
  };
});
</script>
