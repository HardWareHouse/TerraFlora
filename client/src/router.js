import { createRouter, createWebHistory } from "vue-router";
import Admin from './pages/adminDashboardPage.vue'
import Home from "./pages/homePage.vue";
import Product from "./pages/productPage.vue";
import Shop from "./pages/shopPage.vue";
import Wishlist from "./pages/wishlistPage.vue";
import Dashboard from "./pages/dashboardPage.vue";
import Login from "./pages/login.vue";
import Register from "./pages/register.vue";
import notFound from "./pages/notFound.vue";
import ResetPassword from './pages/resetPassword.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admib",
    component: Admin,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'notFound', 
    component: notFound 
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "text-red-600",
});

export default router;
