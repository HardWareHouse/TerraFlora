<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';

const activeTab = ref('dashboard');

const selectTab = (tab) => {
  activeTab.value = tab;
};

const tabs = [
  { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { id: 'orders', icon: 'bi-cart', label: 'Orders' },
  { id: 'download', icon: 'bi-cloud-download', label: 'Download' },
  { id: 'addressEdit', icon: 'bi-geo-alt-fill', label: 'Address' },
  { id: 'accountInfo', icon: 'bi-person', label: 'Account Details' },
  { id: 'emailPreference', icon: 'bi-envelope-paper-fill', label: 'Email Preference' },
  { id: 'logout', icon: 'bi-box-arrow-left', label: 'Logout', link: 'login' },
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
  emailPreference: defineAsyncComponent(() => import('./wrapperComponents/emailPreference.vue')),
  accountInfo: defineAsyncComponent(() => import('./wrapperComponents/AccountInfo.vue'))
};

const activeTabComponent = computed(() => components[activeTab.value] || 'div');
</script>

<template>
  <div class="my-account-wrapper py-8">
    <div class="container mx-auto flex">
      <div class="w-1/4">
        <div class="bg-white shadow-md rounded-lg">
          <div class="myaccount-tab-menu">
            <template v-for="tab in tabs" :key="tab.id">
              <a
                v-if="!tab.link"
                href="#"
                :class="tabClass(tab.id)"
                @click.prevent="selectTab(tab.id)"
              >
              <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
              </a>
              <a
                v-else
                :href="tab.link"
                class="py-2 px-4 flex items-center hover:bg-red-600 text-black"
              >
                <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
              </a>
            </template>
          </div>
        </div>
      </div>
      <div class="w-3/4 pl-4">
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
