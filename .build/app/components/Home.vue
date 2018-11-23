<template></template>
<script>
	import content from './../modules/content';

	export default {
		mounted: function () {
			content.hide();
		},
		beforeDestroy: function () {
			content.show();
		}
	}
</script>