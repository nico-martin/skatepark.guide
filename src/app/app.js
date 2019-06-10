import Vue from 'vue';
import App from './App.vue';
import './modules/a11y.js';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';
import VueSnackbar from 'vue-snack';
import VueMatomo from 'vue-matomo';
import {isDev} from './modules/settings';
import {getColor} from './modules/funcs';

import Icon from "./components/globals/Icon.vue";
import LocalizedLink from "./components/globals/LocalizedLink.vue";

Vue.component('icon', Icon);
Vue.component('localized-link', LocalizedLink);

Vue.use(VueI18n);
Vue.use(VueCookies);
Vue.use(VueSnackbar, {
	methods: [
		{
			name: 'danger',
			color: getColor('primary')
		},
		{
			name: 'success',
			color: getColor('secondary', 'light')
		}
	]
});

import router from './router';

if (!isDev) {
	Vue.use(VueMatomo, {
		host: 'https://analytics.sayhello.agency/',
		siteId: 5,
		router: router,
	});
}

import {store} from './store/store';
import {i18n} from './i18n';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.lazyClass = 'lazyimage__image--lazyload';
window.lazySizesConfig.loadingClass = 'lazyimage__image--lazyloading';
window.lazySizesConfig.loadedClass = 'lazyimage__image--lazyloaded';
import 'lazysizes';

window.installEvent = false;
window.addEventListener("beforeinstallprompt", e => {
	e.preventDefault();
	window.installEvent = e;
	document.body.classList.add('can-install');
});

export const vueInstance = new Vue({
	i18n,
	el: '#app',
	router,
	store,
	render: h => h(App)
});

if (isDev) {
	document.body.classList.add('dev');
}

window.routerBackHome = function () {
	vueInstance.$router.push({
		path: `/${vueInstance.$i18n.locale}/`
	});
};
