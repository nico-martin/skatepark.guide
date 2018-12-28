import idb from 'idb';

const db = 'skatepark.guide';
const dbVersion = 1;
const stores = [
	'settings',
	'pages',
	'parks'
];

const Store = idb.open(db, dbVersion, upgradeDB => {
	stores.forEach((store) => {
		upgradeDB.createObjectStore(store);
	});
});

const exp = {};
stores.forEach((store) => {
	exp[store] = {
		set: function (key, val) {
			return Store.then(db => {
				const tx = db.transaction(store, 'readwrite');
				tx.objectStore(store).put(val, key);
				return tx.complete;
			});
		},
		get: function (key) {
			return Store.then(db => {
				return db.transaction(store)
					.objectStore(store).get(key);
			});
		}
	};
});

export const settingsDB = exp['settings'];
export const pagesDB = exp['pages'];
export const parksDB = exp['parks'];