import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './style.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const pinia = createPinia();

const app = createApp(App);

const toastOptions = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};
AOS.init();

app.use(router);
app.use(pinia);
app.use(AOS);
app.use(Toast, toastOptions);

app.mount('#app');
