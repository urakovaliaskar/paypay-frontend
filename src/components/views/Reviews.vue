<template>
	<div>
		<b-container class="container mt-4">
			<b-overlay :show="loading" rounded="sm">
				<b-card class="card">
					<b-row class="row" v-if="isAdmin">
						<b-col class="col">
							<b-button
								class="btn btn-create"
								variant="warning"
								@click="
									$router.push({
										name: 'review',
										params: { id: 'create', mode: 'create' },
									})
								"
								>+ Create Review</b-button
							>
						</b-col>
					</b-row>
					<b-list-group id="reviews-list" v-if="reviews.length > 0">
						<b-list-group-item
							v-for="review in reviews"
							:key="review.id"
							button
						>
							<div class="list-item">
								<div>
									<small
										><strong>Employee:</strong>
										{{ review.employee.fullname }}</small
									>
									<span
										><strong>Review:</strong>
										{{ review.description | textLength }}</span
									>
								</div>
								<div class="review-side">
									<small>Reviewer: {{ review.author.fullname }}</small>
									<small>{{ review.created_at | dateFormat }}</small>
								</div>
							</div>
							<b-card-footer class="footer">
								<b-button
									size="sm"
									variant="info"
									@click="
										$router.push({
											name: 'review',
											params: { id: review.id, mode: 'view' },
										})
									"
									>Feedbacks
									<b-badge variant="info">{{
										review.feedbacks.length
									}}</b-badge></b-button
								>
								<span v-if="isAdmin">
									<b-button
										size="sm"
										variant="warning mr-2"
										@click="
											$router.push({
												name: 'review',
												params: { id: review.id, mode: 'edit' },
											})
										"
										>Edit</b-button
									>
									<b-button
										size="sm"
										variant="danger"
										@click="confirmDeletion(review.id)"
										>Delete</b-button
									>
								</span>
							</b-card-footer>
						</b-list-group-item>
					</b-list-group>
					<b-card v-else>No reviews assigned for feedback</b-card>
					<b-pagination
						v-if="total"
						class="pagination"
						v-model="page"
						:total-rows="total"
						:per-page="size"
						aria-controls="reviews-list"
					/>
				</b-card>
			</b-overlay>
		</b-container>
		<b-modal
			id="delete-confirm"
			@ok="removeReview"
			@cancel="$bvModal.hide('delete-confirm')"
			title="Confirm the action"
			>Are you sure you want to delete this review? This action can't be
			undone.</b-modal
		>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import mixin from '@/mixin';
export default {
	name: 'Reviews',
	mixins: [mixin],
	data: () => ({
		loading: true,
		reviews: [],
		page: 1,
		size: 10,
		total: 0,
		selectedReviewId: null,
	}),
	async mounted() {
		await this.fetchReviews();
	},
	filters: {
		textLength(text) {
			return text.length > 25 ? text.substring(0, 24) + '...' : text;
		},
	},
	computed: {
		...mapGetters(['isAdmin']),
	},
	methods: {
		...mapActions([
			'getReviews',
			'createReview',
			'updateReview',
			'deleteReview',
		]),
		async fetchReviews() {
			this.loading = true;
			const res = await this.getReviews({
				page: this.page - 1,
				size: this.size,
			});
			this.reviews = res.reviews;
			this.total = res.total;
			this.loading = false;
		},
		confirmDeletion(id) {
			this.selectedReviewId = id;
			this.$bvModal.show('delete-confirm');
		},
		async removeReview(e) {
			await this.deleteReview(this.selectedReviewId);
			this.selectedReviewId = null;
			this.fetchReviews();
		},
	},
};
</script>
<style lang="scss">
.pagination {
	margin-top: 1rem;
}
.list-item {
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	& > div {
		display: flex;
		flex-direction: column;
	}
	& > .review-side {
		justify-content: space-between;
		align-items: flex-end;
	}
}
.footer {
	background: transparent;
	margin-top: 8px;
	padding: 0;
	display: flex;
	justify-content: space-between;
}
</style>
