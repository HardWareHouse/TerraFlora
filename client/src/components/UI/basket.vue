<template>
  <div class="fixed inset-0 z-50 flex items-center justify-end bg-gray-800 bg-opacity-50">
    <div class="relative w-full h-full max-w-72 p-6 bg-white shadow-lg lg:max-w-sm">
      <div class="absolute top-0 right-full p-2 bg-red-700">
        <i class="bi bi-x-lg cursor-pointer p-1" style="font-size: 1.5rem; color: white;" @click.prevent="$emit('close')"></i>
      </div>
      <ul class="h-3/5 overflow-x-auto overflow-scroll">
        <li v-for="item in cartItems" :key="item.id" class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <img :src="getImageUrl(item.Images[0]?.imageUrl)" alt="item.nom" class="w-16 h-16 mr-4 rounded" v-if="item.Images && item.Images.length > 0">
            <img src="/images/flower.webp" alt="item.nom" class="w-16 h-16 mr-4 rounded" v-else>
            <div>
              <p class="text-sm font-semibold">{{ item.nom }}</p>
              <p class="text-xs text-gray-600">{{ item.Panier_Produits.quantity }} × {{ item.prix }}€</p>
            </div>
          </div>
          <i class="bi bi-x-lg cursor-pointer" @click="removeFromCart(item.id)"></i>
        </li>
      </ul>
      <div class="pt-4 mt-4 border-t">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">Sous-Total</span>
          <span>{{ subTotal }}€</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">Livraison</span>
          <span>10.99€</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">TVA (10%)</span>
          <span>{{ vat }}€</span>
        </div>
        <div class="flex items-center justify-between pt-2 border-t">
          <span class="font-bold">Total</span>
          <span>{{ total }}€</span>
        </div>
        
        <!-- Ajoutez un bouton "Réserver" -->
        <button @click="reserveCart" class="w-full px-4 py-2 mt-2 font-semibold text-white bg-red-700 rounded-md hover:bg-gray-800">Réserver</button>

        <div class="mt-4">
          <button @click="viewCart" class="w-full px-4 py-2 mb-2 font-semibold text-white bg-red-700 rounded-md hover:bg-gray-800">Voir mon panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../pinia/cart.js';
import instance from '../../axios.js';
import axios from 'axios';

const emit = defineEmits(['close']);

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);

const removeFromCart = (id) => {
  cartStore.removeItem(id);
};

const subTotal = computed(() => {
  return cartStore.cartTotal || 0;
});
const vat = computed(() => {
  return (subTotal.value * 0.10).toFixed(2);
});
const total = computed(() => {
  return (parseFloat(subTotal.value) + 10 + parseFloat(vat.value)).toFixed(2);
});

const viewCart = () => {
  router.push('/basket');
  emit('close');
};

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/flower.webp';
  }
  return `http://localhost:8000/uploads/${imagePath.split('/').pop()}`;
};

// Ajoutez la méthode reserveCart
const reserveCart = async () => {
  try {
    const response = await instance.post('cart/reserve', {
      userId: cartStore.userId
    });
    alert('Panier réservé avec succès!');
    emit('close');
  } catch (error) {
    console.error('Error reserving cart:', error);
    alert('Erreur lors de la réservation du panier.');
  }
};
</script>

<style scoped>
</style>
