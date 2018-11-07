<template>
	<div class="app" id="app">
		<Map></Map>
		<div class="app__about about">
			<nav class="about__navigation">
				<router-link to="/about" class="about__link">About</router-link>
				<router-link to="/about/impressum" class="about__link">Impressum</router-link>
				<router-link to="/about/privacy" class="about__link">Privacy</router-link>
				<router-link to="/park/test" class="about__link">Park</router-link>
			</nav>
			<div class="about__content">
				<router-view></router-view>
			</div>
		</div>
		<div class="app__park">
			<router-view name="park"></router-view>
		</div>
		<router-link to="/" class="app__overlay"></router-link>
		<div class="app__controls controls">
			<router-link to="/" class="controls__logo logo" v-html="logo"></router-link>
			<div class="controls__menu menu" data-state="closed" id="menu">
				<button class="menu__toggler menutoggler button button--icon" v-on:click="toggleMenu">
					<span class="menutoggler__line menutoggler__line--1"></span>
					<span class="menutoggler__line menutoggler__line--2"></span>
					<span class="menutoggler__line menutoggler__line--3"></span>
				</button>
				<router-link to="/about" class="menu__links menu__links--information button button--icon button--small" v-html="icons.information"></router-link>
				<a class="menu__links menu__links--markerplus button button--icon button--small" v-html="icons.markerplus"></a>
				<router-link to="/profile" class="menu__links menu__links--account button button--icon button--small" v-html="icons.account"></router-link>
			</div>
			<button class="controls__settings button button--icon" v-html="icons.settings"></button>
		</div>
		<ul class="app__settings settings">
			Settings
		</ul>
	</div>
</template>

<script>
	import logo from './../icons/logo-portrait.svg';
	import icons from './modules/icons.js';
	import overlay from './modules/overlay';

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
					overlay.hide();
					$menu.setAttribute('data-state', 'closed');
				} else if (state === 'closed') {
					$menu.setAttribute('data-state', 'open');
				} else if (state === 'back') {
					overlay.hide();
					this.$router.push({
						path: '/'
					});
					$menu.setAttribute('data-state', 'closed');
				}
			},
			openPage: function () {
				overlay.show();
				const $menu = document.getElementById('menu');
				$menu.setAttribute('data-state', 'back');
			}
		},
		mounted: function () {
			window.setTimeout(() => {
				document.getElementById("app").classList.add('app--loaded');
			}, 100);
		}
	}
</script>