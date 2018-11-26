import Vue from 'vue';
import App from './App.vue';
import './modules/a11y.js'

import {store} from './store/store';
import router from './router';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.lazyClass = 'lazyimage__image--lazyload';
window.lazySizesConfig.loadingClass = 'lazyimage__image--lazyloading';
window.lazySizesConfig.loadedClass = 'lazyimage__image--lazyloaded';
import 'lazysizes';

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

if (window.location.href.indexOf('.hello') !== -1) {
	document.body.classList.add('dev');
}