<template>
	<div>
		<b-navbar toggleable="sm" variant="primary" type="dark" small>
			<b-navbar-brand
				><span class="brand">PayPay</span>
				<p class="undertext">Performance review</p></b-navbar-brand
			>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item
						:to="{ path: '/reviews' }"
						:active="$route.name === 'reviews'"
						>Reviews</b-nav-item
					>
					<b-nav-item
						v-if="isAdmin"
						:to="{ path: '/users' }"
						:active="$route.name === 'users'"
						>Users</b-nav-item
					>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							{{ user | getFullName }}
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
<style scoped lang="scss">
.brand {
	letter-spacing: 1px;
}
.undertext {
	font-size: 0.5rem;
	margin: 0;
}
.navbar-brand {
	padding: 0;
}
</style>
