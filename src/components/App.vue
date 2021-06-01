<template>
	<router-view></router-view>
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
};
</script>
<style scoped lang="scss"></style>
