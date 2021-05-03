import Vue from 'vue'
import VueRouter from 'vue-router'

import { authGuard } from '../auth/authGuard';
import { getInstance } from '../auth';

import Home from '../views/Home.vue'

/** Achievement routes */
import Achievements from '../views/achievements/Achievements.vue';
import AddAchievement from '../views/achievements/Add-Achievement.vue';
import EditAchievement from '../views/achievements/Edit-Achievement.vue';

/** Goal routes */
import Goals from '../views/goals/Goals.vue';
import AddGoal from '../views/goals/Add-Goal.vue';
import EditGoal from '../views/goals/Edit-Goal.vue';

/** Certification routes */
import Certifications from '../views/certifications/Certifications.vue';
import AddCertification from '../views/certifications/Add-Certification.vue';
import EditCertification from '../views/certifications/Edit-Certification.vue';

/** Event routes */
import Events from '../views/events/Events.vue';
import ViewEvent from '../views/events/View-Event.vue';

/** Training routes */
import Training from '../views/training/Training.vue';
import SearchTraining from '../views/training/Search-Training.vue';


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

  /** Goals routes */
  {
    path: '/my-career/goals',
    name: 'Goals',
    component: Goals
  },
  {
    path: '/my-career/goals/add',
    name: 'Add-Goal',
    component: AddGoal
  },
  {
    path: '/my-career/goals/edit/:goalId',
    name: 'Edit-Goal',
    component: EditGoal
  },

  /** Certification routes */
  {
    path: '/my-career/certifications',
    name: 'Certifications',
    component: Certifications
  },
  {
    path: '/my-career/certifications/add',
    name: 'Add-Certification',
    component: AddCertification
  },
  {
    path: '/my-career/certifications/edit/:certificationId',
    name: 'Edit-Certification',
    component: EditCertification
  },
  
  /** Event routes */
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/view/:eventId',
    name: 'View-Event',
    component: ViewEvent
  },

  /** Training routes */
  {
    path: '/learning',
    name: 'Training',
    component: Training
  },
  {
    path: '/learning/search',
    name: 'Search-Training',
    component: SearchTraining
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
