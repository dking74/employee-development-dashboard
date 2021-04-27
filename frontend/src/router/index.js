import Vue from 'vue'
import VueRouter from 'vue-router'

import { authGuard } from '../auth/authGuard';
import { getInstance } from '../auth';

import Home from '../views/Home.vue'

/** Achievement routes */
import Achievements from '../views/achievements/Achievements.vue';
import AddAchievement from '../views/achievements/Add-Achievement.vue';
import EditAchievement from '../views/achievements/Edit-Achievement.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  /** Achievement routes */
  {
    path: '/my-career/achievements',
    name: 'Achievements',
    component: Achievements
  },
  {
    path: '/my-career/achievements/add',
    name: 'Add-Achievement',
    component: AddAchievement
  },
  {
    path: '/my-career/achievements/edit/:achievementId',
    name: 'Edit-Achievement',
    component: EditAchievement
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
