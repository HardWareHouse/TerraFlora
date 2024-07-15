<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Produits les plus vendus</h3>
        
        <ul>
          <li v-for="(product, index) in topSellingProducts" :key="index" class="py-2">
            <span class="font-semibold">{{ product.name }}</span> - {{ product.sales }} ventes
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        topSellingProducts: [
          { name: 'Product A', sales: 120 },
          { name: 'Product B', sales: 90 },
          { name: 'Product C', sales: 80 },
          { name: 'Product D', sales: 75 },
          { name: 'Product E', sales: 70 },
        ],
      };
    },
  };
</script>
  
<style scoped>
</style>
  