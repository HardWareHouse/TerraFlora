<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Autres</h1>
  
      <!-- Formulaire de soumission -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4">
          <h2 class="text-xl font-bold mb-2">Contactez-nous</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="subject" class="block text-sm font-medium text-gray-700 required">Sujet <span class="text-red-600">*</span></label>
              <input v-model="formData.subject" type="text" id="subject" class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="Sujet">
            </div>
            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700 required">Message <span class="text-red-600">*</span></label>
              <textarea v-model="formData.message" id="message" rows="5" class="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="Votre message"></textarea>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 required">Adresse email <span class="text-red-600">*</span></label>
              <input v-model="formData.email" type="email" id="email" class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="Votre adresse email">
            </div>
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Envoyer</button>
            </div>
            <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
            <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const formData = ref({
    subject: '',
    message: '',
    email: ''
  });
  
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await axios.post('/api/contact', formData.value);
      successMessage.value = 'Votre message a été envoyé avec succès.';
      clearForm();
    } catch (error) {
      errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
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
  
  const clearForm = () => {
    formData.value.subject = '';
    formData.value.message = '';
    formData.value.email = '';
    successMessage.value = '';
    errorMessage.value = '';
  };
  
  const isEmailAddressValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  </script>
  
  <style scoped>
  </style>
  