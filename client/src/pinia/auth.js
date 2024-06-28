import { defineStore } from 'pinia';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
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
        const { loginToken, mailPreferenceToken, user } = response.data;

        this.setUserData(loginToken, mailPreferenceToken, user);
        this.success = 'Login successful!';
        this.error = '';
      } catch (err) {
        this.error = err.response?.data?.error || 'An error occurred.';
        this.success = '';
      }
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await instance.get('auth/me');
          const userData = response.data;
    
          this.setUserData(token, this.tokenMailPreference, userData);
        }
      } catch (err) {
        this.logout();
      }
    },
    logout() {
      this.clearUserData();
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.fetchUserData();
      }
    },
    setUserData(token, tokenMailPreference, userData) {
      this.token = token;
      this.tokenMailPreference = tokenMailPreference;
      this.nom = userData.nom;
      this.prenom = userData.prenom;
      this.id = userData.id;
      this.email = userData.email;
      this.role = userData.role;
      this.wantsMailChangingPrice = userData.wantsMailChangingPrice;
      this.wantsMailNewProduct = userData.wantsMailNewProduct;
      this.wantsMailNewsletter = userData.wantsMailNewsletter;
      this.wantsMailRestockProduct = userData.wantsMailRestockProduct;

      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('token', token);
      localStorage.setItem('tokenMailPreference', tokenMailPreference);
    },
    clearUserData() {
      this.token = null;
      this.tokenMailPreference = null;
      this.nom = '';
      this.id = '';
      this.prenom = '';
      this.email = '';
      this.role = '';
      this.wantsMailChangingPrice = null;
      this.wantsMailNewProduct = null;
      this.wantsMailNewsletter = null;
      this.wantsMailRestockProduct = null;
      this.success = '';
      this.error = '';

      localStorage.removeItem('token');
      localStorage.removeItem('tokenMailPreference');
      delete instance.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isLoggedIn() {
      return !!this.token;
    },
    isAdmin() {
      return this.role === 'ROLE_ADMIN';
    },
    isUser() {
      return this.role === 'ROLE_USER';
    }
  }
});
