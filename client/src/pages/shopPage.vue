<template>
    <div class="shop-page flex">
        <Filters />
        <ProductList />
    </div>
</template>

<script setup>
import Filters from '../components/indexProduit/Filters.vue';
import ProductList from '../components/indexProduit/ProductList.vue';
</script>

<style scoped>
.shop-page {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
}
</style>