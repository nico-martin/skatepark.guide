<template>
	<div id="map" class="app__map parks-map">
		Map
	</div>
</template>

<script>
	import axios from 'axios';
	import {userSet, userGet} from '../store/userSettings';
	import GoogleMapsLoader from 'google-maps';
	import {maps} from '../modules/settings';

	GoogleMapsLoader.KEY = maps.key;
	GoogleMapsLoader.load(async function (google) {
		const center = await getCenter();
		const zoom = await getZoom();
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: zoom,
			center: {
				lat: center.lat,
				lng: center.lng
			},
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: maps.styles
		});

		map.addListener('center_changed', function () {
			userSet('mapCenter', {
				'lat': map.getCenter().lat(),
				'lng': map.getCenter().lng()
			});
		});

		map.addListener('zoom_changed', function () {
			userSet('mapZoom', map.getZoom());
		});
	});

	function getCenter() {
		return new Promise((resolve) => {
			userGet('mapCenter').then(resp => {
				if (typeof resp !== 'undefined') {
					resolve(resp);
				} else {
					axios.get('https://ipapi.co/json')
						.then(function (response) {
							const data = {
								'lat': response.data.latitude,
								'lng': response.data.longitude
							};
							userSet('mapCenter', data);
							resolve(data);
						});
				}
			});
		});
	}

	function getZoom() {
		return new Promise((resolve) => {
			userGet('mapZoom').then(resp => {
				if (typeof resp !== 'undefined') {
					resolve(resp);
				} else {
					userSet('mapZoom', 9);
					resolve(9);
				}
			});
		});
	}
</script>