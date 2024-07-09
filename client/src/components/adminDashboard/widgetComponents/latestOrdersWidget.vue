<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Dernières Commandes</h3>
        
        <table class="min-w-full bg-white">
          <thead>
            <tr class="w-full bg-gray-200">
              <th class="text-left py-2 px-4">Commande ID</th>
              <th class="text-left py-2 px-4">Client</th>
              <th class="text-left py-2 px-4">Date</th>
              <th class="text-left py-2 px-4">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in latestOrders" :key="order.id" class="border-b border-gray-200">
              <td class="py-2 px-4">{{ order.id }}</td>
              <td class="py-2 px-4">{{ order.customer }}</td>
              <td class="py-2 px-4">{{ order.date }}</td>
              <td class="py-2 px-4">{{ order.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        latestOrders: [
          { id: 1, customer: 'John Doe', date: '2024-06-12', amount: 150 },
          { id: 2, customer: 'Jane Smith', date: '2024-06-11', amount: 200 },
          { id: 3, customer: 'Michael Johnson', date: '2024-06-10', amount: 180 },
          { id: 4, customer: 'Emily Brown', date: '2024-06-09', amount: 220 },
          { id: 5, customer: 'David Williams', date: '2024-06-08', amount: 170 },
        ],
      };
    },
  };
</script>
  
<style scoped>
</style>
  