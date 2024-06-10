<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Réinitialiser le mot de passe</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Entrez votre nouveau mot de passe ci-dessous.
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="password" class="sr-only">Nouveau mot de passe</label>
              <input v-model="password" id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nouveau mot de passe">
            </div>
            <div>
              <label for="password_cfg" class="sr-only">Confirmer le mot de passe</label>
              <input v-model="password_cfg" id="password_cfg" name="password_cfg" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirmer le mot de passe">
            </div>
          </div>
  
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Réinitialiser le mot de passe
            </button>
          </div>
  
          <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
          </div>
          <div v-if="success" class="text-green-500 text-sm">
            {{ success }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  //import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  const password = ref('')
  const password_cfg = ref('')
  const error = ref('')
  const success = ref('')
  const route = useRoute()
  
  const handleSubmit = async () => {
    if (password.value !== password_cfg.value) {
      error.value = 'Les mots de passe ne correspondent pas.'
      success.value = ''
      return
    }
  
    try {
      const token = route.params.token
      const response = await axios.post(`http://localhost:8000/auth/reset-password/${token}`, {
        password: password.value,
        password_cfg: password_cfg.value
      })
      success.value = 'Mot de passe réinitialisé avec succès.'
      error.value = ''
    } catch (err) {
      error.value = err.response.data.error || 'Une erreur est survenue.'
      success.value = ''
    }
  }
  </script>
  
  <style>
  /* Vous pouvez ajouter des styles personnalisés ici si nécessaire */
  </style>
  