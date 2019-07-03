import Vue from 'vue';
import Vuex from 'vuex';

import page from './modules/page';
import user from './modules/user';
import parks from './modules/parks';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		page,
		user,
		parks
	}
});