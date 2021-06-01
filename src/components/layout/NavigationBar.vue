<template>
	<div>
		<b-navbar toggleable="md" variant="primary" type="dark">
			<b-navbar-brand>PayPay</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav v-if="isAdmin">
					<b-nav-item
						:to="{ path: '/reviews' }"
						:active="$route.name === 'home'"
						>Home</b-nav-item
					>
					<b-nav-item :to="{ path: '/users' }" :active="$route.name === 'users'"
						>Users</b-nav-item
					>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<em>{{ user | getFullName }}</em>
						</template>
						<b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'NavigationBar',
	filters: {
		getFullName(user) {
			return user && user.firstname + ' ' + user.lastname;
		},
	},
	computed: {
		...mapGetters(['isAdmin', 'user']),
	},
	methods: {
		...mapActions(['logout']),
	},
};
</script>
<style scoped lang="scss"></style>
