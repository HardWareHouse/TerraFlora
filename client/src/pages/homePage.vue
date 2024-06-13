<template>
  <carousel />
  <banner-section />
  <SearchOverlay v-if="showSearch" @close="showSearch = false" />
  <top-seller />
  <banner-section-bottom />
  <new-product/>
  <br>
  <br>
</template>

<script setup>
import carousel from "../components/homePage/carousel.vue";
import bannerSection from "../components/homePage/bannerSection.vue";
import topSeller from "../components/homePage/topSeller.vue";
import bannerSectionBottom from "../components/homePage/bannerSectionBottom.vue";
import newProduct from "../components/homePage/newProductShowcase.vue";
import SearchOverlay from '../components/UI/searchBar.vue';
</script>

<style scoped>

</style>
