<template>
    <div class="container mx-auto px-4 py-8">
      
      <!-- CRUD sur l’ensemble des ressources -->
      <ResourcesCrud />
  
      <!-- Dashboard avec datavisualisation -->
      <Dashboard />
    </div>
  </template>
  
  <script>
  import ResourcesCrud from './panelComponents/resourcesCrud.vue';
  import Dashboard from './panelComponents/dashboard.vue';
  
  export default {
    name: 'AdminPanel',
    components: {
      ResourcesCrud,
      Dashboard,
    },
  };
  </script>
  
  <style scoped>
  /* styles spécifiques au panel d'administration */
  </style>
  