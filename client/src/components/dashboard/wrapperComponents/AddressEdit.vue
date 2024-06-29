<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Adresse de facturation</h3>
    <div v-if="address">
      <address class="mt-4 not-italic text-[14px] text-gray-600">
        <p><strong>{{ address.numero }} rue {{ address.rue }} </strong></p>
        <p><strong>{{ address.ville }}, {{ address.codePostal }}</strong></p>
        <p><strong>France </strong></p>
      </address>
      <button @click="toggleEditMode" class="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        <i class="bi bi-pencil-square mr-2"></i> {{ editMode ? 'Fermer' : 'Modifier' }}
      </button>
    </div>
    <div v-else>
      <p>Vous n'avez pas encore ajouté d'adresse à votre compte.</p>
      <button @click="toggleEditMode" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {{ editMode ? 'Fermer' : 'Ajouter une adresse' }}
      </button>
    </div>

    <!-- Formulaire de modification ou d'ajout d'adresse -->
    <form class="mt-4" v-if="editMode" @submit.prevent="updateTheAddress">
      <div class="flex flex-col space-y-2">
        <input v-model="formData.adresse" type="text" placeholder="Adresse" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.numero" type="text" placeholder="Numéro" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.rue" type="text" placeholder="Rue" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.ville" type="text" placeholder="Ville" required class="px-4 py-2 border border-gray-300 rounded">
        <input v-model="formData.codePostal" type="text" placeholder="Code Postal" required class="px-4 py-2 border border-gray-300 rounded">
      </div>
      <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../../../pinia/auth.js';
import { useAddress } from '../../../composables/useAddress.js';

const authStore = useAuthStore();
const { address, loading, fetchAddressByUserId, createAddress, updateAddress } = useAddress();

const formData = ref({
  adresse: '',
  rue: '',
  numero: '',
  ville: '',
  codePostal: '',
});

const myUserId = ref(null);
const editMode = ref(false);

onMounted(() => {
  authStore.getUseriD().then((userId) => {
    myUserId.value = userId;
    fetchAddressByUserId(userId);
  });
});

watch(address, (newAddress) => {
  if (newAddress) {
    formData.value = {
      adresse: newAddress.adresse || '',
      rue: newAddress.rue || '',
      numero: newAddress.numero || '',
      ville: newAddress.ville || '',
      codePostal: newAddress.codePostal || ''
    };
  }
});

const updateTheAddress = async () => {
  try {
    if (address.value) {
      await updateAddress(address.value.id, formData.value);
    } else {
      await createAddress(myUserId.value, formData.value);
    }
    editMode.value = false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'adresse:', error);
  }
};

const toggleEditMode = () => {
  editMode.value = !editMode.value;
  if (!editMode.value) {
    resetFormData();
  }
  else {
    if (address.value) {
      formData.value = {
        adresse: address.value.adresse || '',
        rue: address.value.rue || '',
        numero: address.value.numero || '',
        ville: address.value.ville || '',
        codePostal: address.value.codePostal || ''
      };
    }
  }
};

const resetFormData = () => {
  formData.value = {
    adresse: '',
    rue: '',
    numero: '',
    ville: '',
    codePostal: '',
  };
};
</script>

<style scoped>
</style>
