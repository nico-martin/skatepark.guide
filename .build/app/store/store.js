import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import {api} from '../modules/settings';
import {pagesDB, parksDB} from './storeDB';

Vue.use(Vuex);

function fetchPark(slug) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}parks/?slug=${slug}`)
			.then(r => r.data)
			.then(resp => {
				if (!resp.length) {
					reject();
					return;
				}

				const park = resp[0];
				const rendered = {
					'title': park.title.rendered,
					'slug': slug,
					'image': park['head-image'],
					'map': park.map,
					'content': park.content.rendered,
					'loading': false,
					'gallery': park['parks-gallery'],
					'video': park['parks-video'],
					'anlage': park['parks-anlage'],
					'homepage': park['parks-homepage'],
					'email': park['parks-email'],
					'phone': park['parks-phone'],
					'facebook': park['parks-facebook'],
					'address': park['parks-address'],
				};
				parksDB.set(slug, rendered);
				resolve(rendered);
			});
	});
}

function fetchPage(path, slug) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}${path}`)
			.then(r => r.data)
			.then(resp => {
				pagesDB.set(slug, resp.content.rendered);
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
					const r = {};
					Object.keys(resp.parks).forEach((slug) => {
						const park = resp.parks[slug];
						const parkData = {
							'title': park.title,
							'slug': slug,
							'image': park['head-image'],
							'map': park.map,
							'loading': true,
						};
						parksDB.set(slug, parkData);
						r[slug] = parkData;
					});
					commit('SET_PARKS', r);
				});
		},
		loadPark({commit, state}, slug) {
			commit('SET_PARK', {
				'title': '',
				'image': false,
				'loading': true,
			});
			parksDB.get(slug).then(resp => {
				if (resp) {
					commit('SET_PARK', resp);
				}
			});
			fetchPark(slug).then(resp => {
				commit('SET_PARK', resp);
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
			pagesDB.get(slug).then(resp => {
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
			Object.keys(parks).forEach((slug) => {
				state.map[slug] = parks[slug];
			});
		},
		SET_PARK(state, park) {
			state.park = park;
		},
		SET_PAGE(state, page) {
			state.page = page;
		}
	},
});