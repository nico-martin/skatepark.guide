import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'
import {api} from '../vendor/settings';
import {pagesDB, parksDB, settingsDB} from './storeDB';
import {i18n} from '../i18n';

import page from './modules/page';
import user from './modules/user';

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

export const store = new Vuex.Store({
	modules: {
		page,
		user
	},
	state: {
		map: [],
		mapFilter: {},
		park: [],
	},
	actions: {
		loadMapParks({commit}, data) {
			axios.get(`${api.base}skateparkguide/v1/map-parks/?bounds=${data}`)
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
		changeMapFilter({commit}, data) {
			commit('SET_MAP_FILTER', data);
		},
		loadPark({commit, state}, slug) {
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
		}
	},
});