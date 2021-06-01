<template>
	<div class="container">
		<div class="card">
			<div class="card-body">
				<b-form @submit.prevent="onSubmit">
					<b-form-group
						id="input-group-1"
						label="Email"
						label-for="email"
						description="We'll never share your email with anyone else."
					>
						<b-form-input
							id="email"
							v-model="form.email"
							type="email"
							placeholder="Enter email"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group
						id="input-group-2"
						label="Password"
						label-for="password"
					>
						<b-form-input
							id="password"
							v-model="form.password"
							type="password"
							placeholder="Enter password"
							required
						></b-form-input>
					</b-form-group>
					<small class="error" v-if="error">{{ error }}</small>

					<b-button type="submit" variant="primary" class="btn"
						>Sign In</b-button
					>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'LoginLayout',
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
			error: null,
		};
	},
	methods: {
		...mapActions(['login']),

		async onSubmit() {
			this.error = null;
			const res = await this.login(this.form);
			if (res) {
				this.error = res?.message;
			}
		},
	},
};
</script>
<style scoped>
.container {
	width: fit-content;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: center;
}
.card {
	max-width: 500px;
}
.btn {
	margin-top: 20px;
	width: 100%;
}
.error {
	color: red;
	display: flex;
	justify-content: center;
}
</style>
