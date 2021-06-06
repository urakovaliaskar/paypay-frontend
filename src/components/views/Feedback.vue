<template>
	<div>
		<b-textarea
			id="textarea"
			v-model="text"
			placeholder="Write feedback..."
			rows="6"
			max-rows="6"
			:required="false"
			@input="onInput"
		></b-textarea>
	</div>
</template>

<script>
export default {
	name: 'Feedback',
	data: () => ({
		text: '',
	}),
	methods: {
		onInput(text) {
			this.$emit('change', text);
		},
	},
};
</script>

<style scoped lang="scss">
#textarea {
	&:focus {
		border-color: #ced4da;
		box-shadow: unset;
	}
}
</style>
