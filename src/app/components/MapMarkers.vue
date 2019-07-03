<template>

</template>
<script>
	import {mapState} from 'vuex';
	import {maps} from './../vendor/settings';
	import MarkerClusterer from '@google/markerclustererplus';
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
				if (mutation.type === 'parks/setParks') {
					this.clusterClear();
					this.showLoader(false);
					Object.keys(state.parks.map).forEach(parkSlug => {
						if (!this.markersSet.includes(parkSlug)) {
							const park = state.parks.map[parkSlug];
							let marker = new google.maps.Marker({
								position: {
									lat: park.map.lat,
									lng: park.map.lng
								},
								icon: maps.marker,
								map: null,
								title: park.title,
								facilities: park.facilities
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
							this.markersSet.push(parkSlug);
						}
					});
					this.markers.forEach((marker, index) => {
						this.filterMarker(index);
					});
					this.clusterSet();
				} else if (mutation.type === 'parks/setMapFilter') {
					this.clusterClear();
					this.markers.forEach((marker, index) => {
						this.filterMarker(index);
					});
					this.clusterSet();
				}
			});
		},
		methods: {
			clusterClear: function () {
				if (this.cluster) {
					this.cluster.clearMarkers();
				}
			},
			clusterSet: function () {
				if (this.markers.length) {
					if (this.cluster) {
						const filtered = this.markers.filter(marker => {
							return marker.getMap() !== null;
						});
						this.cluster.addMarkers(filtered);
					} else {
						this.cluster = new MarkerClusterer(this.map, this.markers, {
							styles: maps.clusterStyles
						});
					}
				} else {
					this.cluster = false;
				}
			},
			filterMarker(index) {
				let valid = false;
				Object.keys(this.filter).forEach(f => {
					if (this.filter[f] && this.markers[index].facilities[f] === '1') {
						valid = true;
					}
				});
				this.markers[index].setMap(valid ? this.map : null);
			}
		},
		computed: mapState({
			filter: state => state.parks.filter
		})
	}
</script>