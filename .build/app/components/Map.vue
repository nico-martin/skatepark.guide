<template>
	<div class="app__map parks-map">
		<div class="parks-map__loader"></div>
		<div id="map" class="parks-map__map"></div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {store} from '../store/store';
	import {mapState} from 'vuex';
	import userSettings from '../store/userSettings';
	import GoogleMapsLoader from 'google-maps';
	import MarkerClusterer from '@google/markerclusterer';
	import {maps} from '../modules/settings';
	import fade from '../modules/fade';

	let map = false;
	let loadParksTimer = 'init';
	const markers = [];
	const markersSet = [];
	let markerCluster = false;

	export default {
		mounted() {

			GoogleMapsLoader.KEY = maps.key;
			GoogleMapsLoader.load(async function (google) {
				const center = await getCenter();
				const zoom = await getZoom();

				map = new google.maps.Map(document.getElementById('map'), {
					zoom: zoom,
					center: {
						lat: center.lat,
						lng: center.lng
					},
					disableDefaultUI: true,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: maps.styles
				});

				store.subscribe((mutation, state) => {
					if (mutation.type === 'SET_PARKS') {

						let i = 0;
						for (let park in state.map) {
							if (state.map.hasOwnProperty(park)) {
								if (markersSet.includes(park)) {
									continue;
								}
								i++;
								const marker = new google.maps.Marker({
									position: {
										lat: state.map[park].map.lat,
										lng: state.map[park].map.lng
									},
									icon: maps.marker,
									map: map,
									title: state.map[park].title
								});
								markers.push(marker);
								markersSet.push(park);
							}
						}

						if (markerCluster) {
							markerCluster.clearMarkers();
						}
						if (markers.length) {
							markerCluster = new MarkerClusterer(map, markers, {styles: maps.clusterStyles});
						} else {
							markerCluster = false;
						}

						fade.out('.parks-map__loader');
					}
				});

				map.addListener('bounds_changed', function () {

					clearTimeout(loadParksTimer);
					if (loadParksTimer === 'init') {
						// load on init
						loadParks(map.getBounds());
						loadParksTimer = false;
					} else {
						// wait for 500ms on move
						loadParksTimer = setTimeout(() => {
							loadParks(map.getBounds());
						}, 500);
					}
				});

				map.addListener('center_changed', function () {
					userSettings.set('mapCenter', {
						'lat': map.getCenter().lat(),
						'lng': map.getCenter().lng()
					});
				});

				map.addListener('zoom_changed', function () {
					userSettings.set('mapZoom', map.getZoom());
				});
			});
		}
	}

	function loadParks() {
		if (!map) {
			return;
		}

		fade.in('.parks-map__loader');
		const bounds = [
			map.getBounds().getSouthWest().lat(), // min-lat
			map.getBounds().getNorthEast().lat(), // max-lat
			map.getBounds().getSouthWest().lng(), // min-lng
			map.getBounds().getNorthEast().lng() // max-lng
		];

		store.dispatch('loadMapParks', bounds.join('|'));
	}

	function getCenter() {
		return new Promise((resolve) => {
			userSettings.get('mapCenter').then(resp => {
				if (typeof resp !== 'undefined') {
					resolve(resp);
				} else {
					axios.get('https://ipapi.co/json')
						.then(function (response) {
							const data = {
								'lat': response.data.latitude,
								'lng': response.data.longitude
							};
							userSettings.set('mapCenter', data);
							resolve(data);
						});
				}
			});
		});
	}

	function getZoom() {
		return new Promise((resolve) => {
			userSettings.get('mapZoom').then(resp => {
				if (typeof resp !== 'undefined') {
					resolve(resp);
				} else {
					userSettings.set('mapZoom', 9);
					resolve(9);
				}
			});
		});
	}
</script>