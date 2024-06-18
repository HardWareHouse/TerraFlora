import { defineStore } from 'pinia';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/'
});

const user = localStorage.getItem('user');
let initialState = {
  token: '',
  user: {
    userId: -1,
    nom: '',
    prenom: '',
    email: '',
    wantsMailChangingPrice: null,
    wantsMailNewProduct: null,
    wantsMailNewsletter: null,
    wantsMailRestockProduct: null
  }
};

if (user) {
  try {
    const parsedUser = JSON.parse(user);
    initialState = { ...initialState, token: parsedUser.token };
    instance.defaults.headers.common['Authorization'] = parsedUser.token;
  } catch (error) {
    console.error('Failed to parse user from localStorage', error);
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    ...initialState,
    status: '',
    error: '',
    success: ''
  }),
  actions: {
    async login(email, password) {
      this.status = 'loading';
      try {
        const response = await instance.post('auth/login', { email, password });
        const userData = response.data.user;

        this.token = response.data.token;
        this.user = {
          userId: userData.id,
          nom: userData.nom,
          prenom: userData.prenom,
          email: userData.email,
          wantsMailChangingPrice: userData.wantsMailChangingPrice,
          wantsMailNewProduct: userData.wantsMailNewProduct,
          wantsMailNewsletter: userData.wantsMailNewsletter,
          wantsMailRestockProduct: userData.wantsMailRestockProduct
        };

        instance.defaults.headers.common['Authorization'] = response.data.token;

        localStorage.setItem('user', JSON.stringify({
          token: this.token
        }));

        this.status = '';
        this.success = 'Login successful!';
        this.error = '';
      } catch (error) {
        console.error('Error during login:', error);
        this.status = 'error_login';
        this.error = error.response?.data?.error || 'An error occurred.';
        this.success = '';
      }
    },
    logout() {
      this.token = '';
      this.user = {
        userId: -1,
        nom: '',
        prenom: '',
        email: '',
        wantsMailChangingPrice: null,
        wantsMailNewProduct: null,
        wantsMailNewsletter: null,
        wantsMailRestockProduct: null
      };

      localStorage.removeItem('user');
      instance.defaults.headers.common['Authorization'] = '';

      this.status = '';
      this.success = '';
      this.error = '';
    },
    async getUserInfos() {
      try {
        const response = await instance.get('user/', { params: { id: this.user.userId } });
        const userData = response.data.infos;
        this.user = {
          userId: userData.id,
          nom: userData.nom,
          prenom: userData.prenom,
          email: userData.email,
          wantsMailChangingPrice: userData.wantsMailChangingPrice,
          wantsMailNewProduct: userData.wantsMailNewProduct,
          wantsMailNewsletter: userData.wantsMailNewsletter,
          wantsMailRestockProduct: userData.wantsMailRestockProduct
        };
      } catch (error) {
        console.error('Error fetching user infos:', error);
      }
    }
  }
});
