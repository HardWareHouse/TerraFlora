import { defineStore } from 'pinia';
import instance from '../axios.js';
import z from 'zod';

const userSchema = z.object({
  id: z.string(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string(),
  role: z.string(),
  telephone: z.string(),
  wantsMailChangingPrice: z.boolean(),
  wantsMailNewProduct: z.boolean(),
  wantsMailNewsletter: z.boolean(),
  wantsMailRestockProduct: z.boolean(),
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    tokenMailPreference: localStorage.getItem('tokenMailPreference') || null,
    nom: "",
    id: "",
    prenom: "",
    email: "",
    role: "",
    telephone: "",
    wantsMailChangingPrice: null,
    wantsMailNewProduct: null,
    wantsMailNewsletter: null,
    wantsMailRestockProduct: null,
    error: "",
    success: null,
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
        this.success = null;
      }
    },
    logout() {
      this.clearUserData();
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
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
      this.telephone = userData.telephone;
      this.wantsMailChangingPrice = userData.wantsMailChangingPrice;
      this.wantsMailNewProduct = userData.wantsMailNewProduct;
      this.wantsMailNewsletter = userData.wantsMailNewsletter;
      this.wantsMailRestockProduct = userData.wantsMailRestockProduct;

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
      this.telephone = '';
      this.wantsMailChangingPrice = null;
      this.wantsMailNewProduct = null;
      this.wantsMailNewsletter = null;
      this.wantsMailRestockProduct = null;
      this.success = null ;
      this.error = '';

      localStorage.removeItem('token');
      localStorage.removeItem('tokenMailPreference');
    },
    async getUseriD() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
    
        const response = await instance.get('auth/verify-token');
    
        const userId = response.data.userId;
        if (!userId) {
          console.error('No user found');
          return;
        }
        return userId;
      } catch (err) {
        console.error('Error while fetching user data:', err);
      }
    },
  },
  getters: {
    isLoggedIn() {
      return this.token !== null;
    },
    isAdmin() {
      return this.role === 'ROLE_ADMIN';
    },
    isUser() {
      return this.role === 'ROLE_USER';
    }
  }
});
