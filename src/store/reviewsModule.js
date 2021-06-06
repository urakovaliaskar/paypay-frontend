import api from '@/api';

export default {
	mutations: {},
	actions: {
		getReviews: async ({ commit }, params) => {
			try {
				const res = await api.review.fetchReviews({ params });
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', null, error?.response?.data?.message);
			}
		},
		getReview: async ({ commit }, params) => {
			try {
				const res = await api.review.fetchReview(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', null, error?.response?.data?.message);
			}
		},
		createReview: async ({ commit }, params) => {
			try {
				const res = await api.review.createReview(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', null, error?.response?.data?.message);
			}
		},
		editReview: async ({ commit }, params) => {
			try {
				const res = await api.review.updateReview(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', null, error?.response?.data?.message);
			}
		},
		deleteReview: async ({ commit }, params) => {
			try {
				const res = await api.review.deleteReview(params);
				return res.data;
			} catch (error) {
				console.error(error);
				commit('SET_ERROR', null, error?.response?.data?.message);
			}
		},
	},
};
