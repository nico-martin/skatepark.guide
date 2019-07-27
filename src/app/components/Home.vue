<template></template>
<script>
	import content from './../vendor/content';

	export default {
		mounted() {
			content.hide();
		},
		beforeDestroy() {
			content.show();
		}
	}
</script>