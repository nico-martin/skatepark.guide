import {Store, set, get} from 'idb-keyval';

const userSettings = new Store('skateparkguide', 'user-settings');

export const userSet = function (key, val) {
	return set(key, val, userSettings);
};

export const userGet = function (key) {
	return get(key, userSettings);
};