<template>
	<div class="container mt-4">
		<div class="card mx-auto">
			<b-card :header="capitalize + ' user'" class="card-body p-0">
				<b-form @submit.prevent="onSubmit">
					<b-form-group id="input-group-1" label="Email" label-for="email">
						<b-form-input
							id="email"
							v-model="user.email"
							type="email"
							placeholder="Enter email"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group
						id="input-group-3"
						label="Firstname"
						label-for="password"
					>
						<b-form-input
							id="firstname"
							v-model="user.firstname"
							type="text"
							placeholder="Enter firstname"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group
						id="input-group-4"
						label="Lastname"
						label-for="lastname"
					>
						<b-form-input
							id="lastname"
							v-model="user.lastname"
							type="text"
							placeholder="Enter lastname"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group
						v-if="mode === 'create'"
						id="input-group-2"
						label="Password"
						label-for="password"
					>
						<b-form-input
							id="password"
							v-model="user.password"
							type="password"
							placeholder="Enter password"
							required
						></b-form-input>
					</b-form-group>

					<b-form-group id="input-group-5" label="Role" label-for="role">
						<b-form-select
							id="role"
							v-model="user.role"
							:options="['user', 'admin']"
							required
						></b-form-select>
					</b-form-group>
					<small class="error" v-if="error">{{ error }}</small>

					<b-button type="submit" variant="primary" class="btn">{{
						capitalize
					}}</b-button>
				</b-form>
			</b-card>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
	name: 'User',
	data: () => ({
		mode: 'create',
		error: null,
		user: {
			email: null,
			firstname: null,
			lastname: null,
			password: null,
			role: 'user',
		},
	}),
	computed: {
		capitalize() {
			const firstLetter = this.mode[0].toUpperCase();
			const rest = this.mode.substring(1);
			return firstLetter + rest;
		},
	},
	async mounted() {
		try {
			if (this.$route.params.id != 'create') {
				const { id } = this.$route.params;
				this.mode = 'edit';
				const { user } = id && (await this.getUser(id));
				this.user = user;
			}
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		...mapActions(['editUser', 'createUser', 'getUser']),
		async onSubmit() {
			try {
				if (this.mode == 'create') {
					await this.createUser(this.user);
				} else {
					await this.editUser(this.user);
				}
				this.$router.push({ name: 'users' });
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.card {
	width: 600px;
	padding: 0;
}
</style>
