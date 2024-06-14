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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '../components/shopPage/Breadcrumbs.vue';
import ProductList from '../components/shopPage/ProductList.vue';
import Filters from '../components/shopPage/Filters.vue';

const route = useRoute();
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

onMounted(() => {
  applyFilter(filters.value);
});

watch(
  () => route.query.search,
  (newSearchQuery) => {
    if (newSearchQuery) {
      filters.value = { ...filters.value, search: newSearchQuery };
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.shop-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
