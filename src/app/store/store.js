import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import { api } from '../modules/settings';
import { pagesDB, parksDB, settingsDB } from './storeDB';
import { i18n } from '../i18n';

Vue.use(Vuex);

function fetchPark(slug) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}wp/v2/parks/?slug=${slug}`)
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
					'facilities': park['parks-facilities'],
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

function fetchPage(path, dbKey) {
	return new Promise((resolve, reject) => {
		axios.get(`${api.base}wp/v2/${path}`)
			.then(r => r.data)
			.then(resp => {
				pagesDB.set(dbKey, resp.content.rendered);
				resolve(resp.content.rendered);
			});
	});
}

export const store = new Vuex.Store({
	state: {
		map: [],
		mapFilter: {},
		page: [],
		park: [],
		user: false
	},
	actions: {
		loadMapParks({ commit }, data) {
			axios.get(`${api.base}wp/v2/map-parks/?bounds=${data}`)
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
							'facilities': park['parks-facilities'],
						};
						parksDB.set(slug, parkData);
						r[slug] = parkData;
					});
					commit('SET_PARKS', r);
				});
		},
		changeMapFilter({ commit }, data) {
			commit('SET_MAP_FILTER', data);
		},
		loadPark({ commit, state }, slug) {
			commit('SET_PARK', {
				'title': '',
				'image': false,
				'loading': true,
			});
			if (!slug) {
				return;
			}
			parksDB.get(slug).then(resp => {
				if (resp) commit('SET_PARK', resp);
				fetchPark(slug).then(resp => {
					commit('SET_PARK', resp);
				});
			});
		},
		loadPage({ commit }, data) {

			const slug = data[0];
			const validPage = i18n.t('menu.' + slug);
			if (i18n.t('menu.' + slug) === 'menu.' + slug) {
				commit('SET_PAGE', {
					title: '404 error',
					content: 'Page not found',
					loading: false
				});
				return;
			}

			const path = validPage.path;
			const dbKey = path.replace('/', '');

			commit('SET_PAGE', {
				title: validPage.title,
				loading: true
			});
			pagesDB.get(dbKey).then(resp => {
				commit('SET_PAGE', {
					title: validPage.title,
					content: resp,
					loading: !resp
				});
				fetchPage(path, dbKey).then(content => {
					commit('SET_PAGE', {
						title: validPage.title,
						content: content,
						loading: false
					});
				});
			});
		},
		validateUser({ commit }, data) {
			axios.post(`${api.base}jwt-auth/v1/token/`, {
				username: data.username,
				password: data.password
			})
				.then(r => r.data)
				.catch(() => {
					console.log('could not validate user');
				})
				.then(resp => {
					axios.defaults.headers.common['Authorization'] = `Bearer ${resp.token}`;
					commit('SET_USER', resp);
				});
		},
		setUser({ commit }, user) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
			commit('SET_USER', user);
		},
		validateToken({ commit }, token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			axios.post(`${api.base}wp/v2/users/me/`)
				.then(r => r.data)
				.catch(() => {
					commit('SET_USER', false);
					console.log('could not fetch /me');
				})
				.then(resp => {
					commit('SET_USER', {
						token,
						user_display_name: resp.name,
						user_email: resp.email,
						user_nicename: resp.username
					});
				})
		}
	},
	mutations: {
		SET_PARKS(state, parks) {
			Object.keys(parks).forEach((slug) => {
				state.map[slug] = parks[slug];
			});
		},
		SET_MAP_FILTER(state, filters) {
			state.mapFilter = filters;
		},
		SET_PARK(state, park) {
			state.park = park;
		},
		SET_PAGE(state, page) {
			state.page = page;
		},
		SET_USER(state, user) {
			settingsDB.set('user', user);
			state.user = user;
		}
	},
});