<template>
  <div class="flex flex-col text-center mx-auto">
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
    <p class="w-5/6 mx-auto text-gray-700 text-center">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. Phasellus id nisi quis justo tempus mollis sed et dui. In hac
      habitasse platea dictumst.
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
    <div class="useful-links flex mx-auto mt-5 p-5">
      <div class="flex items-center space-x-2 mr-4">
        <a
          href="#"
          data-bs-toggle="tooltip"
          data-bs-original-title="Compare"
          class="flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <p class="text-sm">Compare</p>
        </a>
      </div>
      <div class="flex items-center space-x-2">
        <a
          href="#"
          data-bs-toggle="tooltip"
          data-bs-original-title="Wishlist"
          class="flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <p class="text-sm">Wishlist</p>
        </a>
      </div>
    </div>
    <div class="like-icon">
      <a class="facebook" href="#"><i class="bi bi-facebook"></i>like</a>
      <a class="twitter" href="#"><i class="bi bi-twitter-x"></i>tweet</a>
      <a class="pinterest" href="#"><i class="bi bi-pinterest"></i>save</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
<style scoped>
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

.like-icon {
  padding-top: 20px;
  border-top: 1px solid #ebebeb;
}

.like-icon a {
  color: #fff;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  line-height: 22px;
  padding: 0 8px;
  margin-right: 6px;
  border-radius: 3px;
  text-transform: capitalize;
}

@media only screen and (max-width: 479.98px) {
  .like-icon a {
    margin-right: 0;
  }
}

.like-icon a i {
  padding-right: 5px;
}

.like-icon a.facebook {
  background-color: #3b5999;
}

.like-icon a.twitter {
  background-color: #1da1f2;
}

.like-icon a.pinterest {
  background-color: #cb2028;
}

.like-icon a.google {
  background-color: #fe6d4c;
}

.like-icon a:hover.facebook {
  background-color: #2d4474;
}

.like-icon a:hover.twitter {
  background-color: #0c85d0;
}

.like-icon a:hover.pinterest {
  background-color: #9f191f;
}

.like-icon a:hover.google {
  background-color: #fe4419;
}

.share-icon {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.share-icon h5 {
  color: #111;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  margin-right: 10px;
  text-transform: uppercase;
}

.share-icon a {
  color: #555;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  padding: 0 8px;
  margin-right: 5px;
}

@media only screen and (max-width: 479.98px) {
  .share-icon a {
    padding: 0 5px;
  }
}

.share-icon a:hover {
  color: #cc2121;
}
</style>
