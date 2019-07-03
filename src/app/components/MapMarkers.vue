<template>

</template>
<script>
	import {mapState} from 'vuex';
	import {maps} from './../vendor/settings';
	import MarkerClusterer from '@google/markerclusterer';
	import mapLoader from './../vendor/gmaps';
	import router from './../router';
	import {i18n} from './../i18n';

	export default {
		data() {
			return {
				markers: [],
				markersSet: [],
				bounds: [],
				cluster: false
			}
		},
		props: {
			map: {
				type: Object,
				required: true
			},
			showLoader: {
				type: Function,
				required: true
			}
		},
		mounted: async function () {
			const google = await mapLoader();
			this.$store.dispatch('parks/loadFromDB');

			this.map.addListener('bounds_changed', () => {
				this.showLoader(true);
				const bounds = this.map.getBounds();
				this.bounds = [
					bounds.getSouthWest().lat(), // min-lat
					bounds.getNorthEast().lat(), // max-lat
					bounds.getSouthWest().lng(), // min-lng
					bounds.getNorthEast().lng() // max-lng
				];
				this.$store.dispatch('parks/loadBounds', this.bounds.join('|'));
			});

			this.$store.subscribe((mutation, state) => {
				if (['parks/setParks', 'parks/setMapFilter'].includes(mutation.type)) {
					this.showLoader(false);

					//console.log(this.filter);

					/*
					for (let i = 0; i < this.markers.length; i++) {
						this.markers[i].setMap(null);
					}
					this.markers = [];
					*/
					Object.keys(state.parks.map).forEach(parkSlug => {
						if (!this.markersSet.includes(parkSlug)) {
							const park = state.parks.map[parkSlug];
							const marker = new google.maps.Marker({
								position: {
									lat: park.map.lat,
									lng: park.map.lng
								},
								icon: maps.marker,
								map: this.map,
								title: park.title,
								facilities: park['parks-facilities']
							});

							google.maps.event.addListener(
								marker,
								'click',
								function () {
									router.push({
										path: `/${i18n.locale}/parks/${parkSlug}/`
									});
								}
							);

							this.markers.push(marker);
							this.markersSet.push(parkSlug)
						}
					});

					if (this.cluster) {
						this.cluster.clearMarkers();
					}
					if (this.markers.length) {
						this.cluster = new MarkerClusterer(this.map, this.markers, {
							styles: maps.clusterStyles
						});
					} else {
						this.cluster = false;
					}
				}
			});
		},
		methods: {},
		computed: mapState({
			filter: state => state.parks.filter
		})
	}
</script>