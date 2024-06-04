<template>
    <div class="container mx-auto py-8">
      <h2 class="text-3xl font-bold text-center mb-4">Top Seller</h2>
      <p class="text-center text-[14px] text-gray-600 mb-8">Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero</p>
      <Carousel :wrap-around="true" :items-to-show="1" :breakpoints="breakpoints" class="product-carousel">
        <Slide v-for="product in products" :key="product.id">
          <div class="relative">
            <div class="border overflow-hidden">
              <div class="relative">
                <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
                <div class="absolute top-2 left-2 flex flex-col space-y-1">
                  <div v-if="product.isNew" class="bg-red-600 text-white text-xs font-bold px-2 py-1">NEW</div>
                  <div v-if="product.discount" class="bg-black text-white text-xs font-bold px-2 py-1">{{ product.discount }}%</div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <h3 class="text-[16px] flex justify-start mb-2">{{ product.name }}</h3>
              <div class="flex items-center w-3/12 justify-between text-[17px]">
                <span class="font-bold text-black">${{ product.price }}</span>
                <span class="line-through text-gray-500">${{ product.oldPrice }}</span>
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
  import { ref } from 'vue'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  
  import slide1 from '../../assets/homePage/product-1.jpg'
  import slide2 from '../../assets/homePage/product-2.jpg'
  import slide3 from '../../assets/homePage/product-3.jpg'
  import slide4 from '../../assets/homePage/product-4.jpg'
  import slide5 from '../../assets/homePage/product-5.jpg'
  
  const products = ref([
    {
      id: 1,
      name: 'Hyacinth white stick',
      image: slide1,
      price: 30.00,
      oldPrice: 55.00,
      discount: 15,
      isNew: true
    },
    {
      id: 2,
      name: 'Flowers bouquet pink',
      image: slide2,
      price: 60.00,
      oldPrice: 70.00,
      discount: 10,
      isNew: true
    },
    {
      id: 3,
      name: 'Bouquet flowers pink',
      image: slide3,
      price: 60.00,
      oldPrice: 70.00,
      discount: 10,
      isNew: false
    },
    {
      id: 4,
      name: 'Orchid flower red stick',
      image: slide4,
      price: 80.00,
      oldPrice: 90.00,
      discount: 30,
      isNew: true
    },
    {
      id: 5,
      name: 'Orchid flower blue stick',
      image: slide5,
      price: 50.00,
      oldPrice: 90.00,
      discount: 30,
      isNew: true
    }
  ])
  
  const breakpoints = ref({
    700: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    1024: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  })
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
  