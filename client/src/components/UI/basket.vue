<template>
  <div class="fixed inset-0 z-50 flex items-center justify-end bg-gray-800 bg-opacity-50">
    <div class="relative w-full h-full max-w-sm p-6 bg-white shadow-lg">
      <div class="absolute top-0 right-full p-2 bg-red-700">
        <i class="bi bi-x-lg cursor-pointer p-1" style="font-size: 1.5rem; color: white;" @click.prevent="$emit('close')"></i>
      </div>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <img :src="item.image" alt="item.name" class="w-16 h-16 mr-4 rounded">
            <div>
              <p class="text-sm font-semibold">{{ item.name }}</p>
              <p class="text-xs text-gray-600">{{ item.quantity }} × ${{ item.price }}</p>
            </div>
          </div>
          <i class="bi bi-x-lg cursor-pointer" @click="removeFromCart(item.id)"></i>
        </li>
      </ul>
      <div class="pt-4 mt-4 border-t">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">Sub-Total</span>
          <span>${{ subTotal }}</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">Eco Tax</span>
          <span>$10.00</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">VAT (20%)</span>
          <span>${{ vat }}</span>
        </div>
        <div class="flex items-center justify-between pt-2 border-t">
          <span class="font-bold">Total</span>
          <span>${{ total }}</span>
        </div>
        <div class="mt-4">
          <button @click="viewCart" class="w-full px-4 py-2 mb-2 font-semibold text-white bg-red-700 rounded-md hover:bg-gray-800">VIEW BASKET</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const emit = defineEmits(['close'])

import slide1 from '../../assets/homePage/product-1.jpg'
import slide2 from '../../assets/homePage/product-2.jpg'
import router from '../../router';

const cartItems = ref([
  { id: 1, name: 'Flowers bouquet pink', price: 100, quantity: 1, image: slide1 },
  { id: 2, name: 'Jasmine flowers white', price: 80, quantity: 1, image: slide2 }
])

const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const subTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

const vat = computed(() => (subTotal.value * 0.20).toFixed(2))
const total = computed(() => (subTotal.value + 10 + parseFloat(vat.value)).toFixed(2))

const viewCart = () => {
  router.push('/basket');
  emit('close')
}
</script>

<style scoped>
</style>
