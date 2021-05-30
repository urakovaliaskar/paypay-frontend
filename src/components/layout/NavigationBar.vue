<template>
	<div>
		<b-navbar toggleable="md" variant="primary" type="dark">
			<b-navbar-brand href="#">NavBar</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav v-if="isAuthenticated">
					<b-nav-item href="#">Link</b-nav-item>
					<b-nav-item href="#" disabled>Disabled</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'NavigationBar',
	computed: {
		...mapGetters(['isAuthenticated']),
	},
};
</script>
<style scoped lang="scss"></style>
