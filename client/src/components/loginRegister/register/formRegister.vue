<template>
  <div class="container flex items-center justify-center my-20">
    <div class="w-full max-w-3xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold text-center text-gray-900">Register</h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="nom" class="sr-only">Nom</label>
              <input v-model="nom" id="nom" name="nom" type="text" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Nom" />
            </div>
            <div>
              <label for="prenom" class="sr-only">Prenom</label>
              <input v-model="prenom" id="prenom" name="prenom" type="text" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Prenom" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input v-model="email" id="email" name="email" type="email" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Email" />
            </div>
            <div>
              <label for="email_cfg" class="sr-only">Confirm Email</label>
              <input v-model="email_cfg" id="email_cfg" name="email_cfg" type="email" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Confirm Email" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" id="password" name="password" type="password" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Password" />
            </div>
            <div>
              <label for="password_cfg" class="sr-only">Confirm Password</label>
              <input v-model="password_cfg" id="password_cfg" name="password_cfg" type="password" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Confirm Password" />
            </div>
          </div>
          <div>
            <label for="telephone" class="sr-only">Telephone</label>
            <input v-model="telephone" id="telephone" name="telephone" type="text" required
              class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
              placeholder="Telephone" />
          </div>
          <div class="flex items-center">
            <input v-model="haveConsented" id="haveConsented" name="haveConsented" type="checkbox"
              class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
            <label for="haveConsented" class="ml-2 text-sm text-gray-900">I consent to the terms and conditions</label>
          </div>
        </div>
        <div>
          <button type="submit"
            class="relative flex justify-center px-4 py-2 text-md font-medium text-white bg-red-600 border border-transparent group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Register
          </button>
        </div>
        <div v-if="success" class="text-green-500">{{ success }}</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const nom = ref('')
const prenom = ref('')
const email = ref('')
const email_cfg = ref('')
const password = ref('')
const password_cfg = ref('')
const telephone = ref('')
const haveConsented = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  if (email.value !== email_cfg.value) {
      error.value = 'Emails do not match.'
      success.value = ''
      return
  }

  if (password.value !== password_cfg.value) {
      error.value = 'Passwords do not match.'
      success.value = ''
      return
  }

  try {
      const response = await axios.post('http://localhost:8000/auth/register', {
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
          email_cfg: email_cfg.value,
          password: password.value,
          password_cfg: password_cfg.value,
          telephone: telephone.value,
          haveConsented: haveConsented.value
      })
      success.value = response.data.msg || 'Registration successful!'
      error.value = ''
      router.push({ path: '/login' });
  } catch (err) {
      error.value = err.response?.data?.msg || 'An error occurred.'
      success.value = ''
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
