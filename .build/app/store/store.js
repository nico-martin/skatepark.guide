import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import {api} from '../modules/settings';
import {pages, parks} from './storeDB';

Vue.use(Vuex);

function fetchPark(slug) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}parks/?slug=${slug}`)
			.then(r => r.data)
			.then(resp => {
				parks.set(slug, resp[0]);
				resolve(resp[0]);
			});
	});
}

function fetchPage(path, slug) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}${path}`)
			.then(r => r.data)
			.then(resp => {
				pages.set(slug, resp.content.rendered);
				resolve(resp.content.rendered);
			});
	});
}

export const store = new Vuex.Store({
	state: {
		map: [],
		page: [],
		park: []
	},
	actions: {
		loadMapParks({commit}, data) {
			axios.get(`${api.base}map-parks/?bounds=${data}`)
				.then(r => r.data)
				.then(resp => {
					commit('SET_PARKS', resp.parks);
				});
		},
		loadPark({commit, state}, slug) {
			let title = '';
			if (slug in this.state.map) {
				title = this.state.map[slug].title;
			}
			commit('SET_PARK', {
				loading: true,
			});
			parks.get(slug).then(resp => {
				commit('SET_PARK', {
					title: (resp ? resp.title.rendered : title),
					park: resp,
					loader: !resp
				});
			});
			fetchPark(slug).then(resp => {
				commit('SET_PARK', {
					title: (resp ? resp.title.rendered : title),
					park: resp,
					loader: !resp
				});
			});
		},
		loadPage({commit}, data) {

			const slug = data[0];
			const validPages = data[1];
			const validPage = validPages[slug];
			const path = validPage.path;
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
				commit('SET_PAGE', {
					title: validPage.title,
					content: resp,
					loading: !resp
				});
				fetchPage(path, slug).then(content => {
					commit('SET_PAGE', {
						title: validPage.title,
						content: content,
						loading: false
					});
				});
			});
		},
	},
	mutations: {
		SET_PARKS(state, parks) {
			for (let park in parks) {
				if (!state.map[park]) {
					state.map[park] = parks[park];
				}
			}
		},
		SET_PARK(state, park) {
			state.park = park;
		},
		SET_PAGE(state, page) {
			state.page = page;
		}
	},
});