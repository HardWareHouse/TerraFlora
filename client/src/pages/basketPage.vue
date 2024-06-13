<template>
  <div>
    <breadCrumbsBasket />
    <DataTable :data="tableData" :columns="columns" />
    <Checkout />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import breadCrumbsBasket from '../components/basket/breadCrumbsBasket.vue';
import DataTable from '../components/UI/datatable.vue';
import Checkout from '../components/basket/checkout.vue';

import slide1 from '../assets/homePage/product-1.jpg';
import slide2 from '../assets/homePage/product-2.jpg';

const tableData = ref([
  { id: 1, images: slide1, product: 'Flowers Bouquet Pink', price: 295, quantity: 1},
  { id: 2, images: slide2, product: 'Jasmine Flowers White', price: 275, quantity: 2},
  { id: 3, images: slide1, product: 'Blossom Bouquet Flower', price: 295, quantity: 1},
  { id: 4, images: slide2, product: 'Hyacinth White Stick', price: 110, quantity: 3},
  { id: 5, images: slide1, product: 'Flowers Bouquet Pink', price: 285, quantity: 1},
  { id: 6, images: slide2, product: 'Jasmine Flowers White', price: 175, quantity: 2},
  { id: 7, images: slide1, product: 'Blossom Bouquet Flower', price: 395, quantity: 1},
  { id: 8, images: slide2, product: 'Hyacinth White Stick', price: 190, quantity: 3},
]);

const columns = ref([
  { label: 'IMAGE', key: 'images', component: 'img', sortable: false, searchable: false },
  { label: 'PRODUCT', key: 'product', sortable: true, searchable: true, searchQuery: '' },
  { label: 'PRICE', key: 'price', sortable: true, searchable: true, searchQuery: '' },
  { label: 'QUANTITY', key: 'quantity', sortable: true, searchable: true, searchQuery: '' },
  { label: 'TOTAL', key: 'total', sortable: true, searchable: false, searchQuery: '' },
]);
</script>
