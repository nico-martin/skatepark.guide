import Vue from 'vue'
import VueI18n from 'vue-i18n';
import en from './lang/en';
import de from './lang/de';
import axios from 'axios';
import router from './router';
import 'vue-cookies';

Vue.use(VueI18n);

let lang = ($cookies.isKey('lang') ? $cookies.get('lang') : 'en');
if (!['de', 'en'].includes(lang)) {
	lang = 'en';
}

export const defaultLang = lang;
export const i18n = new VueI18n({
	locale: defaultLang,
	fallbackLocale: defaultLang,
	messages: {
		de,
		en
	}
});

export const setI18nLanguage = function (lang = defaultLang) {
	i18n.locale = lang;
	axios.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	$cookies.set('lang', lang);
	const currentRoute = router.currentRoute;
	if (i18n.locale !== currentRoute.params.lang) {
		const path = router.currentRoute.fullPath.replace(`/${currentRoute.params.lang}/`, `/${i18n.locale}/`);
		router.push(path);
	}
	return lang;
};
