<template>
  <div id="accountInfo" class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Mon compte</h3>
    <div class="mt-4">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="first-name" class="block text-sm font-medium text-gray-700 required">Prénom <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.prenom" type="text" id="first-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Prénom">
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="last-name" class="block text-sm font-medium text-gray-700 required">Nom <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.nom" type="text" id="last-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Nom">
          </div>
        </div>
        <div class="mb-4">
          <label for="phone-number" class="block text-sm font-medium text-gray-700 required">Téléphone <label class="text-red-600 text-l">*</label></label>
          <input v-model="formData.telephone" type="tel" id="phone-number" minlength="10" maxlength="10" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Téléphone">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 required">Adresse mail <label class="text-red-600 text-l">*</label></label>
          <input v-model="formData.email" type="email" id="email" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Adresse mail">
        </div>
        <label class="text-xl font-medium border-b border-gray-200 pb-2 w-full">Modifier mon mot de passe</label>
        <div class="mb-4 mt-3">
          <label for="current-pwd" class="block text-sm font-medium text-gray-700 required">Mot de passe actuel <label class="text-red-600 text-l">*</label></label>
          <input v-model="formData.currentPassword" type="password" id="current-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Mot de passe actuel">
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="new-pwd" class="block text-sm font-medium text-gray-700 required">Nouveau mot de passe <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.newPassword" type="password" id="new-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Nouveau mot de passe">
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="confirm-pwd" class="block text-sm font-medium text-gray-700 required">Confirmation du mot de passe <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.confirmPassword" type="password" id="confirm-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Confirmation du mot de passe">
          </div>
        </div>
        <div class="mt-4">
          <button type="submit" class="bg-red-600 text-white py-2 px-4 hover:bg-red-700">Sauvegarder</button>
        </div>
      </form>
      <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject, computed } from 'vue';
import { useUser } from '../../../composables/useUser.js';

const { user, loading, fetchUser, updateUser, isPasswordValid, isEmailAddressValid } = useUser();
const userId = inject('userId');
const successMessage = ref('');
const errorMessage = ref('');

const formData = ref({
  id: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const initialData = ref({});

onMounted(() => {
  if (userId && userId.value) {
    fetchUser(userId.value).then(() => {
      updateUserInfo();
      initialData.value = { ...formData.value };
    });
  }
});

const updateUserInfo = () => {
  if (user.value) {
    formData.value.id = user.value.id;
    formData.value.nom = user.value.nom;
    formData.value.prenom = user.value.prenom;
    formData.value.email = user.value.email;
    formData.value.telephone = user.value.telephone;
  }
};

watch(user, (newVal) => {
  if (newVal) {
    updateUserInfo();
  }
});

const isFormModified = computed(() => {
  const formKeys = Object.keys(formData.value);
  const filteredKeys = formKeys.filter(key => key !== 'currentPassword');
  return filteredKeys.some(key => formData.value[key] !== initialData.value[key]);
});

const validateForm = () => {
  if (!formData.value.prenom || !formData.value.nom || !formData.value.telephone || !formData.value.email) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.';
    return false;
  }

  if (!formData.value.currentPassword) {
    errorMessage.value = 'Veuillez saisir votre mot de passe actuel.';
    return false;
  }

  if (!isFormModified.value) {
    errorMessage.value = 'Aucune modification détectée.';
    return false;
  }

  if(!formData.value.telephone.match(/^[0-9]{10}$/)) {
    errorMessage.value = 'Le numéro de téléphone doit contenir 10 chiffres.';
    return false;
  }

  if(!isEmailAddressValid(formData.value.email)) {
    errorMessage.value = 'Veuillez saisir une adresse mail valide.';
    return false;
  }

  if (!isPasswordValid(formData.value.currentPassword)) {
    errorMessage.value = 'Le mot de passe actuel est invalide.';
    return false;
  }

  if(formData.value.telephone.length !== 10) {
    errorMessage.value = 'Le numéro de téléphone doit contenir 10 chiffres.';
    return false;
  }

  if (formData.value.newPassword || formData.value.confirmPassword) {
    if (!formData.value.newPassword || !formData.value.confirmPassword) {
      errorMessage.value = 'Veuillez remplir tous les champs de mot de passe.';
      return false;
    }

    if (formData.value.newPassword !== formData.value.confirmPassword) {
      errorMessage.value = 'Les mots de passe ne correspondent pas.';
      return false;
    }

    if (!isPasswordValid(formData.value.newPassword)) {
      errorMessage.value = 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.';
      return false;
    }
  }

  return true;
};

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  try {
    const response = await updateUser(formData.value);
    if (!response) {
      errorMessage.value = 'Mot de passe actuel incorrect.';
      return;
    } else {
      initialData.value = { ...formData.value };
      successMessage.value = 'Les modifications ont été enregistrées avec succès.';
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la mise à jour des informations.';
  }
};
</script>


