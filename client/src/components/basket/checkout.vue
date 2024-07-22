<template>
  <div class="container flex justify-between w-full my-10">
    <div class="w-full lg:w-2/5">
      <div class="bg-gray-100 p-4 rounded shadow-md flex flex-col">
        <h2 class="text-2xl font-semibold mb-4">Total du Panier</h2>
        <div class="flex justify-between items-center py-2 border-b">
          <span>Sous-total</span>
          <span>{{ subTotal }}€</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b">
          <span>TVA (10%)</span>
          <span>{{ vat }}€</span>
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
        <button
          @click="createCheckoutSession"
          class="w-3/4 mx-auto mt-4 bg-red-500 text-white py-2 rounded-md"
          id="checkout-button"
        >
          Payer
        </button>
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

const shipping = ref(10.99);

const vat = computed(() => {
  return (subTotal.value * 0.10).toFixed(2);
});

const total = computed(() => {
  return (parseFloat(subTotal.value) + 10 + parseFloat(vat.value)).toFixed(2);
});

const createCheckoutSession = async () => {
  try {
    const cartItems = cartStore.items || [];

    const lineItems = cartItems.map((item) => ({
      price: item.priceId,
      quantity: item.Panier_Produits.quantity,
    }));

    const response = await axios.post("http://localhost:8000/stripe/create-checkout-session", {
      lineItems,
    });

    const sessionId = response.data.id;
    const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};
</script>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default {
  methods: {
    async createCheckoutSession() {
      try {
        const cartStore = useCartStore();
        const cartItems = cartStore.items || [];

        const lineItems = cartItems.map((item) => ({
          price: item.priceId,
          quantity: item.Panier_Produits.quantity,
        }));
        const response = await axios.post(
          "http://localhost:8000/stripe/create-checkout-session",
          { lineItems }
        );

        const sessionId = response.data.id;
        const stripe = await loadStripe(
          `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
        );

        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    },
  },
};
</script>
