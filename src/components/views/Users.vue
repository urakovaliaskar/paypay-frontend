<template>
	<b-container class="container mt-4">
		<b-button class="btn btn-create mb-4 float-right" variant="primary"
			>+ Create User</b-button
		>
		<b-table
			id="users-table"
			striped
			hover
			bordered
			responsive="sm"
			:fields="fields"
			:items="modifiedUsers"
		>
			<template #cell(actions)="row" v-if="isAdmin">
				<b-button size="sm" @click="editUser(row.item)" variant="warning">
					edit
				</b-button>
				<b-button
					size="sm"
					@click="deleteUser(row.item)"
					variant="danger"
					class="ml-2"
				>
					delete
				</b-button>
			</template>
		</b-table>
		<b-pagination
			v-model="page"
			:total-rows="total"
			:per-page="size"
			aria-controls="users-table"
		/>
	</b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { format } from 'date-fns';

export default {
	name: 'Users',
	data: () => ({
		users: [],
		page: 1,
		size: 10,
		total: 0,
		fields: ['number', 'email', 'name', 'date', 'actions'],
	}),
	async mounted() {
		const res = await this.getUsers({ page: this.page - 1, size: this.size });
		this.users = res.users;
		this.total = res.total;
	},
	computed: {
		...mapGetters(['user', 'isAdmin']),
		modifiedUsers() {
			return this.users
				.filter(el => el.id !== this.user.id)
				.map((el, idx) => {
					return {
						id: el.id,
						number: (this.page - 1) * this.size + idx + 1,
						email: el.email,
						name: el.firstname + ' ' + el.lastname,
						date: format(new Date(el.created_at), 'dd.MM.yyyy'),
					};
				});
		},
	},
	methods: {
		...mapActions(['getUsers']),
		editUser(e) {
			console.log(e);
		},
		deleteUser(e) {
			console.log(e);
		},
	},
};
</script>
<style lang="scss">
.actions {
	display: flex;
	justify-content: space-between;
}
</style>
