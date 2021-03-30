import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import { authGuard } from '../auth/authGuard';
import { getInstance } from '../auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/logout',
    /* eslint-disable no-unused-vars */
    beforeEnter: (to, from, next) => {
      const authService = getInstance();
      if (authService) authService.logout();
      else next();
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(authGuard);

export default router;
