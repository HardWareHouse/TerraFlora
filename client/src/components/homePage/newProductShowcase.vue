<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold text-center mb-4">Nouveaux produits</h2>
    <p class="text-center text-gray-600 mb-8">Accèdez à notre offre de produits de qualité</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="product in limitedProducts" :key="product.id" class="relative">
        <div class="border rounded-lg overflow-hidden">
          <div class="relative">
            <img :src="product.image || '/images/flower.webp'" :alt="product.nom" class="w-full h-64 object-cover">
            <div class="absolute top-2 left-2 flex flex-col space-y-1">
              <div v-if="product.isNew" class="bg-red-600 text-white text-xs font-bold px-2 py-1">NEW</div>
              <div v-if="product.pourcentagePromotion" class="bg-black text-white text-xs font-bold px-2 py-1">{{ product.pourcentagePromotion }}%</div>
            </div>
          </div>
        </div>
        <div class="p-4 mt-2">
          <h3 class="text-[16px] flex justify-start mb-2">{{ product.nom }}</h3>
          <div class="flex items-center w-3/12 justify-between text-[17px]">
            <span class="font-bold text-black">${{ product.prix }}</span>
            <span class="line-through text-gray-500" v-if="product.oldPrice">${{ product.oldPrice }}</span>
          </div>
        </div>
      </div>
    </div>
    <RouterLink to="/shop">
      <div class="text-center mt-8 flex justify-center">
        <p class="bg-red-600 text-white px-4 py-2 w-1/3 ">Voir plus d'articles</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/product');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const limitedProducts = computed(() => products.value.slice(0, 10));
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
