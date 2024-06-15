<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
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
export default defineComponent({
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      images,
    };
  },
});
</script>
<!-- Related products start -->
<template>
  <h2 class="text-3xl font-thin mb-4 text-center">Related Products</h2>
  <Carousel :items-to-show="2.5" :wrap-around="true" class="mx-auto">
    <Slide v-for="image in images" :key="image.alt" class="m-5">
      <div class="flex flex-col">
        <h5>{{ image.alt }}</h5>
        <img class="carousel__item" :src="image.src" :alt="image.alt" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
<!-- Related products end -->

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
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
