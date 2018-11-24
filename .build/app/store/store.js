import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import {api} from '../modules/settings';
import {pages} from './storeDB';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		map: [],
		page: []
	},
	actions: {
		loadMapParks({commit}, data) {
			axios.get(`${api.base}map-parks/?bounds=${data}`)
				.then(r => r.data)
				.then(resp => {
					commit('SET_PARKS', resp.parks);
				});
		},
		loadPage({commit}, data) {

			const slug = data[0];
			const validPages = data[1];
			const validPage = validPages[slug];
			if (!validPage) {
				commit('SET_PAGE', {
					title: '404 error',
					content: 'Page not found',
					loading: false
				});
				return;
			}
			commit('SET_PAGE', {
				title: validPage.title,
				loading: true
			});
			pages.get(slug).then(resp => {
				if (!resp) {
					console.log(`${api.base}${validPage.path}`);
					axios.get(`${api.base}${validPage.path}`)
						.then(r => r.data)
						.then(resp => {
							pages.set(slug, resp.content.rendered);
							commit('SET_PAGE', {
								title: validPage.title,
								content: resp.content.rendered,
								loading: false
							});
						});
				} else {
					commit('SET_PAGE', {
						title: validPage.title,
						content: resp,
						loading: false
					});
					axios.get(`${api.base}${validPage.path}`)
						.then(r => r.data)
						.then(resp => {
							pages.set(slug, resp.content.rendered);
							commit('SET_PAGE', {
								title: validPage.title,
								content: resp.content.rendered,
								loading: false
							});
						});
				}
			});
		}
	},
	mutations: {
		SET_PARKS(state, parks) {
			for (let park in parks) {
				if (!state.map[park]) {
					state.map[park] = parks[park];
				}
			}
		},
		SET_PAGE(state, page) {
			state.page = page;
		}
	}
});