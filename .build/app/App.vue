<template>
	<div class="app" id="app">
		<router-link to="/" class="controls controls--logo logo" v-html="logo"></router-link>
		<Map></Map>
		<div id="content" class="app__content" aria-hidden="true">
			<router-view></router-view>
		</div>
		<router-link to="/" class="app__overlay"></router-link>
		<div class="controls controls--menu menu" data-state="closed" id="menu">
			<button class="menu__toggler menutoggler button button--icon" v-on:click="toggleMenu">
				<span class="menutoggler__line menutoggler__line--1"></span>
				<span class="menutoggler__line menutoggler__line--2"></span>
				<span class="menutoggler__line menutoggler__line--3"></span>
			</button>
			<router-link to="/about/" class="menu__links menu__links--information button button--icon button--small" v-html="icons.information"></router-link>
			<a class="menu__links menu__links--markerplus button button--icon button--small" v-html="icons.markerplus"></a>
			<router-link to="/account/" class="menu__links menu__links--account button button--icon button--small" v-html="icons.account"></router-link>
		</div>
		<button class="controls controls--settings button button--icon" v-html="icons.settings"></button>
		<ul class="app__settings settings">
			Settings
		</ul>
	</div>
</template>

<script>
	import logo from './../icons/logo-portrait.svg';
	import icons from './modules/icons.js';
	import content from './modules/content';

	import Map from './components/Map.vue';

	export default {
		data() {
			return {
				logo,
				icons
			}
		},
		components: {
			Map
		},
		methods: {
			toggleMenu: function () {
				const $menu = document.getElementById('menu');
				const state = $menu.getAttribute('data-state');
				if (state === 'open') {
					content.hide();
				} else if (state === 'closed') {
					$menu.setAttribute('data-state', 'open');
				} else if (state === 'back') {
					this.$router.push({
						path: '/'
					});
				}
			}
		},
		mounted: function () {
			window.setTimeout(() => {
				document.getElementById("app").classList.add('app--loaded');
			}, 100);
			if (this.$router.history.current.path !== '/') {
				content.show();
			}
		}
	}
</script>