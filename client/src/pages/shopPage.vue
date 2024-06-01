<template>
    <Breadcrumbs />
    <div class="shop-page max-w-7xl mx-auto py-8">
        <div class="flex">
            <Filters />
            <ProductList />
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '../components/shopPage/Breadcrumbs.vue';
import Filters from '../components/shopPage/Filters.vue';
import ProductList from '../components/shopPage/ProductList.vue';
</script>

<style scoped>
.shop-page {
    max-width: 1200px;
    margin: 0 auto;
}
</style>