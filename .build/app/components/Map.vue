<template>
	<div id="map" class="app__map parks-map">
		Map
	</div>
</template>

<script>
	import axios from 'axios';

	axios.get('http://ip-api.com/json')
		.then(function (response) {
			console.log(response.data.lat);
			console.log(response.data.lon);
		})
		.catch(function (error) {
			console.log(error);
		});
</script>