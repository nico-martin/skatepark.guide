import Vue from 'vue';
import Router from 'vue-router';
import Park from './components/Park.vue';
import Page from './components/Page.vue';
import Account from './components/Account.vue';
import Home from './components/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		}, {
			path: '/account/',
			component: Account
		}, {
			path: '/parks/:slug/',
			component: Park
		}, {
			path: '/:page/',
			component: Page
		}
	]
})