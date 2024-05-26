<template>
    <div class="container mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(promotion, index) in promotions" :key="index" class="relative overflow-hidden ">
          <img :src="promotion.image" :alt="promotion.alt" class="w-full h-auto" />
          <div class="absolute inset-0 flex flex-col items-end justify-center text-white text-right pr-14">
            <h3 class="text-red-600 text-lg font-bold mb-2 text-[30px] font-['Yesteryear']">{{ promotion.title }}</h3>
            <h2 class="text-2xl font-bold text-black text-[30px]">{{ promotion.subtitle }}</h2>
            <a href="#" class="mt-4 text-black px-4 underline text-[14px] font-semibold leading-7">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  import slide1 from '../../assets/homePage/banner-1.jpg';
  import slide2 from '../../assets/homePage/banner-2.jpg';
  
  const promotions = ref([
    {
      image: slide1,
      title: 'For You',
      subtitle: 'Tulip Flower',
      alt: 'Tulip Flower'
    },
    {
      image: slide2,
      title: 'For You',
      subtitle: 'Flower & Box',
      alt: 'Flower & Box'
    }
  ]);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  