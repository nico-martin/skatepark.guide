import {i18n} from "./../../i18n";
import {storeDB} from "./../storeDB";
import axios from "axios/index";
import {api} from "./../../vendor/settings";

const state = {
	current: {},
};

const getters = {};

const actions = {
	load({commit}, data) {

		const slug = data[0];
		const dbKey = `${i18n.locale}-${slug}`;

		commit('set', {
			title: i18n.t(`menu_${slug}`),
			loading: true
		});

		storeDB.pages.get(dbKey).then(resp => {
			commit('set', {
				title: i18n.t(`menu_${slug}`),
				content: resp,
				loading: !resp
			});
			axios.get(`${api.page}/${slug}/`)
				.then(resp => {
					storeDB.pages.set(dbKey, resp.data['post_content_rendered']);
					commit('set', {
						title: i18n.t(`menu_${slug}`),
						content: resp.data['post_content_rendered'],
						loading: false
					});
				});
		});
	}
};

const mutations = {
	set(state, page) {
		state.current = page;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}