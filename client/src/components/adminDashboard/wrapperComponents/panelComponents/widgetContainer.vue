<template>
  <div>
    <div class="mb-4">
      <!-- <label for="widgetSelect" class="block text-sm font-medium text-gray-700">Sélectionner un widget à ajouter</label> -->
      <select v-model="selectedWidget" id="widgetSelect" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option disabled value="">Choisir un widget</option>
        <option v-for="widget in availableWidgets" :key="widget.name" :value="widget">{{ widget.name }}</option>
      </select>
    </div>
    <button @click="addNewWidget" :disabled="!selectedWidget" class="bg-blue-500 text-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 rounded-md mb-4 mr-2">
      Ajouter un Widget
    </button>

    <div v-for="(widget, index) in widgets" :key="index" class="mb-4">
      <component :is="widget.component" @remove="removeWidget(index)" />
      <button @click="removeWidget(index)" class="bg-red-500 text-white rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-4 py-2 mt-2">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
import SalesWidget from './widgetComponents/salesWidget.vue';
import TopProductsWidget from './widgetComponents/topProductsWidget.vue';
import LatestOrdersWidget from './widgetComponents/latestOrdersWidget.vue';

export default {
  components: {
    SalesWidget,
    TopProductsWidget,
    LatestOrdersWidget,
  },
  data() {
    return {
      selectedWidget: '',
      widgets: [],
      availableWidgets: [
        { name: 'Ventes Mensuelles', component: 'SalesWidget' },
        { name: 'Produits les plus vendus', component: 'TopProductsWidget' },
        { name: 'Dernières Commandes', component: 'LatestOrdersWidget' },
      ],
    };
  },
  methods: {
    addNewWidget() {
      if (this.selectedWidget && !this.widgets.includes(this.selectedWidget)) {
        this.widgets.push(this.selectedWidget);
        this.selectedWidget = '';
      }
    },
    removeWidget(index) {
      this.widgets.splice(index, 1);
    },
  },
  computed: {
    availableWidgetOptions() {
      return this.availableWidgets.filter(widget => !this.widgets.includes(widget));
    },
  },
};
</script>

<style scoped>
</style>
