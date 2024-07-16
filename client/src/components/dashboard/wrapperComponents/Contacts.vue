<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Contactez-nous</h3>
    <div class="mt-4">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="subject" class="block text-sm font-medium text-gray-700 required">Sujet <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.subject" type="text" id="subject" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Sujet">
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 required">Adresse mail <label class="text-red-600 text-l">*</label></label>
            <input v-model="formData.email" type="email" id="email" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Adresse mail">
          </div>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700 required">Message <label class="text-red-600 text-l">*</label></label>
          <textarea v-model="formData.message" id="message" rows="5" maxlength="300" class="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="Votre message"></textarea>
          <span class="text-sm text-gray-500">{{ 300 - formData.message.length }} caractères restants</span>
        </div>
        <div class="mt-4">
          <button type="submit" class="bg-red-600 text-white py-2 px-4 hover:bg-red-700">Envoyer</button>
          <button type="button" @click="clearForm(true)" class="bg-gray-200 text-gray-700 py-2 px-4 hover:bg-gray-300 ml-2">Annuler</button>
        </div>
      </form>
      <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useContact } from '../../../composables/useContact.js';

const { sendContactMessage, isEmailAddressValid } = useContact();
const userId = inject('userId');

const formData = ref({
  userId: userId.value,
  subject: '',
  message: '',
  email: ''
});
const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  try {
    const response = await sendContactMessage(formData.value);
    if (!response) {
      errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
    }
    
    successMessage.value = 'Votre message a été envoyé avec succès, nous vous répondrons dans les plus brefs délais.';
    clearForm();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const { error: errorMsg } = error.response.data;
      if (errorMsg === 'Daily limit reached') {
        errorMessage.value = 'Limite quotidienne atteinte. Réessayez demain.';
      } else if (errorMsg === 'Monthly limit reached') {
        errorMessage.value = 'Limite mensuelle atteinte. Réessayez le mois prochain.';
      } else {
        errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message.';
      }
    } else {
      errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message.';
    }
    console.error('Erreur lors de l\'envoi du message :', error);
  }
};

const validateForm = () => {
  if (!formData.value.subject || !formData.value.message || !formData.value.email) {
    errorMessage.value = 'Veuillez remplir tous les champs.';
    return false;
  }

  if (!isEmailAddressValid(formData.value.email)) {
    errorMessage.value = 'Veuillez saisir une adresse email valide.';
    return false;
  }

  return true;
};

const clearForm = (all) => {
  formData.value.subject = '';
  formData.value.message = '';
  formData.value.email = '';
  if (all) {
    successMessage.value = '';
    errorMessage.value = '';
  }
};
</script>

<style scoped>
.form-textarea {
  resize: none;
}
</style>
