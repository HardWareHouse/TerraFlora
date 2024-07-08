<template>
  <div class="container flex justify-between w-full my-10">
    <div class="w-2/5">
      <div class="bg-gray-100 p-4 rounded shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Total du Panier</h2>
        <div class="flex justify-between items-center py-2 border-b">
          <span>Sous-total</span>
          <span>{{ subTotal }}€</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b">
          <span>Livraison</span>
          <span>{{ shipping }}€</span>
        </div>
        <div
          class="flex justify-between items-center py-2 border-b font-semibold text-lg"
        >
          <span>Total</span>
          <span class="text-red-600">{{ total }}€</span>
        </div>
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
          <button
            @click="submit"
            class="w-full bg-red-600 text-white py-2 mt-4 rounded"
          >
            Passer à la caisse
          </button>
        </div>
        <!-- <RouterLink
          to="/stripe"
          class="w-full bg-red-600 text-white py-2 mt-4 rounded"
          >Passer à la caisse
        </RouterLink> -->
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
<style scoped></style>
