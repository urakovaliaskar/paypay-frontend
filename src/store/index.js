import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
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
	},
	actions: {
		initialLoad: async context => {
			if (localStorage?.token) {
				Vue.axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
				const res = await Vue.axios.get('/api/auth/currentUser');
				context.commit('CURRENT_USER_FETCHED', res.data.user);
			}
		},
	},
	modules: {},
});
