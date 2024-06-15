<script setup>
import ProductDetails from "../components/productPage/ProductDetails.vue";
import smallCarousel from "../components/productPage/Carousel.vue";
import Reviews from "../components/productPage/Reviews.vue";
import RelatedProducts from "../components/productPage/RelatedProducts.vue";
</script>

<template>
  <div id="productPage">
    <div class="flex mt-16 ml-10">
      <smallCarousel />

      <ProductDetails />
    </div>
    <Reviews />

    <RelatedProducts />
  </div>
</template>
