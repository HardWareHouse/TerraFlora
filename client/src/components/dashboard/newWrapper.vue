<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '../../pinia/auth.js';
import { connect } from 'echarts';

const authStore = useAuthStore();
const router = useRouter();
const activeTab = ref('dashboard');

const selectTab = (tab) => {
  activeTab.value = tab;
};

const tabs = [
  { id: 'dashboard', icon: 'bi-speedometer2', label: 'Tableau de bord' },
  { id: 'orders', icon: 'bi bi-cart-fill', label: 'Mes commandes' },
  { id: 'download', icon: 'bi-cloud-download', label: 'Mes telechargements' },
  { id: 'addressEdit', icon: 'bi-geo-alt-fill', label: 'Mon adresse' },
  { id: 'accountInfo', icon: 'bi-person', label: 'Mon compte' },
  { id: 'emailPreference', icon: 'bi bi-envelope-paper-fill', label: 'Mes préférences' },
  { id: 'contact', icon: 'bi-send', label: 'Contactez-nous' },
  { id: 'logout', icon: 'bi-box-arrow-left', label: 'Déconnexion' },
];

const tabClass = (tab) => {
  return {
    'py-2 px-4 flex items-center': true,
    'bg-red-600 text-white': activeTab.value === tab,
    'hover:bg-red-600 text-black': activeTab.value !== tab
  };
};

const components = {
  dashboard: defineAsyncComponent(() => import('./wrapperComponents/Dashboard.vue')),
  orders: defineAsyncComponent(() => import('./wrapperComponents/Orders.vue')),
  download: defineAsyncComponent(() => import('./wrapperComponents/Downloads.vue')),
  addressEdit: defineAsyncComponent(() => import('./wrapperComponents/AddressEdit.vue')),
  emailPreference: defineAsyncComponent(() => import('./wrapperComponents/EmailPreference.vue')),
  contact: defineAsyncComponent(() => import('./wrapperComponents/Contacts.vue')),
  accountInfo: defineAsyncComponent(() => import('./wrapperComponents/AccountInfo.vue'))
};

const activeTabComponent = computed(() => components[activeTab.value] || 'div');


const logout = async () => {
  await authStore.logout();

  if (!authStore.token) {
    router.push('/');
  }
};
</script>

<template>
  <div class="my-account-wrapper py-8 px-6">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="w-full md:w-1/4 mb-4 md:mb-0">
        <div class="bg-white shadow-md rounded-lg">
          <div class="myaccount-tab-menu">
            <template v-for="tab in tabs" :key="tab.id">
              <a
                v-if="tab.id !== 'logout'"
                :href="`#${tab.id}`"
                :class="tabClass(tab.id)"
                @click.prevent="selectTab(tab.id)"
              >
                <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
              </a>
              <a
                v-else
                href="#"
                :class="tabClass(tab.id)"
                @click.prevent="logout"
              >
                <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
              </a>
            </template>
          </div>
        </div>
      </div>
      <div class="w-full md:w-3/4 pl-0 md:ml-4">
        <div class="">
          <transition name="fade" mode="out-in">
            <component :is="activeTabComponent" />
          </transition>
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
.myaccount-tab-menu a:hover {
  color: white !important;
}
</style>
