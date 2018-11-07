<template></template>
<script>
	import overlay from './../modules/overlay';

	export default {
		mounted: function () {
			overlay.hide();
			document.getElementById('menu').setAttribute('data-state', 'closed');
		}
	}
</script>