<template>
	<p>About</p>
</template>

<script>
	import overlay from './../modules/overlay';

	export default {
		mounted: function () {
			overlay.show();
			document.getElementById('menu').setAttribute('data-state', 'back');
		}
	}
</script>