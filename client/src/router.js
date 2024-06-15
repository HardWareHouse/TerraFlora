import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/homePage.vue";
import Product from "./pages/productPage.vue";
import Shop from "./pages/shopPage.vue";
import Wishlist from "./pages/wishlistPage.vue";
import Dashboard from "./pages/dashboardPage.vue";
import loginRegister from "./pages/loginRegister.vue";
import notFound from "./pages/notFound.vue";
import Checkout from "./pages/checkoutPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/loginRegister",
    name: "loginRegister",
    component: loginRegister,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: notFound,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "text-red-600",
});

export default router;
