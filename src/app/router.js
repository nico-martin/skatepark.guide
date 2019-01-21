import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Park from './components/Park.vue';
import Page from './components/Page.vue';
import Account from './components/Account.vue';
import PwReset from './components/PwReset.vue';
import Home from './components/Home.vue';
import { defaultLang } from './i18n';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: `/${defaultLang}/`,
		},
		{
			path: '/:lang/',
			component: Home
		}, {
			path: '/:lang/account/password-reset/',
			component: PwReset
		}, {
			path: '/:lang/account/',
			component: Account
		}, {
			path: '/:lang/parks/:slug/',
			component: Park
		}, {
			path: '/:lang/:page/',
			component: Page
		}
	]
});