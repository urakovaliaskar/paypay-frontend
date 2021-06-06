import Vue from 'vue';

export default {
	login: async params => await Vue.axios.post('/login', params),
	user: {
		// user routes
		fetchUsers: async params => await Vue.axios.get('/users', params),
		fetchUser: async id => await Vue.axios.get('/users/' + id),
		createUser: async params => await Vue.axios.post('/users', params),
		updateUser: async params =>
			await Vue.axios.put('/users/' + params.id, params),
		deleteUser: async id => await Vue.axios.delete('/users/' + id),
	},
	review: {
		//review routes
		fetchReviews: async params => await Vue.axios.get('/reviews', params),
		fetchReview: async id => await Vue.axios.get('/reviews/' + id),
		createReview: async params => await Vue.axios.post('/reviews', params),
		updateReview: async params =>
			await Vue.axios.put('/reviews/' + params.id, params),
		deleteReview: async id => await Vue.axios.delete('/reviews/' + id),
	},
	feedback: {
		createFeedback: async params => await Vue.axios.post('/feedbacks', params),
	},
};
