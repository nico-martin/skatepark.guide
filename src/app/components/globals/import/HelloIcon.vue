<template>
	<span class="hello-icon">
		<icon :icon="icon" folder="mdi/"></icon>
	</span>
</template>
<script>

	export default {

		props: {
			icon: {
				type: String,
				required: true
			}
		},
	}
</script>