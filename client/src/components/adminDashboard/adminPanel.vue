<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Section CRUD des ressources -->
    <ResourcesCrud />
    <Dashboard />
    
    <!-- Section du tableau de bord avec widgets -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Widget</h2>
        <WidgetContainer />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './panelComponents/dashboard.vue';
import ResourcesCrud from './panelComponents/resourcesCrud.vue';
import WidgetContainer from './widgetContainer.vue';

export default {
  name: 'AdminPanel',
  components: {
    Dashboard,
    ResourcesCrud,
    WidgetContainer,
  },
};
</script>

<style scoped>
</style>
