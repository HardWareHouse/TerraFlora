<script setup>
import { ref } from "vue";

// Accept images as a prop
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentSliderIndex = ref(0);

const nextSlide = () => {
  currentSliderIndex.value =
    (currentSliderIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
  currentSliderIndex.value =
    (currentSliderIndex.value - 1 + props.images.length) % props.images.length;
};
</script>
<template>
  <div class="slider flex">
    <div class="flex mx-auto relative w-1/2 h-[300px] m-auto">
      <div class="flex items-center justify-between w-full relative">
        <!-- Previous button -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-4xl cursor-pointer text-white bg-gray-600 rounded-full p-1 z-50 absolute left-1 opacity-25 hover:opacity-90"
          @click="prevSlide"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <!-- Images -->
        <div class="relative w-full h-full">
          <template v-for="(image, index) in props.images" :key="index">
            <transition name="fade">
              <img
                :src="image.src"
                :alt="image.alt"
                class="aspect-[16/9] absolute inset-0 object-contain"
                v-if="index === currentSliderIndex"
              />
            </transition>
          </template>
        </div>
        <!-- Next button -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-4xl cursor-pointer text-white bg-gray-600 rounded-full p-1 z-50 absolute right-1 opacity-25 hover:opacity-90"
          @click="nextSlide"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 1s,
    transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(0);
}
</style>
