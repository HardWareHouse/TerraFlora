<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Adresse de facturation</h3>
    <div v-if="address">
      <address class="mt-4 not-italic text-[14px] text-gray-600">
        <p><strong>{{ address.numero }} rue {{ address.rue }}</strong></p>
        <p><strong>{{ address.ville }}, {{ address.codePostal }}</strong></p>
        <p><strong>France</strong></p>
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
    <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
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
  numero: '',
  rue: '',
  ville: '',
  codePostal: '',
});

const originalFormData = ref(null); // Pour stocker les données originales de l'adresse

const myUserId = ref(null);
const editMode = ref(false);
const successMessage = ref(''); // Message de confirmation de succès

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
      numero: newAddress.numero || '',
      rue: newAddress.rue || '',
      ville: newAddress.ville || '',
      codePostal: newAddress.codePostal || ''
    };
    originalFormData.value = { ...formData.value }; // Stocker les données originales
  }
});

const updateTheAddress = async () => {
  if (JSON.stringify(formData.value) === JSON.stringify(originalFormData.value)) {
    console.log('Aucun changement détecté');
    return;
  }

  try {
    if (address.value) {
      await updateAddress(address.value.id, formData.value);
    } else {
      await createAddress(myUserId.value, formData.value);
    }
    successMessage.value = 'Adresse mise à jour avec succès!';
    editMode.value = false;
  } catch (error) {
    successMessage.value = ' Une erreur est survenue lors de la mise à jour de l\'adresse. Veuillez réessayer.';
    console.error('Erreur lors de la mise à jour de l\'adresse:', error);
  }
};

const toggleEditMode = () => {
  editMode.value = !editMode.value;
  if (!editMode.value) {
    resetFormData();
  } else {
    if (address.value) {
      formData.value = {
        adresse: address.value.adresse || '',
        numero: address.value.numero || '',
        rue: address.value.rue || '',
        ville: address.value.ville || '',
        codePostal: address.value.codePostal || ''
      };
    }
  }
};

const resetFormData = () => {
  formData.value = {
    adresse: '',
    numero: '',
    rue: '',
    ville: '',
    codePostal: '',
  };
};
</script>

<style scoped>
</style>
