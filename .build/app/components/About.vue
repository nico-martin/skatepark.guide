<template>
	<p>About</p>
</template>

<script>
	import fade from './../modules/fade';

	export default {
		mounted: function () {
			fade.in('.app__overlay');
			document.getElementById('menu').setAttribute('data-state', 'back');
		}
	}
</script>