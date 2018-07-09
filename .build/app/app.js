import Vue from 'vue';
import App from './App.vue';
import './modules/a11y.js'

import {store} from './store/store';

new Vue({
	el: '#app',
	store,
	render: h => h(App)
});

if (window.location.href.indexOf('.hello') !== -1) {
	document.body.classList.add('dev');
}