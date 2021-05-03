require('dotenv').config();

import Vue from 'vue';

import IdleVue from 'idle-vue';
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';
import VuePlyr from 'vue-plyr';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router';
import store from './store';
import { Auth0Plugin } from './auth';
import { formatDate } from './utils';

import { domain, clientId } from '../auth_config.json';

import App from './App.vue';

// Css imports
import './app.scss';
import 'vue-plyr/dist/vue-plyr.css';

Vue.config.productionTip = false;

// Enable Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);

// To be able to track video within applicaiton
Vue.use(VuePlyr, {
  hideYouTubeDOMError: true
});

// Use Fontawesome for extra icon
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Auth0 Plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  /* audience, */
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

// IdleVue Plugin
Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  store,
  idleTime: 900000, // 15 minutes
  startAtIdle: false
});

// Add directive to be able to format a date value
Vue.filter('formatDate', formatDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
