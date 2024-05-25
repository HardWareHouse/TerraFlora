import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/homePage.vue'; 
import Shop from './pages/shopPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
