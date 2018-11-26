<template>
	<div class="park">
		<div class="park__image" v-html="park.image"></div>
		<h1 class="park__title">{{park.title}}</h1>
		<div class="park__loader" v-if="park.loading"></div>
		<div class="park__body" v-else v-html="park.content"></div>
		<div style="height: 3000px"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		mounted: function () {
			this.$store.dispatch('loadPark', this.$route.params.slug);
		},
		computed: mapState([
			'park'
		])
	}
</script>