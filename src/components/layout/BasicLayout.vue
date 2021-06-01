<template>
	<div>
		<navigation-bar />
		<router-view></router-view>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
import NavigationBar from '@/components/global/NavigationBar';
export default {
	name: 'App',
	components: { NavigationBar },
};
</script>
<style lang=""></style>
