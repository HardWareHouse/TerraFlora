<script setup>
import { ref } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
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

// Define a reactive state for quantity
const quantity = ref(1);

// Method to handle incrementing the quantity
const incrementQuantity = () => {
  quantity.value += 1;
};

// Method to handle decrementing the quantity
const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};
</script>

<template>
  <div id="productPage">
    <div class="flex mt-16 ml-10">
      <Carousel>
        <Slide v-for="image in images" :key="image.alt">
          <img class="carousel__item" :src="image.src" :alt="image.alt" />
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <div class="flex flex-col w-screen text-center mx-auto">
        <h2 class="text-4xl font-thin mb-4">Monstera</h2>
        <div class="ratings flex mx-auto align-items-center mb-3">
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <span><i class="bi bi-star mr-1 text-yellow-400"></i> </span>
          <div class="pro-review">
            <span class="text-xs text-gray-600 ml-1">1 Reviews</span>
          </div>
        </div>
        <p class="w-100 mx-8 text-gray-700 text-center">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. Phasellus id nisi quis justo tempus mollis sed et
          dui. In hac habitasse platea dictumst.
        </p>
        <div class="quantity-cart-box flex items-center mx-auto mt-8">
          <h5 class="mr-2">Quantity:</h5>
          <div class="quantity mr-2">
            <div class="pro-qty">
              <span class="dec qtybtn" @click="decrementQuantity">-</span>
              <input type="text" :value="quantity" readonly />
              <span class="inc qtybtn" @click="incrementQuantity">+</span>
            </div>
          </div>
          <div class="action_link">
            <a
              class="btn btn-cart2 bg-red-700 px-4 py-3 rounded text-white text-center"
              href="#"
              >Add to cart</a
            >
          </div>
        </div>
        <div class="useful-links flex mx-auto mt-5">
          <div class="flex flex-col align-middle">
            <a
              href="#"
              data-bs-toggle="tooltip"
              data-bs-original-title="Compare"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <p class="text-sm text-center">Compare</p></a
            >
          </div>
          <div class="flex flex-col align-middle">
            <a
              href="#"
              data-bs-toggle="tooltip"
              data-bs-original-title="Wishlist"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <p class="text-sm text-center">Wishlist</p></a
            >
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
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

.quantity .pro-qty {
  width: 90px;
  height: 40px;
  border: 1px solid #ddd;
  padding: 0 15px;
  border-radius: 4px;
  float: left;
}

.quantity .pro-qty .qtybtn {
  width: 15px;
  display: block;
  float: left;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  color: #555;
}

.quantity .pro-qty input {
  width: 28px;
  float: left;
  border: none;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  background-color: transparent;
}
</style>
