import axios from "axios/index";
import {api} from "./../../vendor/settings";
import {storeDB} from '../storeDB';

const state = {
	login: false,
};

const getters = {};

const actions = {
	validate({commit}, data) {
		return new Promise((resolve, reject) => {
			axios.post(`${api.base}/jwt-auth/v1/token/`, {
				username: data.email,
				password: data.password
			})
				.then(r => r.data)
				.catch(() => {
					reject();
				})
				.then(resp => {
					if (resp) {
						commit('setUser', resp);
					} else {
						reject();
					}
				});
		});
	},
	signup({commit}, data) {
		return new Promise((resolve, reject) => {
			axios.post(`${api.base}/skateparkguide/v1/signup/`, {
				email: data.email,
				password: data.password,
				password2: data.password2
			})
				.then(r => commit('setUser', r.data))
				.catch(error => reject(error.response.data.message));
		});
	},
	validateToken({commit}, token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		axios.post(`${api.base}wp/v2/users/me/`)
			.then(r => r.data)
			.then(resp => {
				commit('setUser', {
					token,
					user_display_name: resp.name,
					user_email: resp.email,
					user_nicename: resp.username
				});
			})
			.catch(() => {
				commit('setUser', false);
				console.log('could not fetch /me');
			});
	}
};

const mutations = {
	setUser(state, user) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
		storeDB.settings.set('user', user);
		state.login = user;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}