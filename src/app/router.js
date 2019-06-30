import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

const Park = () => import(/* webpackChunkName: "park" */'./components/Park.vue');
const Page = () => import(/* webpackChunkName: "page" */'./components/Page.vue');
const Account = () => import(/* webpackChunkName: "account" */'./components/Account.vue');
const PwReset = () => import(/* webpackChunkName: "pw" */'./components/PwReset.vue');
const Home = () => import(/* webpackChunkName: "home" */'./components/Home.vue');
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