<template>
    <div>
      <!-- Bouton pour ajouter un nouveau widget -->
      <button @click="addNewWidget" class="bg-blue-500 text-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 rounded-md mb-4 mr-2">
        Ajouter un Widget
      </button>
      <button @click="removeWidget" class="bg-red-500 text-white rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-4 py-2 mb-4">
        Supprimer un Widget
      </button>
  
      <!-- Liste des widgets -->
      <div v-for="(widget, index) in widgets" :key="index" class="mb-4">
        <component :is="widget.component" @remove="removeWidget(index)" />
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
        widgets: [], // Tableau des widgets affichés
        availableWidgets: [ // Liste des widgets disponibles
          { name: 'Ventes Mensuelles', component: 'SalesWidget' },
          { name: 'Produits les plus vendus', component: 'TopProductsWidget' },
          { name: 'Dernières Commandes', component: 'LatestOrdersWidget' },
        ],
      };
    },
    methods: {
      addNewWidget() {
        // Sélectionnez un widget au hasard à ajouter (ou mettez en œuvre la logique de sélection souhaitée)
        const randomIndex = Math.floor(Math.random() * this.availableWidgets.length);
        const selectedWidget = this.availableWidgets[randomIndex];
  
        // Ajoutez le widget sélectionné à la liste des widgets
        this.widgets.push(selectedWidget);
      },
      removeWidget(index) {
        // Supprimez le widget à l'index spécifié de la liste des widgets
        this.widgets.splice(index, 1);
      },
    },
  };
</script>
  
<style>
</style>
  