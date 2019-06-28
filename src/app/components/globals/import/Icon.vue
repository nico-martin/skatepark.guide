<template>
	<span class="hello-icon">
		<component :is="svg" v-on="$listeners"/>
	</span>
</template>

<script>
	export default {
		name: 'Icon',

		data() {
			return {
				svg: undefined
			}
		},

		props: {
			icon: {
				type: String,
				required: true
			}
		},

		async created() {
			console.log(this.icon);
			const loaded = await import(/* webpackMode: "eager" */ `../../../../icons/mdi/${this.icon}.svg`);
			this.svg = loaded.default
		}
	}
</script>