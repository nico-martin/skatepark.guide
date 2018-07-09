<template>
	<div class="app" id="app">
		<Map></Map>
		<div class="app__controls controls">
			<a class="controls__logo logo" v-html="logo"></a>
			<div class="controls__menu menu" data-state="closed" id="menu">
				<button class="menu__toggler menutoggler button button--icon" v-on:click="toggleMenu">
					<span class="menutoggler__line menutoggler__line--1"></span>
					<span class="menutoggler__line menutoggler__line--2"></span>
					<span class="menutoggler__line menutoggler__line--3"></span>
				</button>
				<a class="menu__links menu__links--information button button--icon button--small" v-html="icons.information" v-on:click="togglePage"></a>
				<a class="menu__links menu__links--markerplus button button--icon button--small" v-html="icons.markerplus" v-on:click="togglePage"></a>
				<a class="menu__links menu__links--account button button--icon button--small" v-html="icons.account" v-on:click="togglePage"></a>
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
					$menu.setAttribute('data-state', 'closed');
				} else if (state === 'closed') {
					$menu.setAttribute('data-state', 'open');
				} else if (state === 'back') {
					console.log('back to map');
					$menu.setAttribute('data-state', 'closed');
				}
			},
			togglePage: function () {
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