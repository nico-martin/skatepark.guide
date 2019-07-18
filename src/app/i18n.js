import Vue from 'vue'
import VueI18n from 'vue-i18n';
import de from './../../build/tmp/de.json';
import axios from 'axios';
import router from './router';

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

export const i18nGetLang = async function () {

	const pathElements = window.location.pathname.split('/');
	if (pathElements.length >= 3) {
		return pathElements[1];
	}

	let newLang = fallback;
	const browserLang = navigator.language || navigator.userLanguage;
	if (browserLang) {
		newLang = browserLang.split('-')[0];
	}
	const storeLang = await storeDB.settings.get('lang');
	if (storeLang) {
		newLang = storeLang;
	}

	return newLang;
};

export const i18nSetLang = async function (lang = false) {
	if (!lang) {
		lang = await i18nGetLang();
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
	storeDB.settings.set('lang', lang);

	/**
	 * Push
	 */

	const currentRoute = router.currentRoute;
	if (currentRoute.fullPath === '/') {
		return lang;
	}

	let pushPath = false;
	if (i18n.locale !== currentRoute.params.locale) {
		pushPath = currentRoute.fullPath.replace(`/${currentRoute.params.locale}/`, `/${i18n.locale}/`);
	}

	if (pushPath) {
		router.push(pushPath);
	}

	return lang;
}
