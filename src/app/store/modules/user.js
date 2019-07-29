import axios from "axios/index";
import {api} from "./../../vendor/settings";
import {storeDB} from '../storeDB';

// Todo: check from time to time is user is still logged in

const state = {
	auth: false,
	data: false,
};

const getters = {};

const actions = {
	/*
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

	getUserData({commit}, data) {
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
	},
	*/
	logout({commit}) {
		commit('setAuth', false);
		storeDB.settings.set('token', false);
	},
	login({commit}, data) {
		return new Promise((resolve, reject) => {
			axios.post(`${api.base}/jwt-auth/v1/token/`, {
				username: data.email,
				password: data.password
			})
				.then(resp => {
					const token = resp.data.token;
					commit('setAuth', token);
					console.log('data', data);
					if (data.rememberme) {
						storeDB.settings.set('token', token);
					}
					resolve();
				})
				.catch(() => {
					reject();
				});
		});
	},
	setToken({commit}, token) {
		commit('setAuth', token);
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
	loadUserData({commit}, data) {
		storeDB.settings.get('user').then(user => {
			if (user) commit('setUser', user);
		});

		axios.get(api.user)
			.then(r => commit('setUser', r.data))
			.catch(error => reject(error.response.data.message));
	},
	setUserData({commit}, data) {
		commit('setUser', data);
	}
};

const mutations = {
	setUser(state, user) {
		storeDB.settings.set('user', user);
		state.data = user;
	},
	setAuth(state, token) {
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			state.auth = token;
		} else {
			axios.defaults.headers.common['Authorization'] = '';
			state.auth = false
		}
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}