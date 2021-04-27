import Vue from 'vue';
import IdleVue from 'idle-vue';
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router';
import store from './store';
import { Auth0Plugin } from "./auth";
import { domain, clientId, /*audience*/ } from "../auth_config.json";

import App from './App.vue';

import './app.scss';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

Vue.config.productionTip = false;

// Enable Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
