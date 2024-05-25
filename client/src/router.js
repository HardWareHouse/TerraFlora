import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/homePage.vue'; 

const routes = [
  { path: '/', component: Home },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
