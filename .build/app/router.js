import Vue from 'vue';
import Router from 'vue-router';
import Park from './components/Park.vue';
import About from './components/About.vue';
import Home from './components/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		}, {
			path: '/about/',
			name: 'about',
			component: About
		}, {
			path: '/about/:slug',
			name: 'about',
			component: About
		}, {
			path: '/park/:slug',
			name: 'park-single',
			components: {
				park: Park
			}
		}
	]
})