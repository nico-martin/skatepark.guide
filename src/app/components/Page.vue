<template>
	<div class="content">
		<nav class="content__navigation">
			<localized-link v-for="element in navigation"
			                :key="element"
			                active-class="content__link--active"
			                :to="`/${element}/`"
			                class="content__link"
			>
				{{$t(`menu-${element}-title`)}}
			</localized-link>
		</nav>
		<h1 class="content__title">{{page.title}}</h1>
		<div class="content__loader" v-if="page.loading"></div>
		<div class="content__content" v-else v-html="page.content"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		data() {
			return {
				navigation: ['about', 'imporessum', 'privacy']
			}
		},
		metaInfo: function () {
			return {
				title: this.page.title
			};
		},
		mounted: function () {
			this.$store.dispatch('loadPage', [this.$route.params.page]);
		},
		beforeRouteUpdate(to, from, next) {
			this.$store.dispatch('loadPage', [to.params.page]);
			next();
		},
		computed: mapState(['page'])
	};
</script>