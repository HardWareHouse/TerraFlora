<template>
  <div id="orders" class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-medium mb-4">Commandes</h3>
    
    <div class="mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Rechercher par numéro de commande" 
        class="w-full p-2 border rounded" 
      />
    </div>

    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else>
      <div v-if="filteredOrders.length > 0" class="overflow-x-auto">
        <table class="min-w-full border border-gray-200 text-center">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border border-gray-200">Numéro de commande</th>
              <th class="px-4 py-2 border border-gray-200">Date de commande</th>
              <th class="px-4 py-2 border border-gray-200">Status</th>
              <th class="px-4 py-2 border border-gray-200">Total</th>
              <th class="px-4 py-2 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="p-3 border border-gray-200 lg:p-4">{{ order.numero }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ formatDate(order.dateCommande) }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ order.statut }}</td>
              <td class="p-3 border border-gray-200 lg:p-4">{{ order.total }} €</td>
              <td class="p-3 border border-gray-200 lg:p-4">
                <router-link :to="'/orders/' + order.id" class="bg-red-600 text-white px-3 py-3 rounded-lg">
                  Voir
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center">
        Vous n'avez pas encore effectué de commandes avec votre compte.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { useAuthStore } from '../../../pinia/auth.js';
import { useOrder } from '../../../composables/useOrder.js';

const authStore = useAuthStore();
const { orders, loading, fetchOrders } = useOrder();

const userId = inject('userId');
const myUserId = ref(null);
const myOrders = ref([]);
const searchQuery = ref('');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const filteredOrders = computed(() => {
  if (!searchQuery.value) {
    return myOrders.value;
  }
  return myOrders.value.filter(order => 
    order.numero.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  if (userId && userId.value) {
    fetchOrders().then(() => {
      myUserId.value = userId.value;
      myOrders.value = orders.value;
    });
  };
});
</script>

