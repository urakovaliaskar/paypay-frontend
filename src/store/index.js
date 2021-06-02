import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: null,
		user: {
			id: null,
			email: '',
			firstname: '',
			lastname: '',
		},
		error: null,
	},
	mutations: {
		CURRENT_USER_FETCHED: (state, user) => {
			state.user = user;
		},
		CURRENT_USER_LOGGED_OUT: state => {
			state.token = null;
			state.user = null;
		},
		SET_CURRENT_USER: (state, user) => {
			state.user = user;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_ERROR: (state, error) => {
			state.error = error;
		},
	},
	actions: {
		login: async ({ commit }, credentials) => {
			try {
				Vue.axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
				const res = await api.login(credentials);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				commit('CURRENT_USER_FETCHED', res.data.user);
				commit('SET_TOKEN', res.data.token);
				router.push({ name: 'reviews' });
			} catch (error) {
				console.error(error);
				return error?.response?.data;
			}
		},
		logout: ({ commit }) => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			delete Vue.axios.defaults.headers.common['Authorization'];
			commit('CURRENT_USER_LOGGED_OUT');
			router.push({ name: 'login' });
		},
		getUsers: async ({ commit }, params) => {
			try {
				const res = await api.fetchUsers(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', error?.response?.data?.message);
			}
		},
		getUser: async ({ commit }, params) => {
			try {
				const res = await api.fetchUser(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', error?.response?.data?.message);
			}
		},
		createUser: async ({ commit }, params) => {
			try {
				const res = await api.createUser(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', error?.response?.data?.message);
			}
		},
		editUser: async ({ commit }, params) => {
			try {
				const res = await api.updateUser(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', error?.response?.data?.message);
			}
		},
		deleteUser: async ({ commit }, params) => {
			try {
				const res = await api.deleteUser(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', error?.response?.data?.message);
			}
		},
	},
	getters: {
		isAuthenticated: state => !!state.token,
		isAdmin: state => !!(state?.user?.role === 'admin'),
		user: state => state.user,
		error: state => state.error,
	},
	modules: {},
});
