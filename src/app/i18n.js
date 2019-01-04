import Vue from 'vue'
import VueI18n from 'vue-i18n';
import en from './lang/en';
import de from './lang/de';
import axios from 'axios';
import router from './router';
import 'vue-cookies';

Vue.use(VueI18n);
let lang = 'en'; // default
const appLangs = ['de', 'en'];
const browserLang = window.navigator.userLanguage || window.navigator.language;
appLangs.forEach(l => {
	if (browserLang.indexOf(l) !== -1) {
		lang = l;
	}
});

const cookieLang = ($cookies.isKey('lang') ? $cookies.get('lang') : false);
if (cookieLang && appLangs.includes(cookieLang)) {
	lang = cookieLang;
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
