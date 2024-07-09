<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { useCartStore } from "../../pinia/cart.js";

export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      loading: false,
      publishableKey: `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`,
      lineItems: [],
      successURL: `${window.location.origin}/success`,
      cancelURL: `${window.location.origin}/cancel`,
    };
  },
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.items || [];
    },
  },
  watch: {
    cartItems: {
      handler(newItems) {
        if (Array.isArray(newItems)) {
          this.updateLineItems(newItems);
        } else {
          console.error("cartItems is not an array:", newItems);
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateLineItems(cartItems) {
      this.lineItems = cartItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      }));
    },
    submit() {
      if (this.lineItems.length === 0) {
        console.error("lineItems is empty, cannot proceed to checkout");
        return;
      }
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
