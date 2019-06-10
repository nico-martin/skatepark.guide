<template>
	<div class="app" id="app">
		<localized-link
			to="/"
			class="controls controls--logo logo"
			v-html="logo"
		></localized-link>
		<textarea>{langVal}</textarea>
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
			<localized-link
				to="/"
				class="menu__links menu__links--information button button--icon button--small"
			>
				<icon icon="information"></icon>
			</localized-link>
			<button
				@click="newPark()"
				class="menu__links menu__links--markerplus button button--icon button--small"
			>
				<icon icon="markerplus"></icon>
			</button>
			<localized-link
				to="/account/"
				class="menu__links menu__links--account button button--icon button--small"
			>
				<icon icon="account"></icon>
			</localized-link>
		</div>
		<button class="controls controls--settings button button--icon" @click="toggleSettings();">
			<icon icon="close"></icon>
			<icon icon="settings"></icon>
		</button>
		<p>
			<Settings class="app__settings settings" aria-hidden="true"></Settings>
		</p>
	</div>
</template>

<script>
	import logo from "./../icons/logo-portrait.svg";
	import content from "./modules/content";
	import Map from "./components/Map.vue";
	import Favorites from "./components/Favorites.vue";
	import Settings from "./components/Settings.vue";
	import ServiceWorker from "./modules/serviceworker";
	import {isDev} from "./modules/settings";
	import {setI18nLanguage} from "./i18n";
	import {settingsDB} from "./store/storeDB.js";

	import lang from './lang/de.js';

	export default {
		data() {
			const langString = [];
			Object.keys(lang).forEach(key => {
				const val = lang[key];
				if (typeof val === 'object') {
					Object.keys(val).forEach(subKey => {
						const subVal = val[subKey];
						if (typeof subVal === 'object') {
							Object.keys(subVal).forEach(subSubKey => {
								langString.push(`${key}_${subKey}_${subSubKey},${subVal[subSubKey]}`);
							});
						} else {
							langString.push(`${key}_${subKey},${val[subKey]}`);
						}
					});
				} else {
					langString.push(`${key},${lang[key]}`);
				}
			});

			return {
				logo,
				online: navigator.onLine,
				langVal: lang.join("\n")
			};
		},
		metaInfo() {
			return {
				title: false,
				titleTemplate: title => {
					return title
						? `${title} 💗 Skatepark.guide`
						: "Skatepark.guide";
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
				const $menu = document.getElementById("menu");
				const state = $menu.getAttribute("data-state");
				if (state === "open") {
					content.hide();
				} else if (state === "closed") {
					$menu.setAttribute("data-state", "open");
				} else if (state === "back") {
					this.$router.push({
						path: `/${this.$i18n.locale}/`
					});
				}
			},
			toggleSettings() {
				const $settings = this.$el.querySelector(".app__settings");
				const $button = this.$el.querySelector(".controls--settings");
				const hide = $settings.getAttribute("aria-hidden") === "false";
				$settings.setAttribute("aria-hidden", hide ? "true" : "false");
				$button.setAttribute("data-close", hide ? "false" : "true");
			},
			newPark: function () {
				this.$snack.danger({
					text: this.$t("comingsoon"),
					button: "OK"
				});
			}
		},
		mounted() {
			window.setTimeout(() => {
				document.getElementById("app").classList.add("app--loaded");
			}, 100);

			setI18nLanguage();
			if (this.$router.history.current.path !== `/${this.$i18n.locale}/`) {
				content.show();
			}

			if (!isDev) {
				ServiceWorker().then(controller => {
					if (controller) {
						console.log("New content is available.");
					} else {
						this.$snack.success({
							text: this.$t("pwa.installed"),
							button: "OK"
						});
					}
				});
			}
		},
		created() {
			window.addEventListener("online", () => {
				this.online = true;
			});
			settingsDB.get("user").then(user => {
				if (user) {
					this.$store.commit("SET_USER", user);
				}
			});
		}
	};
</script>