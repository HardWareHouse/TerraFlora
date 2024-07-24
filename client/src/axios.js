import axios from 'axios';
import { useAuthStore } from './pinia/auth';
import router from './router';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorResponseDataCode = ['token_expired', 'account_blocked', 'account_not_verified', 'invalid_token'];

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      if (error.response.status === 401 || errorResponseDataCode.includes(error.response.data.code)) {
        const authStore = useAuthStore();

        if (authStore.token) {
          try {
            await authStore.logout();
            router.push({ name: 'login' });
          } catch (err) {
            console.error('Error while logging out:', err);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
