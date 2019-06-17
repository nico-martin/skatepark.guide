/*
import idb from 'idb';

const db = 'skatepark.guide';
const dbVersion = 1;
*/
const stores = [
	'settings',
	'pages',
	'parks',
	'loved'
];
/*
const Store = idb.open(db, dbVersion, upgradeDB => {
	stores.forEach((store) => {
		upgradeDB.createObjectStore(store);
	});
});
*/
const exp = {};
stores.forEach((store) => {
	exp[store] = {
		set: function (key, val) {
			return new Promise(resolve => {
				resolve();
			});
			/*
			return Store.then(db => {
				const tx = db.transaction(store, 'readwrite');
				tx.objectStore(store).put(val, key);
				return tx.complete;
			});
			*/
		},
		get: function (key) {
			return new Promise(resolve => {
				resolve();
			});
			/*
			return Store.then(db => {
				return db.transaction(store)
					.objectStore(store).get(key);
			});
			*/
		},
		delete: function (key) {
			return new Promise(resolve => {
				resolve();
			});
			/*
			return Store.then(db => {
				const tx = db.transaction(store, 'readwrite');
				tx.objectStore(store).delete(key);
				return tx.complete;
			});
			*/
		},
		getAll: function () {
			return new Promise(resolve => {
				resolve();
			});
			/*
			return Store.then(db => {
				return db.transaction(store)
					.objectStore(store).getAll();
			});
			*/
		},
		keys: function () {
			return new Promise(resolve => {
				resolve();
			});
			/*
			return Store.then(db => {
				const tx = db.transaction(store);
				const keys = [];
				const oStore = tx.objectStore(store);
				(oStore.iterateKeyCursor || oStore.iterateCursor).call(oStore, cursor => {
					if (!cursor) return;
					keys.push(cursor.key);
					cursor.continue();
				});

				return tx.complete.then(() => keys);
			});
			*/
		}
	};
});

export const settingsDB = exp['settings'];
export const pagesDB = exp['pages'];
export const parksDB = exp['parks'];
export const lovedDB = exp['loved'];