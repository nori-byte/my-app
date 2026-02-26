import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    // beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/Catalog.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue'),
    beforeEnter: ifAuthenticated,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
