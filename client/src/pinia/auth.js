import { defineStore } from 'pinia';
import instance from '../axios.js';
import z from 'zod';
import { useCartStore } from './cart.js';

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
    cartId: null,
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
        this.error = err.response.data.message;
        this.success = null;
      }
    },
  
    logout() {
      this.clearUserData();
    },
    async checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        const user = await this.getUseriD();
        if (user) {
          this.id = user.userId;
          this.role = user.userRole;
        } else {
          this.clearUserData();
        }
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
      const cartStore = useCartStore();
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
      this.cartId = null; 
      this.success = null ;
      this.error = '';
      cartStore.clearCart();

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
        if(!response.data) {
          console.error('No user found');
          return;
        }
    
        const userId = response.data.userId;
        const userRole = response.data.userRole;
        
        return { userId, userRole };
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
