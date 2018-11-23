import {Store, set, get} from 'idb-keyval';

const userSettingsStore = new Store('skateparkguide', 'user-settings');

export default {
	set: function (key, val) {
		return set(key, val, userSettingsStore);
	},
	get: function (key) {
		return get(key, userSettingsStore);
	}
};