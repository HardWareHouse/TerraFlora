<template>
  <div>
    <breadCrumbsBasket />
    <DataTable :data="cartItems" :columns="columns" :showCSVButton="true" />
    <Checkout />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../pinia/cart.js';
import breadCrumbsBasket from '../components/basket/breadCrumbsBasket.vue';
import DataTable from '../components/UI/datatable.vue';
import Checkout from '../components/basket/checkout.vue';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);

const columns = [
  { label: 'Image', key: 'image', sortable: false, searchable: false },
  { label: 'Produits', key: 'produit', sortable: true, searchable: true, searchQuery: '' },
  { label: 'Prix', key: 'prix', sortable: true, searchable: true, searchQuery: '' },
  { label: 'Quantité', key: 'quantity', sortable: true, searchable: true, searchQuery: '' },
  { label: 'Total', key: 'total', sortable: true, searchable: false },
];
</script>
