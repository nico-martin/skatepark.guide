import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {api} from '../modules/settings';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		map: [],
	},
	actions: {
		loadMapParks({commit}, data) {
			axios.get(`${api.base}map-parks/?bounds=${data}`)
				.then(r => r.data)
				.then(resp => {
					commit('SET_PARKS', resp.parks);
				});
		}
	},
	mutations: {
		SET_PARKS(state, parks) {
			for (let park in parks) {
				if (typeof state.map[park] === 'undefined') {
					state.map[park] = parks[park];
				}
			}
		}
	}
});