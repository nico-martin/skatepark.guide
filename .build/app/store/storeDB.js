//import {Store, set, get} from 'idb-keyval';
import idb from 'idb';

const db = 'skatepark.guide';
const dbVersion = 1;
const stores = [
	'user-settings',
	'pages',
	'parks'
];

const Store = idb.open(db, dbVersion, upgradeDB => {
	stores.forEach((store) => {
		upgradeDB.createObjectStore(store);
	});
});

export const userSettings = {
	set: function (key, val) {
		return Store.then(db => {
			const tx = db.transaction('user-settings', 'readwrite');
			tx.objectStore('user-settings').put(val, key);
			return tx.complete;
		});
	},
	get: function (key) {
		return Store.then(db => {
			return db.transaction('user-settings')
				.objectStore('user-settings').get(key);
		});
	}
};

export const pages = {
	set: function (key, val) {
		return Store.then(db => {
			const tx = db.transaction('pages', 'readwrite');
			tx.objectStore('pages').put(val, key);
			return tx.complete;
		});
	},
	get: function (key) {
		return Store.then(db => {
			return db.transaction('pages')
				.objectStore('pages').get(key);
		});
	}
};

export const parks = {
	set: function (key, val) {
		return Store.then(db => {
			const tx = db.transaction('parks', 'readwrite');
			tx.objectStore('parks').put(val, key);
			return tx.complete;
		});
	},
	get: function (key) {
		return Store.then(db => {
			return db.transaction('parks')
				.objectStore('parks').get(key);
		});
	}
};