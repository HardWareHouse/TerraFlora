<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-medium mb-4">Downloads</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-200">Product</th>
            <th class="px-4 py-2 border border-gray-200">Date</th>
            <th class="px-4 py-2 border border-gray-200">Expired</th>
            <th class="px-4 py-2 border border-gray-200">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-4 border border-gray-200">Flowers daisy pink stick</td>
            <td class="p-4 border border-gray-200">Aug 22, 2023</td>
            <td class="p-4 border border-gray-200">Pending</td>
            <td class="p-4 border border-gray-200">
              <router-link to="/basket" class="bg-red-600 text-white px-4 py-3">
               <i class="bi bi-cloud-download mr-2"></i>Download
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
