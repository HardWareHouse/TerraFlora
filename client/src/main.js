import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { useCartStore } from './pinia/cart';
import './style.css';

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');

const cartStore = useCartStore();
cartStore.loadCartFromLocalStorage();
