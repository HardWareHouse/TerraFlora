<script setup>
import Breadcrumb from "../components/adminDashboard/breadcrumbDashboardAdmin.vue";
import Wrapper from '../components/adminDashboard/wrapper.vue';

import { onMounted } from 'vue';
import { useAuthStore } from '../pinia/auth.js';

const authStore = useAuthStore();
onMounted(async () => {
  if (authStore.role !== 'ROLE_ADMIN' || authStore.id === null || authStore.id === undefined) {
    authStore.logout().then(() => {
      router.push({ name: 'login' });
    });
  }
});
</script>

<template>
  <div>
    <Breadcrumb />
    <Wrapper />
  </div>
</template>




