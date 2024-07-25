import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./pinia/auth.js";
import { useCartStore } from "./pinia/cart.js";
import Admin from "./pages/adminDashboardPage.vue";
import Comptable from "./pages/comptablePage.vue";
import Home from "./pages/homePage.vue";
import Shop from "./pages/shopPage.vue";
import Dashboard from "./pages/dashboardPage.vue";
import Basket from "./pages/basketPage.vue";
import Login from "./pages/login.vue";
import Register from "./pages/register.vue";
import notFound from "./pages/notFound.vue";
import ResetPassword from "./pages/resetPassword.vue";
import ProductDetail from "./pages/productDetail.vue";
import OrderDetail from "./pages/orderDetail.vue";
import Checkout from "./pages/checkoutPage.vue";
import CGU from "./pages/rgpd/cgu.vue";
import Politique from "./pages/rgpd/politique_confidentialite.vue";
import Mentions from "./pages/rgpd/mentions.vue";
import Contact from "./pages/contactPage.vue";
import ManageProducts from "./pages/manageProducts.vue";
import success from "./components/stripePayment/success.vue";
import Cancel from "./components/stripePayment/cancel.vue";
import AllPayments from "./components/stripePayment/allPayments.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] },
  },
  {
    path: "/comptable",
    name: "Comptable",
    component: Comptable, 
    meta: { requiresAuth: true, roles: ["ROLE_COMPTABLE"] },
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/product/:name",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/orders/:id",
    name: "OrderDetail",
    component: OrderDetail,
    meta: { requiresAuth: true, roles: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_COMPTABLE"] },
  },
  {
    path: "/manage-products",
    name: "ManageProducts",
    component: ManageProducts,
    meta: { requiresAuth: true, roles: ["ROLE_ADMIN", "ROLE_STORE_KEEPER"] },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
    meta: { requiresAuth: true },
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
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: notFound,
  },
  {
    // Interface non reliée au back
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/mentions",
    name: "Mentions",
    component: Mentions,
  },
  {
    path: "/cgu",
    name: "CGU",
    component: CGU,
  },
  {
    path: "/confidentialite",
    name: "Politique",
    component: Politique,
  },
  {
    // Interface non reliée au back
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/stripe",
    name: "Stripe",
    component: AllPayments,
    meta: { requiresAuth: true, roles: ["ROLE_ADMIN", "ROLE_COMPTABLE"] },
  },
  {
    path: "/success",
    name: "Success",
    component: success,
    meta: { requiresAuth: true, roles: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_COMPTABLE"] },
  },
  {
    path: "/cancel",
    name: "Cancel",
    component: Cancel,
    meta: { requiresAuth: true, roles: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_COMPTABLE"] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "text-red-600",
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  try {
    await authStore.checkToken();
    if (authStore.isLoggedIn) {
      await cartStore.fetchUserCart();
    }

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      authStore.clearUserData();
      return next({ name: "login" });
    }
    
    if (to.meta.requiresAuth && to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      return next({ name: 'Home' });
    }

    if (to.name === "Dashboard" && authStore.role === "ROLE_ADMIN") {
      return next({ name: "Admin" });
    }

    next();
  } catch (error) {
    console.error('An error occurred during navigation guard:', error);
    next(false);
  }
});

export default router;
