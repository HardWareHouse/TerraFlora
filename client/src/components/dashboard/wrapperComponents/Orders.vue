<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-medium mb-4">Commandes</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-200">Numéro de commande</th>
            <th class="px-4 py-2 border border-gray-200">Date</th>
            <th class="px-4 py-2 border border-gray-200">Status</th>
            <th class="px-4 py-2 border border-gray-200">Total</th>
            <th class="px-4 py-2 border border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4 border border-gray-200">1</td>
            <td class="p-4 border border-gray-200">18/06/2024</td>
            <td class="p-4 border border-gray-200">En cours</td>
            <td class="p-4 border border-gray-200">3000 €</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
                Voir
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="p-4 border border-gray-200">2</td>
            <td class="p-4 border border-gray-200">18/06/2024</td>
            <td class="p-4 border border-gray-200">En cours</td>
            <td class="p-4 border border-gray-200">2000 €</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
                Voir
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="p-4 border border-gray-200">3</td>
            <td class="p-4 border border-gray-200">05/01/2024</td>
            <td class="p-4 border border-gray-200">Complété</td>
            <td class="p-4 border border-gray-200">32000 €</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
                Voir
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="p-4 border border-gray-200">4</td>
            <td class="p-4 border border-gray-200">30/12/2023</td>
            <td class="p-4 border border-gray-200">Annulé</td>
            <td class="p-4 border border-gray-200">450 €</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
                Voir
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
</script>
