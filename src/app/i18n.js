import Vue from 'vue'
import VueI18n from 'vue-i18n';
import de from './../../build/tmp/de.json';
import axios from 'axios';
import router from './router';
import 'vue-cookies';

import {api} from "./vendor/settings";
import {storeDB} from "./store/storeDB";

Vue.use(VueI18n);

const fallback = 'de';
export const i18nDefault = fallback;
export const i18n = new VueI18n({
	locale: fallback,
	fallbackLocale: fallback,
	messages: {de}
});

storeDB.translations.set(fallback, de);

export const i18nGetLang = function () {

	const pathElements = window.location.pathname.split('/');
	if (pathElements.length >= 3) {
		return pathElements[1];
	}

	const cookieLang = ($cookies.isKey('lang') ? $cookies.get('lang') : false);
	if (cookieLang) {
		return cookieLang;
	}

	const userLang = navigator.language || navigator.userLanguage;
	if (userLang) {
		return userLang.split('-')[0];
	}

	return fallback;
};

export const i18nSetLang = async function (lang = false) {
	if (!lang) {
		lang = i18nGetLang();
	}

	let apiSet = false;

	axios
		.get(`${api.lang}/${lang}/`)
		.then(response => {
			const msgs = response.data;
			storeDB.translations.set(lang, msgs);
			apiSet = true;
			setLang(lang, msgs);
		});

	storeDB.translations.get(lang).then(msgs => {
		if (!apiSet) {
			setLang(lang, msgs);
		}
	});
};

function setLang(lang, msgs) {
	i18n.setLocaleMessage(lang, msgs);

	/**
	 * Set Lang
	 */
	i18n.locale = lang;
	axios.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	$cookies.set('lang', lang);

	/**
	 * Push
	 */
	let pushPath = false;
	const currentRoute = router.currentRoute;

	if (currentRoute.fullPath === '/') {
		pushPath = `${currentRoute.fullPath}${i18n.locale}/`;
	} else if (i18n.locale !== currentRoute.params.locale) {
		pushPath = currentRoute.fullPath.replace(`/${currentRoute.params.locale}/`, `/${i18n.locale}/`);
	}

	if (pushPath) {
		router.push(pushPath);
	}
	return lang;
}
