<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-medium mb-4">Orders</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-200">Order</th>
            <th class="px-4 py-2 border border-gray-200">Date</th>
            <th class="px-4 py-2 border border-gray-200">Status</th>
            <th class="px-4 py-2 border border-gray-200">Total</th>
            <th class="px-4 py-2 border border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4 border border-gray-200">1</td>
            <td class="p-4 border border-gray-200">Aug 22, 2023</td>
            <td class="p-4 border border-gray-200">Pending</td>
            <td class="p-4 border border-gray-200">$3000</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
                View
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
