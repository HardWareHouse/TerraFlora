import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        nom: "",
        id: "",
        prenom: "",
        email: "",
        role: "",
        wantsMailChangingPrice: null,
        wantsMailNewProduct: null,
        wantsMailNewsletter: null,
        wantsMailRestockProduct: null,  
        error: "",
        success: "",
    }),
    actions: {

        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:8000/auth/login', {
                    email: email,
                    password: password
                });

                const userData = response.data.user;

                this.token = response.data.token;
                this.nom = userData.nom;
                this.prenom = userData.prenom;
                this.id = userData.id;
                this.email = userData.email;
                this.role = userData.role;
                this.wantsMailChangingPrice = userData.wantsMailChangingPrice;
                this.wantsMailNewProduct = userData.wantsMailNewProduct;
                this.wantsMailNewsletter = userData.wantsMailNewsletter;
                this.wantsMailRestockProduct = userData.wantsMailRestockProduct;

                this.success = 'Login successful!';
                this.error = '';
                
            } catch (err) {
                console.error('Error during login:', err);
                this.error = err.response?.data?.error || 'An error occurred.';
                this.success = '';
            }
        },
        logout() {
            console.log('Logging out...');
            this.token = '';
            this.nom = '';
            this.id = '';
            this.prenom = '';
            this.email = '';
            this.role = '';
            this.success = '';
            this.error = '';
        }
    }
});
