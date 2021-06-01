<template>
	<div>
		<b-alert
			:show="!!error"
			dismissible
			class="position-fixed fixed-bottom m-0 rounded-0"
			style="z-index: 2000"
			variant="danger"
			@dismissed="SET_ERROR(null)"
		>
			{{ error }}
		</b-alert>
		<navigation-bar />
		<router-view></router-view>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import NavigationBar from '@/components/global/NavigationBar';
export default {
	name: 'App',
	components: { NavigationBar },
	computed: mapState(['error']),
	methods: {
		...mapMutations(['SET_ERROR']),
	},
	watch: {
		error(newVal, oldVal) {
			if (newVal && newVal !== oldVal) {
				setTimeout(() => {
					this.SET_ERROR(null);
				}, 5000);
			}
		},
	},
};
</script>
<style lang=""></style>
