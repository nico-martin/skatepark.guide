import {Store, set, get} from 'idb-keyval';

const db = 'skateparkguide';
const userSettingsStore = new Store(db, 'user-settings');
export const userSettings = {
	set: function (key, val) {
		return set(key, val, userSettingsStore);
	},
	get: function (key) {
		return get(key, userSettingsStore);
	}
};

const pagesStore = new Store(`${db}-pages`, 'pages');
export const pages = {
	set: function (key, val) {
		return set(key, val, pagesStore);
	},
	get: function (key) {
		return get(key, pagesStore);
	}
};

const parksStore = new Store(`${db}-parks`, 'parks');
export const parks = {
	set: function (key, val) {
		return set(key, val, parksStore);
	},
	get: function (key) {
		return get(key, parksStore);
	}
};