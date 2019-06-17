import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Park from './components/Park.vue';
import Page from './components/Page.vue';
import Account from './components/Account.vue';
import PwReset from './components/PwReset.vue';
import Home from './components/Home.vue';
import {vueInstance} from './app';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/:locale/',
			component: Home
		}, {
			path: '/:locale/account/password-reset/',
			component: PwReset
		}, {
			path: '/:locale/account/password-reset/:pwresetkey/',
			component: PwReset
		}, {
			path: '/:locale/account/',
			component: Account
		}, {
			path: '/:locale/parks/:slug/',
			component: Park
		}, {
			path: '/:locale/:page/',
			component: Page
		}
	]
});

window.routerBackHome = function () {
	vueInstance.$router.push({
		path: `/${vueInstance.$i18n.locale}/`
	});
};