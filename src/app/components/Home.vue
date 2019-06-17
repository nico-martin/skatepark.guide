<template></template>
<script>
	import content from './../vendor/content';

	export default {
		mounted: function () {
			content.hide();
		},
		beforeDestroy: function () {
			content.show();
		}
	}
</script>