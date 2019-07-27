import {storeDB} from '../storeDB';
import axios from 'axios/index';
import {api} from '../../vendor/settings';
import {vueInstance} from '../../app';

const state = {
	map: {},
	filter: {
		bowl: true,
		mini: true,
		pumptrack: true,
		street: true
	},
	single: []
};

const getters = {};

const actions = {
	loadBounds({commit}, data) {
		axios.get(`${api.map}/?bounds=${data}`)
			.then(resp => {
				const responseParks = {};
				Object.keys(resp.data.parks).forEach((slug) => {
					if (resp.data.parks[slug].status === 'trash') {
						storeDB.parks.delete(slug.replace('__trashed', ''));
					} else {
						const park = resp.data.parks[slug];
						const parkData = {
							'title': park.title,
							'slug': slug,
							'image': park['head-image'],
							'map': park.map,
							'loading': true,
							'facilities': park['parks-facilities'],
						};
						storeDB.parks.set(slug, parkData);
						/*
						storeDB.parks.get(slug).then(resp => {
							if (!resp) storeDB.parks.set(slug, parkData);
						});
						*/
						responseParks[slug] = parkData;
					}
				});
				commit('setParks', responseParks);
			})
			.catch(error => {
				vueInstance.$snack.danger({
					text: vueInstance.$t('map_entries_load_error'),
					button: 'OK'
				});
			});
	},
	loadFromDB({commit}) {
		const allParks = {};
		storeDB.parks.getAll().then(parks => {
			Object.keys(parks).forEach(parkID => {
				const park = parks[parkID];
				allParks[park.slug] = park;
			});
			commit('setParks', allParks);
		});
	},
	changeMapFilter({commit}, data) {
		commit('setMapFilter', data);
	},
	loadSingle({commit, state}, slug) {
		commit('setSingle', {
			'title': '',
			'image': false,
			'loading': true,
		});
		if (!slug) {
			return;
		}
		storeDB.parks.get(slug).then(respDB => {
			if (respDB) commit('setSingle', respDB);
			axios.get(`${api.parks}?slug=${slug}`)
				.then(resp => {
					if (resp.data.length) {
						const park = resp.data[0];
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
						storeDB.parks.set(slug, rendered);
						commit('setSingle', rendered);
					}
				})
				.catch(error => {
					vueInstance.$snack.danger({
						text: vueInstance.$t('park_load_error'),
						button: 'OK'
					});
					if (respDB && typeof respDB.content === 'undefined') {
						respDB.content = vueInstance.$t('park_load_error_network');
						respDB.loading = false;
						commit('setSingle', respDB);
					}
				});
		});
	}
	// TODO: load deleted Parks
};

const mutations = {
	setParks(state, parks) {
		Object.keys(parks).forEach(slug => {
			state.map[slug] = parks[slug];
		});
	},
	setMapFilter(state, filters) {
		state.filter = filters;
	},
	setSingle(state, park) {
		state.single = park;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}