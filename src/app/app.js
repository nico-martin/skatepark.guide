import Vue from 'vue';
import App from './App.vue';
import './modules/a11y.js';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';
import VueSnackbar from 'vue-snack';
import { c, IsDev } from './modules/settings';

Vue.use(VueI18n);
Vue.use(VueCookies);
Vue.use(VueSnackbar, {
	methods: [
		{
			name: 'danger',
			color: c('primary')
		},
		{
			name: 'success',
			color: c('secondary', 'light')
		}
	]
});

import { store } from './store/store';
import router from './router';
import { i18n } from './i18n';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.lazyClass = 'lazyimage__image--lazyload';
window.lazySizesConfig.loadingClass = 'lazyimage__image--lazyloading';
window.lazySizesConfig.loadedClass = 'lazyimage__image--lazyloaded';
import 'lazysizes';

new Vue({
	i18n,
	el: '#app',
	router,
	store,
	render: h => h(App)
});

if (IsDev) {
	document.body.classList.add('dev');
}