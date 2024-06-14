<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h2>
        
        <p class="text-gray-700">Contenu du widget...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  