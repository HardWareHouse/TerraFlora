import { defineStore } from 'pinia';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/'
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    tokenMailPreference: null,
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
        const response = await instance.post('auth/login', { email, password });

        const userData = response.data.user;

        this.token = response.data.loginToken;
        this.tokenMailPreference = response.data.mailPreferenceToken;
        this.nom = userData.nom;
        this.prenom = userData.prenom;
        this.id = userData.id;
        this.email = userData.email;
        this.role = userData.role;
        this.wantsMailChangingPrice = userData.wantsMailChangingPrice;
        this.wantsMailNewProduct = userData.wantsMailNewProduct;
        this.wantsMailNewsletter = userData.wantsMailNewsletter;
        this.wantsMailRestockProduct = userData.wantsMailRestockProduct;

        instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        localStorage.setItem('user', JSON.stringify({
          token: this.token
        }));

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

      localStorage.removeItem('user');
      instance.defaults.headers.common['Authorization'] = '';
    },
    checkToken() {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.token = parsedUser.token;
        instance.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    }
  }
});
