<template>
	<div>
		<b-container class="container mt-4" v-if="!!users.length">
			<b-card class="card">
				<div class="header-wrapper mb-4">
					<!-- <div>Items: {{ modifiedUsers.length }}</div> -->
					<b-button
						class="btn btn-create ml-auto"
						variant="warning"
						@click="$router.push({ name: 'user', params: { id: 'create' } })"
						>+ Create User</b-button
					>
				</div>
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
						<b-button size="sm" @click="editUser(row.item)" variant="info">
							<b-icon-pencil></b-icon-pencil> edit
						</b-button>
						<b-button
							size="sm"
							@click="confirmDeletion(row.item)"
							variant="danger"
							class="ml-2"
						>
							<b-icon-trash></b-icon-trash> delete
						</b-button>
					</template>
				</b-table>
				<b-pagination
					v-model="page"
					:total-rows="total"
					:per-page="size"
					aria-controls="users-table"
				/>
			</b-card>
		</b-container>
		<b-modal
			id="delete-confirm"
			@ok="removeUser"
			@cancel="$bvModal.hide('delete-confirm')"
			title="Confirm the action"
			>Are you sure you want to delete this user? This action can't be
			undone.</b-modal
		>
	</div>
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
		selectedUserId: null,
	}),
	async mounted() {
		await this.fetchUsers();
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
		...mapActions(['getUsers', 'deleteUser']),
		editUser(row) {
			this.$router.push({ name: 'user', params: { id: row.id } });
		},
		confirmDeletion(row) {
			this.selectedUserId = row.id;
			this.$bvModal.show('delete-confirm');
		},
		async removeUser() {
			await this.deleteUser(this.selectedUserId);
			this.selectedUserId = null;
			this.fetchUsers();
		},
		async fetchUsers() {
			const res = await this.getUsers({ page: this.page - 1, size: this.size });
			this.users = res.users;
			this.total = res.total;
		},
	},
};
</script>
<style lang="scss" scoped>
[aria-colindex='5'] {
	text-align: center;
}

.header-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.pagination {
	gap: 8px;
}
</style>
