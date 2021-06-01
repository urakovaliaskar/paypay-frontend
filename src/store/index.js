import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
	},
	mutations: {
		CURRENT_USER_FETCHED: (state, user) => {
			state.user.id = user.id;
			state.user.email = user.email;
			state.user.firstname = user.firstname;
			state.user.lastname = user.lastname;
		},
		CURRENT_USER_LOGGED_OUT: (state, user) => {
			state.token = null;
			state.user = null;
		},
		SET_CURRENT_USER: (state, user) => {
			state.user = user;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
	},
	actions: {
		login: async ({ commit }, user) => {
			try {
				Vue.axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
				const res = await Vue.axios.post('/login', user);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				commit('CURRENT_USER_FETCHED', res.data.user);
				commit('SET_TOKEN', res.data.token);
				router.push({ path: '/' });
			} catch (error) {
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
	},
	getters: {
		isAuthenticated: state => !!state.token,
		isAdmin: state => state.user.role === 'admin',
		user: state => state.user,
	},
	modules: {},
});
