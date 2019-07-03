if (location.protocol !== 'https:') {
	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

import Vue from 'vue';
import App from './App.vue';
import './vendor/a11y.js';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';
import VueSnackbar from 'vue-snack';
import VueMatomo from 'vue-matomo';
import {isDev} from './vendor/settings';
import {getColor} from './vendor/funcs';

import Icon from "./components/globals/import/Icon.vue";
import HelloIcon from "./components/globals/import/HelloIcon.vue";
import LocalizedLink from "./components/globals/import/LocalizedLink.vue";
import LazyImage from "./components/globals/import/LazyImage.vue";
import Share from "./components/globals/import/Share.vue";

Vue.component('icon', Icon);
Vue.component('hello-icon', HelloIcon);
Vue.component('localized-link', LocalizedLink);
Vue.component('lazy-image', LazyImage);
Vue.component('share', Share);

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

import store from './store/store';
import {i18n} from './i18n';
import router from './router';

if (!isDev) {
	Vue.use(VueMatomo, {
		host: 'https://analytics.sayhello.agency/',
		siteId: 5,
		router: router,
	});
}

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

vueInstance.$cookies.config('30d');

document.body.classList.add('beta-feedback');
if (isDev) {
	document.body.classList.add('dev');
}

/**
 * PWA install
 */

window.installEvent = false;
window.addEventListener("beforeinstallprompt", e => {
	e.preventDefault();
	window.installEvent = e;
	document.body.classList.add('can-install');
});

/**
 * ServiceWorker install
 */

window.serviceWorkerEvent = false;
if ("serviceWorker" in navigator && !isDev) {
//if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/service-worker.js")
		.then(reg => {
			window.serviceWorkerEvent = reg;
			reg.onupdatefound = function () {
				const installing = reg.installing;
				installing.onstatechange = function () {
					if (installing.state === 'installed' && !navigator.serviceWorker.controller) {
						vueInstance.$snack.success({
							text: vueInstance.$t("pwa_installed"),
							button: "OK"
						});
					}
				}
			};
		})
		.catch(registrationError => {
			console.log("SW registration failed: ", registrationError);
		});
}
