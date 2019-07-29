import Vue from 'vue';
import Vuex from 'vuex';
import {storeDB} from './storeDB';

import page from './modules/page';
import user from './modules/user';
import parks from './modules/parks';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		page,
		user,
		parks
	}
});

export default store;

storeDB.settings.get('token').then(token => {
	store.dispatch('user/setToken', token);
});