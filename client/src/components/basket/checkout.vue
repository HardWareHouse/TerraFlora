<template>
  <div class="container flex justify-between w-full my-10">
    <div class="w-2/5">
      <div class="bg-gray-100 p-4 rounded shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Cart Totals</h2>
        <div class="flex justify-between items-center py-2 border-b">
          <span>Sub Total</span>
          <span>${{ subTotal }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b">
          <span>Shipping</span>
          <span>${{ shipping }}</span>
        </div>
        <div
          class="flex justify-between items-center py-2 border-b font-semibold text-lg"
        >
          <span>Total</span>
          <span class="text-red-600">${{ total }}</span>
        </div>
        <RouterLink
          to="/checkout"
          class="w-full bg-red-600 text-white py-2 mt-4 rounded"
          >Proceed To Checkout</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../../pinia/cart.js";

const cartStore = useCartStore();

const subTotal = computed(() => {
  return cartStore.cartTotal || 0;
});
const shipping = ref(10);

const total = computed(() => {
  return (subTotal.value + shipping.value).toFixed(2);
});

const proceedToCheckout = () => {
  console.log("Proceeding to checkout...");
};
</script>

<style scoped></style>
