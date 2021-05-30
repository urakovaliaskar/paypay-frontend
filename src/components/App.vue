<template>
	<div>
		<navigation-bar />
		<div v-if="loading">Loading...</div>
		<div v-if="!loading && !error">
			<div class="container mt-4">
				<div class="card">
					<div class="card-body">
						<centered-loader />
						<h1>Welcome</h1>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!loading && error">Something went wrong!</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
import NavigationBar from './layout/NavigationBar';
export default {
	name: 'App',
	components: { NavigationBar },
	data: () => ({
		loading: true,
		error: false,
	}),
	methods: {
		...mapActions(['initialLoad']),
	},
	async mounted() {
		try {
			await this.initialLoad();
			this.loading = false;
		} catch (error) {
			this.loading = false;
			this.error = true;
		}
	},
};
</script>
<style scoped lang="scss"></style>
