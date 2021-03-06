import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routeConfig from './route';
// import { Lazyload } from 'mint-ui';

// Vue.use(Lazyload);
Vue.use(VueRouter);

var router = new VueRouter();
router.map(routeConfig);

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

router.start(App, '#app');

