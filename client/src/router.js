import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/homePage.vue";
import Product from "./pages/productPage.vue";
import Shop from "./pages/shopPage.vue";
import Dashboard from "./pages/dashboardPage.vue";

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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
