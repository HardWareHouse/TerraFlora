<template>
    <Breadcrumbs />
    <div class="shop-page max-w-7xl mx-auto py-8">
      <div class="flex">
        <Filters @filter="applyFilter" class="w-1/4" />
        <ProductList :filters="filters" class="w-3/4" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Breadcrumbs from '../components/shopPage/Breadcrumbs.vue';
  import ProductList from '../components/shopPage/ProductList.vue';
  import Filters from '../components/shopPage/Filters.vue';
  
  const filters = ref({
    categorie: '',
    marque: '',
    couleur: '',
    taille: '',
    maxPrix: 1000,
  });
  
  const applyFilter = (newFilters) => {
    filters.value = newFilters;
  };
  
  // Initial fetch for all products
  onMounted(() => {
    applyFilter(filters.value);
  });
  </script>
  
  <style scoped>
  .shop-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  </style>
  