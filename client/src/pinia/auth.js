import { defineStore } from 'pinia';
import axios from 'axios';
import z from 'zod';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    token: null,
    tokenMailPreference: null,
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
    logout() {
      this.clearUserData();
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      this.telephone = '';
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
    async getUseriD() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        
        const response = await instance.get('auth/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
