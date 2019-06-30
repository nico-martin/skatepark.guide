<template>
	<div class="app" id="app">
		<localized-link to="/" class="controls controls--logo logo">
			<icon icon="logo-portrait"></icon>
		</localized-link>
		<Map v-if="online"></Map>
		<Favorites v-else></Favorites>
		<div id="content" class="app__content" aria-hidden="true">
			<router-view></router-view>
		</div>
		<localized-link to="/" class="app__overlay"></localized-link>
		<div class="controls controls--menu menu" data-state="closed" id="menu">
			<button class="menu__toggler menutoggler button button--icon" v-on:click="toggleMenu">
				<span class="menutoggler__line menutoggler__line--1"></span>
				<span class="menutoggler__line menutoggler__line--2"></span>
				<span class="menutoggler__line menutoggler__line--3"></span>
			</button>
			<localized-link to="/about/" class="menu__links menu__links--information button button--icon button--small">
				<hello-icon icon="information"></hello-icon>
			</localized-link>
			<button @click="newPark()" class="menu__links menu__links--markerplus button button--icon button--small">
				<hello-icon icon="markerplus"></hello-icon>
			</button>
			<localized-link to="/account/" class="menu__links menu__links--account button button--icon button--small">
				<hello-icon icon="account"></hello-icon>
			</localized-link>
		</div>
		<button class="controls controls--settings button button--icon" @click="toggleSettings()">
			<hello-icon icon="close"></hello-icon>
			<hello-icon icon="settings"></hello-icon>
		</button>
		<Settings class="app__settings settings" aria-hidden="true"></Settings>
	</div>
</template>

<script>
	import content from './vendor/content';
	import Map from './components/Map.vue';
	import Favorites from './components/Favorites.vue';
	import {i18nSetLang} from './i18n';
	import {settingsDB} from './store/storeDB.js';

	const Settings = () => import(/* webpackChunkName: "settings" */ './components/Settings.vue');

	export default {
		data() {
			return {
				online: navigator.onLine
			};
		},
		metaInfo() {
			return {
				title: false,
				titleTemplate: title => {
					return title
						? `${title} 💗 Skatepark.guide`
						: 'Skatepark.guide';
				}
			};
		},
		components: {
			Map,
			Settings,
			Favorites
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
						path: `/${this.$i18n.locale}/`
					});
				}
			},
			toggleSettings() {
				const $settings = this.$el.querySelector('.app__settings');
				const $button = this.$el.querySelector('.controls--settings');
				const hide = $settings.getAttribute('aria-hidden') === 'false';
				$settings.setAttribute('aria-hidden', hide ? 'true' : 'false');
				$button.setAttribute('data-close', hide ? 'false' : 'true');
			},
			newPark: function () {
				this.$snack.danger({
					text: this.$t('comingsoon'),
					button: 'OK'
				});
			}
		},
		mounted() {
			window.setTimeout(() => {
				document.getElementById('app').classList.add('app--loaded');
			}, 100);

			i18nSetLang();
		},
		created() {
			window.addEventListener('online', () => {
				this.online = true;
			});
			settingsDB.get('user').then(user => {
				if (user) {
					this.$store.commit('SET_USER', user);
				}
			});
		}
	};
</script>