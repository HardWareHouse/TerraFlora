<template>
  <div>
    <h1>Payment Successful</h1>
    <p>Thank you for your purchase!</p>
  </div>
</template>

<script>
import { useCartStore } from "../../pinia/cart.js";

export default {
  name: "SuccessPage",
  setup() {
    const cartStore = useCartStore();

    cartStore.clearCart();

    return {};
  },
};
</script>
