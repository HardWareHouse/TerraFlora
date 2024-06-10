<template>
    <div class="container flex items-center justify-center my-20">
        <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h2 class="text-3xl font-semibold text-center text-gray-900">Sign In</h2>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <div>
                        <label for="email" class="sr-only">Email or Username</label>
                        <input v-model="email" id="email" name="email" type="email" required
                            class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm"
                            placeholder="Email or Username" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Enter your Password</label>
                        <input v-model="password" id="password" name="password" type="password" required
                            class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm"
                            placeholder="Enter your Password" />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            class="w-4 h-4 ml-0 mb-0 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                        <label for="remember_me" class="block ml-2 text-sm text-gray-900">Remember Me</label>
                    </div>
                    <div class="text-sm">
                        <a href="/resetPassword" class="font-medium text-red-600 hover:text-red-500">Forget Password?</a>
                    </div>
                </div>
                <div class="flex items-end text-sm w-full">
                        Pas de compte ?<a href="/register" class="font-medium text-red-600 hover:text-red-500">&nbsp; Enregistrer-vous ?</a>
                    </div>
                <div>
                    <button type="submit"
                        class="relative flex justify-center px-4 py-2 text-md font-medium text-white bg-red-600 border border-transparent group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Login
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

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:8000/auth/login', {
            email: email.value,
            password: password.value
        })
        success.value = 'Login successful!'
        error.value = ''
    } catch (err) {
        error.value = err.response?.data?.error || 'An error occurred.'
        success.value = ''
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
