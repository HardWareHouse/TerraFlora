<template>
  <carousel />
  <banner-section data-aos="flip-up" />
  <SearchOverlay data-aos="fade-left" v-if="showSearch" @close="showSearch = false" />
  <top-seller data-aos="fade-right"/>
  <banner-section-bottom data-aos="flip-down" />
  <new-product data-aos="fade-left"/>
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
