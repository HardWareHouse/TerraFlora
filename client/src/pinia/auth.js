import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        error: '',
        success: ''
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:8000/auth/login', {
                    email: email,
                    password: password
                });
                this.token = response.data.token;
                this.success = 'Login successful!';
                this.error = '';
            } catch (err) {
                this.error = err.response?.data?.error || 'An error occurred.';
                this.success = '';
            }
        },
        logout() {
            this.token = '';
            this.success = '';
            this.error = '';
        }
    }
});
