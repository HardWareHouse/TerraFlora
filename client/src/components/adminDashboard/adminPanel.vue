<template>
  <div class="container mx-auto px-4 py-8">
    <Dashboard />
    
    <div class="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Widget</h2>
        <WidgetContainer />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './panelComponents/dashboard.vue';
import WidgetContainer from './panelComponents/widgetContainer.vue';

export default {
  name: 'AdminPanel',
  components: {
    Dashboard,
    WidgetContainer,
  },
};
</script>

<style scoped>
</style>
