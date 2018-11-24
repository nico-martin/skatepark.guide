<template>
	<div class="content">
		<nav class="content__navigation">
			<router-link active-class="content__link--active" to="/about/" class="content__link">About</router-link>
			<router-link active-class="content__link--active" to="/impressum/" class="content__link">Impressum</router-link>
			<router-link active-class="content__link--active" to="/privacy/" class="content__link">Privacy</router-link>
		</nav>
		<h1 class="content__title">{{title}}</h1>
		<div class="content__loader" v-if="loading"></div>
		<div class="content__content" v-else>
			{{content}}
		</div>
	</div>

</template>

<script>

	const pages = {
		'about': {
			'title': 'About',
			'path': ''
		},
		'impressum': {
			'title': 'Impressum',
			'path': ''
		},
		'privacy': {
			'title': 'Data Privacy',
			'path': ''
		}
	};

	export default {
		data: function () {
			return {
				title: (pages[this.$route.params.page] ? pages[this.$route.params.page].title : '404'),
				content: 'ddd',
				loading: true
			}
		},
		beforeRouteUpdate(to, from, next) {
			this.title = (pages[to.params.page] ? pages[to.params.page].title : '404');
			this.content = '';
			this.loading = true;
			next();
		}
	}
</script>