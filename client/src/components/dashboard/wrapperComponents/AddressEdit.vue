<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Adresse de facturation</h3>
    <div v-if="address">
      <address class="mt-4 not-italic text-[14px] text-gray-600">
        <p><strong>{{ address.numero }} rue {{ address.rue }} </strong></p>
        <p><strong>{{ address.ville }}, {{ address.codePostal }}</strong></p>
        <p><strong>Téléphone: {{ address.telephone }} 0744563247</strong></p>
      </address>
      <button @click="editMode = true" class="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        <i class="bi bi-pencil-square mr-2"></i> Modifier
      </button>
    </div>
    <div v-else>
      <p>Vous n'avez pas encore ajouté d'adresse à votre compte.</p>
    </div>

    <!-- Formulaire de modification d'adresse -->
    <form class="mt-4" v-if="editMode" @submit.prevent="updateTheAddress">
      <div class="flex flex-col space-y-2">
        <input v-model="formData.rue" type="text" placeholder="Rue" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.numero" type="text" placeholder="Numéro" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.ville" type="text" placeholder="Ville" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.codePostal" type="text" placeholder="Code Postal" required class="px-4 py-2 border border-gray-300 rounded">
      </div>
      <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../../pinia/auth.js';
import { useAddress } from '../../../composables/useAddress.js';

const authStore = useAuthStore();
const { address, loading, fetchAddressByUserId, updateAddress } = useAddress();

const formData = ref({
  rue: '',
  numero: '',
  ville: '',
  codePostal: '',
});

let editMode = ref(false);

// Charger l'adresse lorsque le composant est monté
onMounted(() => {
  authStore.fetchUseriD().then((userId) => {
    fetchAddressByUserId(userId);
  });
});

// Mettre à jour l'adresse
const updateTheAddress = () => {
  updateAddress(address.value.id, formData.value);
  editMode.value = false; // Sortir du mode édition après la soumission du formulaire
};
</script>

<style scoped>
</style>
