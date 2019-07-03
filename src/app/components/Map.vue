<template>
	<div class="app__map parks-map">
		<div class="parks-map__loader" :aria-hidden="(loader?'false':'true')"></div>
		<div id="map" class="parks-map__map">
			<map-markers v-if="map" :map="map" :showLoader="showLoader"></map-markers>
		</div>
	</div>
</template>

<script>
	import mapLoader from './../vendor/gmaps';
	import {maps} from '../vendor/settings';
	import {storeDB} from '../store/storeDB';
	import axios from 'axios';

	const MapMarkers = () => import(/* webpackChunkName: "map-markers" */'./MapMarkers.vue');

	export default {
		data() {
			return {
				map: false,
				google: false,
				loader: false
			};
		},
		mounted: async function () {
			this.google = await mapLoader();
			const center = await getCenter();
			const zoom = await getZoom();
			this.map = new this.google.maps.Map(document.getElementById('map'), {
				zoom: zoom,
				center: {
					lat: center.lat,
					lng: center.lng
				},
				disableDefaultUI: true,
				mapTypeId: this.google.maps.MapTypeId.ROADMAP,
				styles: maps.styles
			});

			this.map.addListener('center_changed', () => {
				storeDB.settings.set('mapCenter', {
					lat: this.map.getCenter().lat(),
					lng: this.map.getCenter().lng()
				});
			});

			this.map.addListener('zoom_changed', () => {
				storeDB.settings.set('mapZoom', this.map.getZoom());
			});
		},
		methods: {
			showLoader: function (show = true) {
				if (show === true) {
					this.loader = true;
				} else {
					this.loader = false;
				}
			}
		},
		components: {
			MapMarkers
		}
	}

	function getCenter() {
		return new Promise(resolve => {
			storeDB.settings.get('mapCenter').then(resp => {
				if (typeof resp !== 'undefined') {
					resolve(resp);
				} else {
					axios.get('https://ipapi.co/json').then(function (response) {
						const data = {
							lat: response.data.latitude,
							lng: response.data.longitude
						};
						storeDB.settings.set('mapCenter', data);
						resolve(data);
					});
				}
			});
		});
	}

	function getZoom(defaultZoom = 9) {
		return new Promise(resolve => {
			storeDB.settings.get('mapZoom').then(resp => {
				if (resp) {
					resolve(resp);
				} else {
					storeDB.settings.set('mapZoom', defaultZoom);
					resolve(defaultZoom);
				}
			});
		});
	}
</script>