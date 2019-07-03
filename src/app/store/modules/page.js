import {i18n} from "./../../i18n";
import {storeDB} from "./../storeDB";
import axios from "axios/index";
import {api} from "./../../vendor/settings";

function fetch(path, dbKey) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}/wp/v2/${path}`)
			.then(r => r.data)
			.then(resp => {
				storeDB.pages.set(dbKey, resp.content.rendered);
				resolve(resp.content.rendered);
			});
	});
}

const state = {
	current: {},
};

const getters = {};

const actions = {
	load({commit}, data) {

		const slug = data[0];
		const validPage = {
			title: i18n.t(`menu_${slug}_title`),
			path: i18n.t(`menu_${slug}_path`)
		};

		if (validPage.path === `menu_${slug}_path`) {
			commit('set', {
				title: '404 error',
				content: 'Page not found',
				loading: false
			});
			return;
		}

		const dbKey = validPage.path.replace('/', '');

		commit('set', {
			title: validPage.title,
			loading: true
		});
		storeDB.pages.get(dbKey).then(resp => {
			commit('set', {
				title: validPage.title,
				content: resp,
				loading: !resp
			});
			fetch(validPage.path, dbKey).then(content => {
				commit('set', {
					title: validPage.title,
					content: content,
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