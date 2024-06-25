import { createRouter, createWebHistory } from "vue-router";
import Admin from "./pages/adminDashboardPage.vue";
import Home from "./pages/homePage.vue";
import Shop from "./pages/shopPage.vue";
import Wishlist from "./pages/wishlistPage.vue";
import Dashboard from "./pages/dashboardPage.vue";
import Basket from "./pages/basketPage.vue";
import Login from "./pages/login.vue";
import Register from "./pages/register.vue";
import notFound from "./pages/notFound.vue";
import ResetPassword from "./pages/resetPassword.vue";
import ProductDetail from "./pages/productDetail.vue";
import Checkout from "./pages/checkoutPage.vue";
import CGU from "../public/rgpd/cgu.vue";
import Politique from "../public/rgpd/politique_confidentialite.vue";
import Mentions from "../public/rgpd/mentions.vue";
import Contact from "./pages/contactPage.vue";
import ManageProducts from "./pages/manageProducts.vue";

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
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: '/manage-products',
    name: 'ManageProducts',
    component: ManageProducts,
    meta: { requiresAuth: true, roles: ['ROLE_ADMIN', 'ROLE_STORE_KEEPER'] }
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
    path: "/basket",
    name: "Basket",
    component: Basket,
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
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "text-red-600",
});

export default router;
