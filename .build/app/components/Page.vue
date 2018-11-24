<template>
	<div class="content">
		<nav class="content__navigation">
			<router-link active-class="content__link--active" to="/about/" class="content__link">About</router-link>
			<router-link active-class="content__link--active" to="/impressum/" class="content__link">Impressum</router-link>
			<router-link active-class="content__link--active" to="/privacy/" class="content__link">Privacy</router-link>
		</nav>
		<h1 class="content__title">{{page.title}}</h1>
		<div class="content__loader" v-if="page.loading"></div>
		<div class="content__content" v-else v-html="page.content"></div>
	</div>

</template>

<script>
	import {mapState} from 'vuex';

	const pages = {
		'about': {
			'title': 'About',
			'path': 'pages/2086/'
		},
		'impressum': {
			'title': 'Impressum',
			'path': 'pages/2084/'
		},
		'privacy': {
			'title': 'Data Privacy',
			'path': 'pages/2088/'
		}
	};

	export default {
		mounted: function () {
			this.$store.dispatch('loadPage', [this.$route.params.page, pages]);
		},
		beforeRouteUpdate(to, from, next) {
			this.$store.dispatch('loadPage', [to.params.page, pages]);
			next();
		},
		computed: mapState([
			'page'
		])
	}
</script>