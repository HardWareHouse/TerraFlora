<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">Paiement Réussi</h1>
      <p class="mb-4">Merci pour votre confiance chez TerraFlora !</p>
      <h2 class="text-xl font-semibold mb-2">Résumé de la commande :</h2>
      <ul class="list-disc list-inside mb-4">
        <li v-for="item in cartItems" :key="item.id">
          {{ item.quantity }} x {{ item.nom }} - {{ item.prix * item.quantity }} €
        </li>
      </ul>
      <p class="font-semibold">Total : {{ cartTotal }} €</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../../pinia/cart.js';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "SuccessPage",
  setup() {
    const cartStore = useCartStore();
    const cartItems = ref([...cartStore.items]);
    const cartTotal = ref(cartStore.cartTotal);

    onMounted(async () => {
      await axios.post('http://localhost:8000/product/subtract-stock', {
        items: cartStore.items.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      });
      cartStore.clearCart();
    });

    return { cartItems, cartTotal };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
</style>
