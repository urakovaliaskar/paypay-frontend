<template>
	<div>
		<b-container class="container mt-4">
			<b-overlay :show="loading" rounded="sm">
				<b-card class="card">
					<b-row class="row">
						<b-col class="col">
							<b-button
								class="btn btn-create"
								variant="warning"
								@click="$router.push({ path: '/user/create' })"
								>+ Create User</b-button
							>
						</b-col>
					</b-row>
					<b-table
						id="users-table"
						striped
						hover
						bordered
						responsive
						:fields="fields"
						:items="modifiedUsers"
					>
						<template #cell(actions)="row" v-if="isAdmin">
							<div class="actions">
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
							</div>
						</template>
					</b-table>
					<b-pagination
						v-model="page"
						:total-rows="total"
						:per-page="size"
						@change="fetchUsers"
						aria-controls="users-table"
					/>
				</b-card>
			</b-overlay>
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
		loading: true,
	}),
	async mounted() {
		await this.fetchUsers();
	},
	computed: {
		...mapGetters(['user', 'isAdmin']),
		modifiedUsers() {
			return this.users.map((el, idx) => {
				return {
					number: (this.page - 1) * this.size + idx + 1,
					id: el.id,
					email: el.email,
					name: el.fullname,
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
		async fetchUsers(page) {
			this.loading = true;
			if (page) this.page = page;
			const res = await this.getUsers({ page: this.page - 1, size: this.size });
			this.users = res.users;
			this.total = res.total;
			this.loading = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.actions {
	display: flex;
	gap: 8px;
	justify-content: space-around;
}
</style>
