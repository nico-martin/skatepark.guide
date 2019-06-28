import {openDB, deleteDB, wrap, unwrap} from 'idb';

const dbName = 'skatepark.guide';
const dbVersion = 3;
const dbStores = [
	'settings',
	'pages',
	'parks',
	'loved',
	'translations'
];
const idbPromise = openDB(dbName, dbVersion, {
	upgrade(db) {
		dbStores.forEach(store => {
			db.createObjectStore(store);
		});
	}
});

const exp = {};
dbStores.forEach(store => {
	exp[store] = {
		async get(key) {
			return (await idbPromise).get(store, key);
		},
		async set(key, val) {
			return (await idbPromise).put(store, val, key);
		},
		async delete(key) {
			return (await idbPromise).delete(store, key);
		},
		async clear() {
			return (await idbPromise).clear(store);
		},
		async getAll() {
			return (await idbPromise).getAll(store);
		},
		async keys() {
			return (await idbPromise).getAllKeys(store);
		}
	};
});

export const storeDB = exp;

export const settingsDB = exp['settings'];
export const pagesDB = exp['pages'];
export const parksDB = exp['parks'];
export const lovedDB = exp['loved'];