<template>
  <div class="bg-white p-6 shadow-md">
    <h3 class="text-2xl font-medium pb-2 border-b border-gray-200">Tableau de bord</h3>
    <div class="mt-4 text-[14px] text-gray-600">
      <p class="">
        Salut, <strong class="text-red-600">{{ nomPrenom }}</strong> !
      </p>
    </div>
    <p class="mt-1 text-[14px] text-gray-600">
      Depuis votre tableau de bord de compte, vous pouvez facilement vérifier et consulter vos commandes récentes, gérer vos adresses de livraison et de facturation, et modifier votre mot de passe et les détails de votre compte.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../../pinia/auth.js'; 

const authStore = useAuthStore();

const nomPrenom = ref(authStore.nom + ' ' + authStore.prenom);
</script>

<style scoped>
</style>
