<script setup>
import { ref, onMounted, computed, provide } from 'vue';
import { useAuthStore } from '../pinia/auth.js';
import breadcrumb from "../components/dashboard/breadcrumbDashboard.vue";
import newWrapper from "../components/dashboard/newWrapper.vue";

const authStore = useAuthStore();
const userId = ref(null);

onMounted(async () => {
  userId.value = authStore.id;
  if (userId.value === null) {
    authStore.logout().then(() => {
      router.push({ name: 'login' });
    });
  }
});

const isUserLoaded = computed(() => userId.value !== null && userId.value !== undefined);
provide('userId', userId);
</script>

<template>
  <div v-if="isUserLoaded">
    <breadcrumb />
    <newWrapper />
  </div>
  <div v-else>
    Chargement du dashboard..., <br />Veuillez recharger la page si cela prend trop de temps
  </div>
</template>
