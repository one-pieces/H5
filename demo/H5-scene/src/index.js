import Vue from 'vue';
import VueResource from 'vue-resource';
// import VueValidator from 'vue-validator';
import Router from 'vue-router';
import { Lazyload, InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css';

// import {timeStampToCNTimeFormat} from './filter';
import App from './App.vue';
import { routeMap } from './route';

Vue.config.debug = true;

// Vue.use(VueValidator);

Vue.use(InfiniteScroll);
Vue.use(Lazyload);
Vue.use(VueResource);

Vue.http.interceptors.push({
	request(req) {
		return req;
	},
	response(res) {
		// const url = res.request.url;
		// if (/minos-webapi/.test(url) || /crete-webapi/.test(url) || /yunli/.test(url)) {
		// 	let result = res.data;
		// 	if (!result) {
		// 	return {
		// 	  code: 'unknown',
		// 	  msg: '未知异常',
		// 	  ok: false
		// 	};
		// } else {
		// 	res.code = /yunli/.test(url) ? result.status.code : result.code;
		// 	res.msg = /yunli/.test(url) ? result.status.msg : result.msg;
		// 	res.data = result.data;
		// 	if (res.code != '200') {
		// 	  res.ok = false;
		// 	}
		// 	return res;
		// }
		return res;
	}
});

// Vue.filter('timeStampToCNTimeFormat', timeStampToCNTimeFormat);

// install router
Vue.use(Router);

// routing
var router = new Router();
router.map(routeMap);

router.beforeEach(function () {
	window.scrollTo(0, 0);
});

router.start(App, '#app');