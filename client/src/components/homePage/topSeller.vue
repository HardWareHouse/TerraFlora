<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-bold text-center mb-4">Meilleures ventes</h2>
    <p class="text-center text-[14px] text-gray-600 mb-8">Nos meilleurs ventes</p> 
    <Carousel :wrap-around="true" :items-to-show="1" :breakpoints="breakpoints" class="product-carousel">
      <Slide v-for="product in topProducts" :key="product.id">
        <div class="relative">
          <div class="border overflow-hidden">
            <div class="relative">
              <img :src="product.image || '/images/flower.webp'" :alt="product.nom" class="w-full h-64 object-cover">
              <div class="absolute top-2 left-2 flex flex-col space-y-1">
                <div v-if="product.isNew" class="bg-red-600 text-white text-xs font-bold px-2 py-1">NEW</div>
                <div v-if="product.pourcentagePromotion" class="bg-black text-white text-xs font-bold px-2 py-1">{{ product.pourcentagePromotion }}%</div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <h3 class="text-[16px] flex justify-start mb-2">{{ product.nom }}</h3>
            <div class="flex items-center w-3/12 justify-between text-[17px]">
              <span class="font-bold text-black">${{ product.prix }}</span>
              <span class="line-through text-gray-500" v-if="product.oldPrice">${{ product.oldPrice }}</span>
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

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

const topProducts = computed(() => products.value.slice(0, 10));

const breakpoints = ref({
  700: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.product-carousel .carousel__slides {
  display: flex;
  gap: 16px;
}
</style>
