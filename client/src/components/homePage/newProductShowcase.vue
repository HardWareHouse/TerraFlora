<template>
    <div class="container mx-auto py-8">
      <h2 class="text-3xl font-bold text-center mb-4">New Products</h2>
      <p class="text-center text-gray-600 mb-8">Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in products" :key="product.id" class="relative">
          <div class="border rounded-lg overflow-hidden">
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
              <div class="absolute top-2 left-2 flex flex-col space-y-1">
                <div v-if="product.isNew" class="bg-red-600 text-white text-xs font-bold px-2 py-1">NEW</div>
                <div v-if="product.discount" class="bg-black text-white text-xs font-bold px-2 py-1">{{ product.discount }}%</div>
              </div>
            </div>
          </div>
          <div class="p-4 mt-2">
            <h3 class="text-[16px] flex justify-start mb-2">{{ product.name }}</h3>
              <div class="flex items-center w-3/12 justify-between text-[17px]">
                <span class="font-bold text-black">${{ product.price }}</span>
                <span class="line-through text-gray-500">${{ product.oldPrice }}</span>
              </div>
            </div>
        </div>
      </div>
        <RouterLink to="/shop">
            <div class="text-center mt-8 flex justify-center">
                <p class="bg-red-600 text-white px-4 py-2 w-1/3 ">View More Products</p>
            </div>
        </RouterLink>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  import slide1 from '../../assets/homePage/product-9.jpg';
  import slide2 from '../../assets/homePage/product-10.jpg';
  import slide3 from '../../assets/homePage/product-11.jpg';
  import slide4 from '../../assets/homePage/product-12.jpg';
  import slide5 from '../../assets/homePage/product-5.jpg';
  import slide6 from '../../assets/homePage/product-6.jpg';
  import slide7 from '../../assets/homePage/product-7.jpg';
  import slide8 from '../../assets/homePage/product-8.jpg';
  
  const products = ref([
    {
      id: 1,
      name: 'Flowers bouquet pink',
      image: slide1,
      price: 60.00,
      oldPrice: 70.00,
      discount: 10,
      isNew: true
    },
    {
      id: 2,
      name: 'Jasmine flowers white',
      image: slide2,
      price: 60.00,
      oldPrice: 70.00,
      discount: 10,
      isNew: true
    },
    {
      id: 3,
      name: 'Blossom bouquet flower',
      image: slide3,
      price: 50.00,
      oldPrice: 80.00,
      discount: 10,
      isNew: true
    },
    {
      id: 4,
      name: 'Hyacinth white stick',
      image: slide4,
      price: 30.00,
      oldPrice: 55.00,
      discount: 15,
      isNew: true
    },
    {
      id: 5,
      name: 'Orchid flower red stick',
      image: slide5,
      price: 80.00,
      oldPrice: 90.00,
      discount: 30,
      isNew: true
    },
    {
      id: 6,
      name: 'Flowers daisy pink stick',
      image: slide6,
      price: 40.00,
      oldPrice: 50.00,
      discount: 12,
      isNew: true
    },
    {
      id: 7,
      name: 'Rose bouquet white',
      image: slide7,
      price: 55.00,
      oldPrice: 80.00,
      discount: 10,
      isNew: true
    },
    {
      id: 8,
      name: 'Bouquet flowers pink',
      image: slide8,
      price: 60.00,
      oldPrice: 70.00,
      discount: 10,
      isNew: false
    }
  ]);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  