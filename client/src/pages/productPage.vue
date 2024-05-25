<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import InputNumber from "primevue/inputnumber";

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
/*--------- quantity change js start ---------*/
// Function to handle quantity changes
function handleQuantityChange(event) {
  const button = event.target;
  const input = button.parentElement.querySelector("input");
  const oldValue = parseFloat(input.value);

  let newVal;
  if (button.classList.contains("inc")) {
    newVal = oldValue + 1;
  } else {
    // Don't allow decrementing below zero
    newVal = oldValue > 0 ? oldValue - 1 : 0;
  }

  input.value = newVal;
}

// Function to initialize quantity buttons
function initializeQuantityButtons() {
  const qtyContainers = document.querySelectorAll(".pro-qty");

  qtyContainers.forEach((container) => {
    // Create decrement button
    const decButton = document.createElement("span");
    decButton.classList.add("dec", "qtybtn");
    decButton.textContent = "-";

    // Create increment button
    const incButton = document.createElement("span");
    incButton.classList.add("inc", "qtybtn");
    incButton.textContent = "+";

    // Prepend decrement button
    container.insertBefore(decButton, container.firstChild);
    // Append increment button
    container.appendChild(incButton);

    // Add event listeners to the buttons
    decButton.addEventListener("click", handleQuantityChange);
    incButton.addEventListener("click", handleQuantityChange);
  });
}

// Initialize the quantity buttons on document load
document.addEventListener("DOMContentLoaded", initializeQuantityButtons);

/*--------- quantity change js end ---------*/

// import carousel from "../components/homePage/carousel.vue";
</script>

<template>
  <div id="productPage">
    <div class="flex mt-16 ml-10">
      <Carousel>
        <Slide v-for="image in images" :key="alt">
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
            <div class="pro-qty"><input type="text" value="1" /></div>
          </div>
          <div class="action_link">
            <a
              class="btn btn-cart2 bg-red-700 px-4 py-3 rounded text-white text-center"
              href="#"
              >Add to cart</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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

/* .carousel__slide {
  padding: 10px;
} */

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */
</style>
