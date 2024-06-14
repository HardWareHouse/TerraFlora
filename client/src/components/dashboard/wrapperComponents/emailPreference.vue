<template>
  <div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-2xl font-medium pb-2 border-b border-gray-200">Dashboard</h3>
      <p class="text-gray-700 mb-6 mt-4 text-[14px]">
        Les e-mails vous sont envoyés à l'adresse <span class="font-semibold text-red-600">votre-email@example.com</span>.<br/>
        Pour ne plus recevoir de notifications par e-mail, cliquez sur le lien "NON" en face de chaque alerte.
      </p>
      <div class="space-y-4">
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Nouveau produit d'une catégorie</span>
          <button @click="newProductCategory = !newProductCategory" :class="['px-4 py-2 rounded', newProductCategory ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ newProductCategory ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Restock d'un produit</span>
          <button @click="restockProduct = !restockProduct" :class="['px-4 py-2 rounded', restockProduct ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ restockProduct ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Changements de prix</span>
          <button @click="priceChange = !priceChange" :class="['px-4 py-2 rounded', priceChange ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ priceChange ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Inscription à la newsletter</span>
          <button @click="newsletterSignup = !newsletterSignup" :class="['px-4 py-2 rounded', newsletterSignup ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ newsletterSignup ? 'Oui' : 'Non' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newProductCategory = ref(false);
const restockProduct = ref(false);
const priceChange = ref(false);
const newsletterSignup = ref(false);
</script>

<style scoped>
</style>
