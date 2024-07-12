import axios from 'axios';
import { useAuthStore } from './pinia/auth';
import router from './router';

export const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') || null,
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    
    if (error.response && error.response.status === 401 && error.response.data.code === 'token_expired') {
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

    return Promise.reject(error);
  }
);

export default instance;
