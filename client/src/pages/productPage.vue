<script setup>
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
import Slider from "../components/UI/carousel.vue";
</script>

<template>
  <div id="productPage">
    <h1>Détails du produit</h1>
    <div class="flex">
      <Slider :images="images" />
      <h2>Monstera</h2>
    </div>
  </div>
</template>
