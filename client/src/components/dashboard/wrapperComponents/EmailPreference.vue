<template>
  <div>
    <div id="emailPreference" class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-2xl font-medium pb-2 border-b border-gray-200">Mes préferences</h3>
      <p class="text-gray-700 mb-6 mt-4 text-[14px]">
        Les e-mails vous sont envoyés à l'adresse <span class="font-semibold text-red-600">{{ email }}</span>.<br/>
        Pour ne plus recevoir de notifications par e-mail, cliquez sur le lien "NON" en face de chaque alerte.
      </p>
      <div class="space-y-4">
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Nouveau produit d'une catégorie</span>
          <button @click="togglePreference('wantsMailNewProduct')" :class="['px-4 py-2 rounded', wantsMailNewProduct ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ wantsMailNewProduct ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Restock d'un produit</span>
          <button @click="togglePreference('wantsMailRestockProduct')" :class="['px-4 py-2 rounded', wantsMailRestockProduct ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ wantsMailRestockProduct ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Changements de prix</span>
          <button @click="togglePreference('wantsMailChangingPrice')" :class="['px-4 py-2 rounded', wantsMailChangingPrice ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ wantsMailChangingPrice ? 'Oui' : 'Non' }}
          </button>
        </div>
        <div class="flex justify-between items-center p-4 border-b">
          <span class="text-[16px] text-gray-900">Inscription à la newsletter</span>
          <button @click="togglePreference('wantsMailNewsletter')" :class="['px-4 py-2 rounded', wantsMailNewsletter ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700']">
            {{ wantsMailNewsletter ? 'Oui' : 'Non' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../../pinia/auth.js'; 

const authStore = useAuthStore();

const userId = ref(authStore.id);
const email = ref(authStore.email);
const tokenMailPreference = ref(authStore.tokenMailPreference);

const wantsMailNewProduct = ref(authStore.wantsMailNewProduct);
const wantsMailRestockProduct = ref(authStore.wantsMailRestockProduct);
const wantsMailChangingPrice = ref(authStore.wantsMailChangingPrice);
const wantsMailNewsletter = ref(authStore.wantsMailNewsletter);

watch(() => authStore.wantsMailNewProduct, (newValue) => {
  wantsMailNewProduct.value = newValue;
});
watch(() => authStore.wantsMailRestockProduct, (newValue) => {
  wantsMailRestockProduct.value = newValue;
});
watch(() => authStore.wantsMailChangingPrice, (newValue) => {
  wantsMailChangingPrice.value = newValue;
});
watch(() => authStore.wantsMailNewsletter, (newValue) => {
  wantsMailNewsletter.value = newValue;
});

const togglePreference = (preference) => {
  switch (preference) {
    case 'wantsMailNewProduct':
      wantsMailNewProduct.value = !wantsMailNewProduct.value;
      updatePreference('wantsMailNewProduct', wantsMailNewProduct.value);
      break;
    case 'wantsMailRestockProduct':
      wantsMailRestockProduct.value = !wantsMailRestockProduct.value;
      updatePreference('wantsMailRestockProduct', wantsMailRestockProduct.value);
      break;
    case 'wantsMailChangingPrice':
      wantsMailChangingPrice.value = !wantsMailChangingPrice.value;
      updatePreference('wantsMailChangingPrice', wantsMailChangingPrice.value);
      break;
    case 'wantsMailNewsletter':
      wantsMailNewsletter.value = !wantsMailNewsletter.value;
      updatePreference('wantsMailNewsletter', wantsMailNewsletter.value);
      break;
  }
};

const updatePreference = async (preference, value) => {
  try {
    let url = '';
    switch (preference) {
      case 'wantsMailNewProduct':
        url = 'http://localhost:8000/emailPreferences/updateWantsMailNewProduct';
        break;
      case 'wantsMailRestockProduct':
        url = 'http://localhost:8000/emailPreferences/updateWantsMailRestockProduct';
        break;
      case 'wantsMailChangingPrice':
        url = 'http://localhost:8000/emailPreferences/updateWantsMailChangingPrice';
        break;
      case 'wantsMailNewsletter':
        url = 'http://localhost:8000/emailPreferences/updateWantsMailNewsletter';
        break;
    }

    const response = await axios.put(url, {
      [preference]: value
    }, {
      headers: {
        'Authorization': `${tokenMailPreference.value}`
      }
    });
    
  } catch (error) {
    console.error('Error updating preference:', error);
  }
};
</script>

<style scoped>
</style>
