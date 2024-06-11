<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';

// Définition de l'état réactif avec ref
const activeTab = ref('dashboard');

// Définition de la méthode selectTab
const selectTab = (tab) => {
  activeTab.value = tab;
};

// Définition des onglets
const tabs = [
  { id: 'dashboard', icon: 'fa-dashboard', label: 'Dashboard' },
  { id: 'orders', icon: 'fa-cart-arrow-down', label: 'Orders' },
  { id: 'download', icon: 'fa-cloud-download', label: 'Download' },
  { id: 'payment-method', icon: 'fa-credit-card', label: 'Payment Method' },
  { id: 'address-edit', icon: 'fa-map-marker', label: 'Address' },
  { id: 'account-info', icon: 'fa-user', label: 'Account Details' },
  { id: 'logout', icon: 'fa-sign-out', label: 'Logout', link: 'login-register.html' }
];

// Définition des classes pour les onglets
const tabClass = (tab) => {
  return {
    'py-2 px-4 bg-white rounded-lg shadow-md': true,
    'bg-gray-200': activeTab.value === tab
  };
};

// Définition des composants pour chaque onglet
const components = {
  dashboard: defineAsyncComponent(() => import('./wrapperComponents/Dashboard.vue')),
  orders: defineAsyncComponent(() => import('./wrapperComponents/Orders.vue')),
  download: defineAsyncComponent(() => import('./wrapperComponents/Downloads.vue')),
  'payment-method': defineAsyncComponent(() => import('./wrapperComponents/PaymentMethod.vue')),
  'address-edit': defineAsyncComponent(() => import('./wrapperComponents/AddressEdit.vue')),
  'account-info': defineAsyncComponent(() => import('./wrapperComponents/AccountInfo.vue'))
};

// Calcul du composant actif
const activeTabComponent = computed(() => components[activeTab.value] || 'div');
</script>

<template>
  <div class="my-account-wrapper py-8 pb-0 pt-0">
    <div class="container mx-auto">
      <div class="bg-gray-100 p-4 rounded-lg">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/4 md:w-1/3">
            <!-- My Account Tab Menu Start -->
            <div class="myaccount-tab-menu flex flex-col space-y-2" role="tablist">
              <template v-for="tab in tabs" :key="tab.id">
                <a
                  v-if="!tab.link"
                  href="#"
                  :class="tabClass(tab.id)"
                  @click.prevent="selectTab(tab.id)"
                >
                  <i :class="`fa ${tab.icon}`"></i> {{ tab.label }}
                </a>
                <a
                  v-else
                  :href="tab.link"
                  class="py-2 px-4 bg-white rounded-lg shadow-md"
                >
                  <i :class="`fa ${tab.icon}`"></i> {{ tab.label }}
                </a>
              </template>
            </div>
            <!-- My Account Tab Menu End -->
          </div>
          
          <!-- My Account Tab Content Start -->
          <div class="w-full lg:w-3/4 md:w-2/3 lg:pl-2">
            <transition name="fade" mode="out-in">
              <component :is="activeTabComponent" />
            </transition>
          </div>
          <!-- My Account Tab Content End -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
