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
			<router-link to="/about/" class="menu__links menu__links--information button button--icon button--small">
				<Icon icon="information"></Icon>
			</router-link>
			<a class="menu__links menu__links--markerplus button button--icon button--small">
				<Icon icon="markerplus"></Icon>
			</a>
			<router-link to="/account/" class="menu__links menu__links--account button button--icon button--small">
				<Icon icon="account"></Icon>
			</router-link>
		</div>
		<button class="controls controls--settings button button--icon">
			<Icon icon="settings"></Icon>
		</button>
		<ul class="app__settings settings">
			Settings
		</ul>
	</div>
</template>

<script>
	import logo from './../icons/logo-portrait.svg';
	import content from './modules/content';

	import Map from './components/Map.vue';
	import Icon from './components/globals/Icon.vue';

	export default {
		data() {
			return {
				logo,
			}
		},
		metaInfo: function () {
			return {
				title: false,
				titleTemplate: (title) => {
					return title ? `${title} 💗 Skatepark.guide` : 'Skatepark.guide';
				}
			};
		},
		components: {
			Map,
			Icon
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