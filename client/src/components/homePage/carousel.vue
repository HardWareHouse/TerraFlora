<template>
    <Carousel  :wrap-around="true">
        <Slide v-for="(slide, index) in slides" :key="index">
            <div class="w-full h-full">
                <img class="w-full h-[510px] object-cover" :src="slide.src" :alt="slide.alt" />
                <div class="absolute top-36 left-20 text-left text-white">
                    <h2 class="text-[#CC2121] font-bold text-xl text-[30px] font-['Yesteryear']">{{ slide.title }}</h2>
                    <h1 class="font-bold text-4xl text-black">{{ slide.mainText }}</h1>
                    <p class="mt-10">
                        <button class="bg-[#CC2121] text-white font-bold py-2 px-4">
                            {{ slide.buttonText }}
                        </button>
                    </p>
                </div>
            </div>
        </Slide>
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import slide1 from '../../assets/homePage/home1-slide1.jpg';
import slide2 from '../../assets/homePage/home1-slide2.jpg';

const slides = ref([
    {
        src: slide1,
        alt: 'Slide 1',
        title: 'Valentine Gift',
        mainText: 'Fresh Your Mind & Feeling Love',
        buttonText: 'Shop Now'
    },
    {
        src: slide2,
        alt: 'Slide 2',
        title: 'Valentine Gift',
        mainText: 'Fresh Your Mind & Feeling Love',
        buttonText: 'Shop Now'
    }
]);
</script>