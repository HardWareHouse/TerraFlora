import axios from 'axios';
import { useAuthStore } from './pinia/auth';
import router from './router';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      if (error.response.status === 401 && error.response.data.code === 'token_expired') {
        const authStore = useAuthStore();

        if (authStore.token) {
          try {
            await authStore.logout();
            router.push({ name: 'login' });
          } catch (err) {
            console.error('Error while logging out:', err);
          }
        }
      } else if (error.response.status === 401) {
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
