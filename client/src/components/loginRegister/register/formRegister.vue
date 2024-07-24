<template>
  <div class="flex items-center justify-center my-20">
    <div class="container p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold text-center text-gray-900">Inscription</h2>
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
              <label for="email_cfg" class="sr-only">Confirmation email</label>
              <input v-model="email_cfg" id="email_cfg" name="email_cfg" type="email" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Confirmation email" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="password" class="sr-only">Mot de passe</label>
              <input v-model="password" id="password" name="password" type="password" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Mot de passe" />
            </div>
            <div>
              <label for="password_cfg" class="sr-only">Confirmation mot de passe</label>
              <input v-model="password_cfg" id="password_cfg" name="password_cfg" type="password" required
                class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
                placeholder="Confirmation du mot de passe" />
            </div>
          </div>
          <div>
            <label for="telephone" class="sr-only">Téléphone</label>
            <input v-model="telephone" id="telephone" name="telephone" type="text" required
              @input="validateTelephone"
              class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none sm:text-sm"
              placeholder="Téléphone" />
          </div>
          <div class="flex flex-wrap-reverse justify-around items-center lg:justify-start">
              <input v-model="haveConsented" id="haveConsented" name="haveConsented" type="checkbox"
                class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
              <label for="haveConsented" class="ml-2 text-sm text-gray-900">J'accepte les termes et conditions de Terra Flora</label>
          </div>
              <label for="haveConsented" class="ml-2 text-sm text-gray-900">Je veux recevoir les mails : </label>
            <div class="flex justify-around lg:justify-start">
                <div class="flex flex-wrap-reverse justify-around items-center">
                  <input v-model="wantsMailNewProduct" id="wantsMailNewProduct" name="wantsMailNewProduct" type="checkbox"
                  class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <label for="wantsMailNewProduct" class="ml-2 text-sm text-gray-900">de nouveaux produits</label>
              </div>
              <div class="flex flex-wrap-reverse justify-around items-center lg:ml-10">
                <input v-model="wantsMailRestockProduct" id="wantsMailRestockProduct" name="wantsMailRestockProduct" type="checkbox"
                class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                <label for="wantsMailRestockProduct" class="ml-2 text-sm text-gray-900">de restock de produit</label>
              </div>
            </div>
            <div class="flex justify-around lg:justify-start" >
              <div class="flex flex-wrap-reverse justify-around items-center">
                  <input v-model="wantsMailChangingPrice" id="wantsMailChangingPrice" name="wantsMailChangingPrice" type="checkbox"
                  class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <label for="wantsMailChangingPrice" class="ml-2 text-sm text-gray-900">de changement de prix</label>
              </div> 
              <div class="flex flex-wrap-reverse justify-around items-center lg:ml-8">
                  <input v-model="wantsMailNewsletter" id="wantsMailNewsletter" name="wantsMailNewsletter" type="checkbox"
                    class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <label for="wantsMailNewsletter" class="ml-2 text-sm text-gray-900">de newsletter</label>
              </div>
            </div>
        </div>
        <div>
          <button type="submit"
            class="relative flex justify-center px-4 py-2 text-md font-medium text-white bg-red-600 border border-transparent group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            S'inscrire
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
const wantsMailNewProduct = ref(false)
const wantsMailRestockProduct = ref(false)
const wantsMailChangingPrice = ref(false)
const wantsMailNewsletter = ref(false)
const error = ref('')
const success = ref('')

const validateTelephone = (event) => {
  const input = event.target.value.replace(/\D/g, '');
  if (input.length > 0 && input[0] !== '0') {
    error.value = 'Le numéro de téléphone doit commencer par 0.';
  } else {
    error.value = '';
  }
  telephone.value = input.slice(0, 10);
}

const handleSubmit = async () => {
  if (email.value !== email_cfg.value) {
      error.value = 'les emails ne correspondent pas.'
      success.value = ''
      return
  }

  if (password.value !== password_cfg.value) {
      error.value = 'Les mots de passe ne correspondent pas.'
      success.value = ''
      return
  }

  if (telephone.value.length !== 10) {
      error.value = 'Le numéro de téléphone doit contenir 10 chiffres.'
      success.value = ''
      return
  }

  try {
      const response = await axios.post(import.meta.env.VITE_API_URL + 'auth/register', {
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
          email_cfg: email_cfg.value,
          password: password.value,
          password_cfg: password_cfg.value,
          telephone: telephone.value,
          haveConsented: haveConsented.value,
          wantsMailNewProduct: wantsMailNewProduct.value,
          wantsMailRestockProduct: wantsMailRestockProduct.value,
          wantsMailChangingPrice: wantsMailChangingPrice.value,
          wantsMailNewsletter: wantsMailNewsletter.value
      })
      success.value = response.data.msg || 'Inscription réussie. Vous pouvez maintenant vous connecter.'
      error.value = ''
      router.push({ path: '/login' });
  } catch (err) {
      error.value = err.response?.data?.msg || 'Une erreur est survenue.'
      success.value = ''
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
