<!-- Small Carousel start -->
<template>
  <Carousel>
    <Slide v-for="image in images" :key="image.alt">
      <img class="carousel__item" :src="image.src" :alt="image.alt" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
<!-- Small carousel end -->
<script setup>
import { ref, onMounted } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

onMounted(() => {
  const tabTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tab"]')
  );
  tabTriggerList.forEach((tabTriggerEl) => {
    tabTriggerEl.addEventListener("click", (event) => {
      event.preventDefault();
      new bootstrap.Tab(tabTriggerEl).show();
    });
  });
});
const images = [
  {
    src: "https://webshop.plnts.com/media/catalog/product/cache/aa5d334f459227518b6c3cf7ea9d29ed/p/l/pl.xxl.002_-_monstera_pertusum-vierkant.jpg",
    alt: "Image 1",
  },
  {
    src: "https://fr-fr.bakker.com/cdn/shop/files/VIS_018129_2_BK_1705411406384.jpg?v=1705411425",
    alt: "Image 2",
  },
  {
    src: "https://www.picturethisai.com/wiki-image/1080/347088479137988608.jpeg",
    alt: "Image 3",
  },
];
</script>
<style scoped>
.carousel {
  width: 66%;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
