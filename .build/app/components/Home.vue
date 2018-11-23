<template></template>
<script>
	import fade from './../modules/fade';

	export default {
		mounted: function () {
			fade.out('.app__overlay');
			document.getElementById('menu').setAttribute('data-state', 'closed');
		}
	}
</script>