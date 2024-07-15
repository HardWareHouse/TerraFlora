<template>
  <div class="container mx-auto px-4 py-8">
    <Breadcrumb />
    <nav nav class="flex justify-center bg-white shadow-md rounded-lg px-4 py-2 mb-4">
      <ul class="flex space-x-4">
        <li v-for="tab in tabs" :key="tab.id">
          <a href="#" :class="tabClass(tab.id)" @click.prevent="selectTab(tab.id)">
            <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="bg-white shadow-md rounded-lg p-4">
      <transition name="fade" mode="out-in">
        <component :is="activeTabComponent" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import Breadcrumb from "../components/adminDashboard/breadcrumb.vue";

const activeTab = ref('resources');

const selectTab = (tab) => {
  activeTab.value = tab;
};

const tabs = [
  { id: 'resources', icon: 'bi-gear-fill', label: 'Gestion des Ressources' },
  { id: 'statistics', icon: 'bi-bar-chart-line-fill', label: 'Statistiques' },
  { id: 'contacts', icon: 'bi-people-fill', label: 'Contacts' },
  { id: 'others', icon: 'bi-three-dots', label: 'Autres' },
];

const tabClass = (tab) => {
  return {
    'py-2 px-4 flex items-center rounded hover:bg-gray-200 transition-colors': true,
    'bg-red-600 text-white': activeTab.value === tab,
    'text-gray-700': activeTab.value !== tab
  };
};

const components = {
  resources: defineAsyncComponent(() => import('../components/adminDashboard/resourcesCrud.vue')),
  statistics: defineAsyncComponent(() => import('../components/adminDashboard/adminPanel.vue')),
  contacts: defineAsyncComponent(() => import('../components/adminDashboard/contacts.vue')),
  others: defineAsyncComponent(() => import('../components/adminDashboard/others.vue')),
};

const activeTabComponent = computed(() => components[activeTab.value] || 'div');
</script>

<style scoped>
/* Styles pour la transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Styles pour les onglets */
nav ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #000;
  transition: background-color 0.3s, color 0.3s;
}

nav a.active {
  background-color: red;
  color: #fff;
}

nav a i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
