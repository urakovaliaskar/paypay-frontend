<template>
	<div class="container mt-4">
		<div class="card mx-auto">
			<b-card :header="capitalize + ' review'" class="card-body p-0">
				<b-form @submit.prevent="onSubmit" v-if="mode !== 'view'">
					<b-form-group
						id="input-group-2"
						label="Employee"
						label-for="employee"
					>
						<SelectComponent
							@selected="setEmployee"
							:initial="getInitial(false)"
							:disabled="mode === 'edit'"
							required
						/>
					</b-form-group>
					<b-form-group id="input-group-2" label="Review" label-for="review">
						<b-form-textarea
							id="review"
							v-model="review.description"
							type="text"
							placeholder="Enter lastname"
							required
						></b-form-textarea>
					</b-form-group>

					<b-form-group
						id="input-group-2"
						label="Assign Employees"
						label-for="role"
					>
						<SelectComponent
							@selected="setAssignees"
							multiple
							:initial="getInitial(true)"
							required
						/>
					</b-form-group>
					<small class="error" v-if="error">{{ error }}</small>

					<b-button
						v-if="mode !== 'view'"
						type="submit"
						variant="primary"
						class="btn"
						>{{ capitalize }}</b-button
					>
				</b-form>
				<div v-else class="view-mode">
					<b-card-text v-if="review">
						<p>
							<small
								><strong>Created: </strong
								>{{ review.created_at | dateFormat }}</small
							><br />
							<strong>Employee:</strong>
							{{ review.employee && review.employee.fullname }}<br />
							<strong>Reviewer:</strong>
							{{ review.author && review.author.fullname }}
						</p>
						<p>
							<strong>Performance review:</strong><br />
							{{ review.description }}
						</p>
					</b-card-text>

					<b-card-text v-if="isAdmin">
						<strong>Assigned to give feedback:</strong>
						<b-list-group>
							<b-list-group-item
								v-for="assignee in review.assignees"
								:key="assignee.id"
								>{{ assignee.assignee.fullname }}</b-list-group-item
							>
						</b-list-group>
					</b-card-text>
					<b-card-text>
						<strong>Feedbacks:</strong>
						<b-list-group>
							<b-list-group-item
								v-if="!review.feedbacks.length && !isWritingFeedback"
								>No feedbacks provided yet.</b-list-group-item
							>
							<b-list-group-item
								v-for="feedback in review.feedbacks"
								:key="feedback.id"
							>
								<small>{{ feedback.author.fullname }}:</small><br />
								<p class="feedback">
									{{ feedback.description }}
								</p></b-list-group-item
							>
						</b-list-group>
						<div v-if="isAssignedFor">
							<feedback v-show="isWritingFeedback" @change="setFeedbackText" />
							<b-list-group-item
								class="text-center"
								button
								:variant="isWritingFeedback ? 'success' : 'info'"
								@click="setWritingModeOn"
								>{{
									!isWritingFeedback ? 'Write feedback' : 'Send Feedback'
								}}</b-list-group-item
							>
						</div>
					</b-card-text>
				</div>
			</b-card>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import mixin from '@/mixin';
import SelectComponent from '@/components/local/SelectComponent';
import Feedback from './Feedback';
export default {
	name: 'Review',
	mixins: [mixin],
	components: { SelectComponent, Feedback },
	data: () => ({
		mode: 'view',
		error: null,
		review: {
			description: null,
			employee_id: null,
			feedbacks: [],
			assignees: [],
			employee: null,
		},
		users: [],
		isWritingFeedback: false,
		feedbackText: '',
	}),
	computed: {
		...mapGetters(['user', 'isAdmin']),
		capitalize() {
			const firstLetter = this.mode[0].toUpperCase();
			const rest = this.mode.substring(1);
			return firstLetter + rest;
		},
		getInitial() {
			return isMultiple => {
				if (isMultiple) {
					return this.review?.assignees?.map(el => ({
						label: el.assignee.fullname,
						value: el.assignee.id,
					}));
				} else {
					return this.review?.employee
						? {
								label: this.review?.employee?.fullname,
								value: this.review?.employee?.id,
						  }
						: null;
				}
			};
		},
		isAssignedFor() {
			if (this.isAdmin) return true;
			const assigned = this.review.assignees.find(
				assignee => assignee.assignee_id === this.user.id
			);
			return !!assigned;
		},
	},
	async mounted() {
		try {
			const { mode, id } = this.$route.params;
			if (mode) this.mode = mode;
			if (['edit', 'view'].includes(this.mode)) {
				const { review } = id && (await this.getReview(id));
				this.review = review;
				this.$nextTick();
			}
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		...mapActions([
			'editReview',
			'createReview',
			'getReview',
			'createFeedback',
		]),
		async onSubmit() {
			try {
				if (this.mode == 'create') {
					await this.createReview({
						...this.review,
						author_id: this.user.id,
						assignees: this.review.newAssignees,
					});
				} else {
					await this.editReview({
						...this.review,
						author_id: this.user.id,
						assignees: this.review.newAssignees,
					});
				}
				this.$router.push({ name: 'reviews' });
			} catch (error) {
				console.error(error);
			}
		},
		setEmployee(id) {
			this.review.employee_id = id;
		},
		setAssignees(assignees) {
			this.review.newAssignees = assignees;
		},
		setWritingModeOn() {
			if (this.feedbackText) {
				this.sendFeedback();
			}
			this.isWritingFeedback = true;
		},
		setFeedbackText(text) {
			this.feedbackText = text;
		},
		async sendFeedback() {
			const params = {
				author_id: this.user.id,
				description: this.feedbackText,
				review_id: this.review.id,
			};

			await this.createFeedback(params);
			this.isWritingFeedback = false;
			const { review } = await this.getReview(this.review.id);
			this.review = review;
		},
	},
};
</script>
<style lang="scss" scoped>
.card {
	width: 600px;
	padding: 0;
}
.feedback {
	max-height: 100px;
	overflow: auto;
}
</style>
