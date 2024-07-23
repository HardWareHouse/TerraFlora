<template>
  <div id="addressEdit" class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Mon adresse (Facturation|Livraison)</h3>
    <div v-if="address">
      <address class="mt-4 mb-2 not-italic text-[14px] text-gray-600">
        <p><strong>{{ address.numero }} {{ address.voie }} {{ address.rue }}</strong></p>
        <p><strong>{{ address.ville }}, {{ address.codePostal }}</strong></p>
        <p><strong>France</strong></p>
      </address>
      <button @click="toggleEditMode" class="inline-block px-4 py-2 mb-2 bg-red-600 text-white rounded hover:bg-red-700">
        <i class="bi bi-pencil-square mr-2"></i> {{ editMode ? 'Fermer' : 'Modifier' }}
      </button>
      
      <DeleteButton :onConfirm="() => deleteTheAddress(address.id)" buttonClass="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        <i class="bi bi-trash mr-2"></i> Supprimer
      </DeleteButton>
    </div>
    <div v-else>
      <p>Vous n'avez pas encore ajouté d'adresse à votre compte.</p>
      <button @click="toggleEditMode" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {{ editMode ? 'Fermer' : 'Ajouter une adresse' }}
      </button>
    </div>

    <!-- Formulaire de modification ou d'ajout d'adresse -->
    <form class="mt-6 space-y-4" v-if="editMode" @submit.prevent="updateTheAddress">
      <input v-model="formData.numero" type="text" placeholder="Numéro" required class="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white">
      <p v-if="errors.numero" class="text-red-500 text-sm">{{ errors.numero }}</p>

      <select v-model="formData.voie" required class="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white">
        <option value="" disabled selected>Choisissez une voie</option>
        <option value="allée">Allée</option>
        <option value="avenue">Avenue</option>
        <option value="boulevard">Boulevard</option>
        <option value="chemin">Chemin</option>
        <option value="cours">Cours</option>
        <option value="impasse">Impasse</option>
        <option value="passage">Passage</option>
        <option value="place">Place</option>
        <option value="quai">Quai</option>
        <option value="route">Route</option>
        <option value="rue">Rue</option>
        <option value="square">Square</option>
        <option value="voie">Voie</option>
      </select>
      <input v-model="formData.rue" type="text" placeholder="Rue" required class="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white">
      <p v-if="errors.rue" class="text-red-500 text-sm">{{ errors.rue }}</p>

      <input v-model="formData.ville" type="text" placeholder="Ville" required class="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white">
      <p v-if="errors.ville" class="text-red-500 text-sm">{{ errors.ville }}</p>

      <input v-model="formData.codePostal" type="text" placeholder="Code Postal" required class="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-white">
      <p v-if="errors.codePostal" class="text-red-500 text-sm">{{ errors.codePostal }}</p>

      <div class="flex space-x-4">
        <label for="isBillingAddress" class="flex items-center space-x-2">
          <input v-model="formData.isBillingAddress" type="checkbox" id="isBillingAddress" class="form-checkbox">
          <span>Adresse de facturation ?</span>
        </label>
        <label for="isDeliveryAddress" class="flex items-center space-x-2">
          <input v-model="formData.isDeliveryAddress" type="checkbox" id="isDeliveryAddress" class="form-checkbox">
          <span>Adresse de livraison ?</span>
        </label>
      </div>
      <button type="submit" class="w-full py-2 bg-red-500 text-white rounded hover:bg-red-700">Enregistrer</button>
    </form>
    <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
import { z } from 'zod';
import { useAddress } from '../../../composables/useAddress.js';
import DeleteButton from '../../challengesRequirement/deleteButton.vue';

const { address, loading, fetchAddress, createAddress, updateAddress, deleteAddress } = useAddress();
const userId = inject('userId');

const formData = ref({
  voie: '',
  numero: '',
  rue: '',
  ville: '',
  codePostal: '',
  isBillingAddress: true,
  isDeliveryAddress: false
});

const errors = ref({
  numero: '',
  rue: '',
  ville: '',
  codePostal: ''
});

const originalFormData = ref(null);
const validVoies = ['allée', 'avenue', 'boulevard', 'chemin', 'cours', 'impasse', 'passage', 'place', 'quai', 'route', 'rue', 'square', 'voie']; // Les voies valides
const myUserId = ref(null);
const editMode = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  if (userId && userId.value) {
    fetchAddress().then(() => {
      myUserId.value = userId.value;
    });
  }
});

watch(address, (newAddress) => {
  if (newAddress) {
    formData.value = {
      voie: newAddress.voie || '',
      numero: newAddress.numero || '',
      rue: newAddress.rue || '',
      ville: newAddress.ville || '',
      codePostal: newAddress.codePostal || '',
      isBillingAddress: newAddress.isBillingAddress || true,
      isDeliveryAddress: newAddress.isDeliveryAddress || false
    };
    originalFormData.value = { ...formData.value };
  } else {
    formData.value = {
      voie: '',
      numero: '',
      rue: '',
      ville: '',
      codePostal: '',
      isBillingAddress: true,
      isDeliveryAddress: false
    };
  }
});

const formatErrorMessage = (error) => {
  switch (error.code) {
    case 'too_big':
      return `Le champ ne peut pas dépasser ${error.maximum} caractères`;
    case 'too_small':
      return `Le champ doit contenir au moins ${error.minimum} caractères`;
    case 'invalid_string':
      return `Le champ contient des caractères invalides`;
    case 'invalid_type':
      return `Le type de valeur est incorrect`;
    default:
      return `Erreur de validation`;
  }
};

const validateForm = () => {
  errors.value = {
    numero: '',
    rue: '',
    ville: '',
    codePostal: ''
  };

  const numeroSchema = z.string()
    .min(1, 'Le numéro est requis')
    .max(4, 'Le numéro ne peut pas dépasser 4 caractères')
    .regex(/^\d{1,3}[a-zA-Z]?$/, 'Le numéro doit être entre 1 et 3 chiffres, avec éventuellement une lettre');
  const rueSchema = z.string().min(1, 'La rue est requise').max(50, 'La rue ne peut pas dépasser 50 caractères');
  const villeSchema = z.string().min(1, 'La ville est requise').max(50, 'La ville ne peut pas dépasser 50 caractères');
  const codePostalSchema = z.string().length(5, 'Le code postal doit comporter 5 caractères');

  try {
    numeroSchema.parse(formData.value.numero);
  } catch (e) {
    errors.value.numero = formatErrorMessage(e.errors[0]);
  }

  try {
    rueSchema.parse(formData.value.rue);
  } catch (e) {
    errors.value.rue = formatErrorMessage(e.errors[0]);
  }

  try {
    villeSchema.parse(formData.value.ville);
  } catch (e) {
    errors.value.ville = formatErrorMessage(e.errors[0]);
  }

  try {
    codePostalSchema.parse(formData.value.codePostal);
  } catch (e) {
    errors.value.codePostal = formatErrorMessage(e.errors[0]);
  }

  return Object.values(errors.value).every(error => error === '');
};

const updateTheAddress = async () => {
  if (!validateForm()) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire.';
    return;
  }
  
  if (!validVoies.includes(formData.value.voie)) {
    errorMessage.value = 'La voie sélectionnée est invalide.';
    return;
  } else {
    errorMessage.value = '';
  }

  if (JSON.stringify(formData.value) === JSON.stringify(originalFormData.value)) {
    errorMessage.value = 'Aucun changement détecté.';
    return;
  }

  try {
    if (address.value) {
      await updateAddress(address.value.id, formData.value);
    } else {
      await createAddress(myUserId.value, formData.value);
    }
    successMessage.value = 'Votre adresse a été mise à jour avec succès!';
    editMode.value = false;
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la mise à jour de l\'adresse. Veuillez réessayer.';
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
        voie: address.value.voie || '',
        numero: address.value.numero || '',
        rue: address.value.rue || '',
        ville: address.value.ville || '',
        codePostal: address.value.codePostal || '',
        isBillingAddress: address.value.isBillingAddress || true,
        isDeliveryAddress: address.value.isDeliveryAddress || false
      };
    }
  }
};

const resetFormData = () => {
  formData.value = {
    voie: '',
    numero: '',
    rue: '',
    ville: '',
    codePostal: '',
    isBillingAddress: true,
    isDeliveryAddress: false
  };
};

const deleteTheAddress = async (addressId) => {
  try {
    await deleteAddress(addressId);
    address.value = null;
    successMessage.value = 'Votre adresse a été supprimée avec succès!';
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la suppression de l\'adresse. Veuillez réessayer.';
    console.error('Erreur lors de la suppression de l\'adresse:', error);
  }
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
