<template>
	<v-select
		:options="paginated"
		v-model="selected"
		:filterable="false"
		clearable
		@open="onOpen"
		@close="onClose"
		@search="query => (search = query)"
		:multiple="multiple"
		@input="onSelectChange"
		:disabled="isDisabled"
	>
		<template #search="{ attributes, events }">
			<input
				class="vs__search"
				:required="
					required && (!selected || (selected && !Object.keys(selected).length))
				"
				v-bind="attributes"
				v-on="events"
			/>
		</template>
		<template #list-footer>
			<li ref="load" class="loader" v-show="hasNextPage">
				Loading more options...
			</li>
		</template>
	</v-select>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'SelectComponent',
	props: {
		multiple: {
			type: Boolean,
			default: false,
		},
		initial: null,
		required: { type: Boolean, default: false },
	},
	data: () => ({
		observer: null,
		limit: 10,
		search: '',
		users: [],
		total: 0,
		selected: null,
	}),
	async mounted() {
		this.observer = new IntersectionObserver(this.infiniteScroll);
		await this.fetchUsers();
	},
	computed: {
		paginated() {
			return this.users
				.map(el => ({ label: el.fullname, value: el.id }))
				.slice(0, this.limit);
		},
		hasNextPage() {
			return this.users.length < this.total;
		},
		isDisabled() {
			return this.disabled;
		},
	},
	methods: {
		...mapActions(['getUsers']),
		async onOpen() {
			if (this.hasNextPage) {
				await this.$nextTick();
				this.observer.observe(this.$refs.load);
			}
		},
		onClose() {
			this.observer.disconnect();
		},
		async infiniteScroll([{ isIntersecting, target }]) {
			if (isIntersecting && this.hasNextPage) {
				const ul = target.offsetParent;
				const scrollTop = target.offsetParent.scrollTop;
				this.limit += 10;
				await this.fetchUsers();
				ul.scrollTop = scrollTop;
			}
		},
		async fetchUsers() {
			const { users, total } = await this.getUsers({
				page: 0,
				size: this.limit,
				search: this.search,
			});
			this.users = users;
			this.total = total;
		},
		onSelectChange(selected) {
			if (selected)
				this.$emit(
					'selected',
					this.multiple ? selected.map(el => el.value) : selected.value
				);
		},
	},
	watch: {
		initial(val, oldVal) {
			if (val && val !== oldVal) {
				this.selected = this.initial;
			}
		},
	},
};
</script>

<style scoped>
.loader {
	text-align: center;
	color: #bbbbbb;
}
.selected {
	background: blue;
	color: white;
}
</style>
