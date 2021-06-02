import Vue from 'vue';

export default {
	login: async params => await Vue.axios.post('/login', params),
	fetchUsers: async params => await Vue.axios.get('/users', params),
	fetchUser: async id => await Vue.axios.get('/users/' + id),
	createUser: async params => await Vue.axios.post('/users', params),
	updateUser: async params =>
		await Vue.axios.put('/users/' + params.id, params),
	deleteUser: async id => await Vue.axios.delete('/users/' + id),
};
