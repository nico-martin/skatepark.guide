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
	}
};

const getters = {};

const actions = {
	loadBounds({commit}, data) {
		axios.get(`${api.map}/?bounds=${data}`)
			.then(resp => {
				const responseParks = {};
				Object.keys(resp.data.parks).forEach((slug) => {
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
					responseParks[slug] = parkData;
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
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}