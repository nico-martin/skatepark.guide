import Vue from 'vue'
import VueI18n from 'vue-i18n';
import en from './lang/en';
import de from './lang/de';
import axios from 'axios';
import './router';
import 'vue-cookies';

Vue.use(VueI18n);

let lang = ($cookies.isKey('lang') ? $cookies.get('lang') : 'en');
if (!['de', 'en'].includes(lang)) {
	lang = 'en';
	$cookies.set('lang', lang);
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

function setI18nLanguage(lang) {
	i18n.locale = lang;
	axios.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	$cookies.set('lang', lang);
	return lang;
}
