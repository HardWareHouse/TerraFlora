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
import { ref, watchEffect, onMounted, inject } from 'vue';
import { useUser } from '../../../composables/useUser.js';

const { user, loading, fetchUser } = useUser();
const userId = inject('userId');
const nomPrenom = ref('');

onMounted(() => {
  if (userId && userId.value) {
    fetchUser(userId.value).then(() => {
      updateNomPrenom();
    });
  }
});

const updateNomPrenom = () => {
  if (user.value) {
    nomPrenom.value = `${user.value.nom} ${user.value.prenom}`;
  }
};

watchEffect(() => {
  if (user.value) {
    updateNomPrenom();
  }
});
</script>

<style scoped>
</style>
