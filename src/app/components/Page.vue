<template>
	<div class="content">
		<nav class="content__navigation">
			<localized-link v-for="element in navigation"
			                :key="element"
			                active-class="content__link--active"
			                :to="`/${element}/`"
			                class="content__link"
			>
				{{$t(`menu_${element}`)}}
			</localized-link>
		</nav>
		<h1 class="content__title">{{page.title}}</h1>
		<div class="content__loader" v-if="page.loading"></div>
		<div class="content__content" v-else v-html="page.content"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import content from './../vendor/content';

	export default {
		data() {
			return {
				navigation: ['about', 'impressum', 'privacy'],
			}
		},
		metaInfo() {
			return {
				title: this.page.title
			};
		},
		mounted() {
			this.$store.dispatch('page/load', [this.$route.params.page]);
			content.show();
		},
		beforeDestroy() {
			content.hide();
		},
		beforeRouteUpdate(to, from, next) {
			this.$store.dispatch('page/load', [to.params.page]);
			next();
		},
		computed: mapState({
			page: state => state.page.current
		}),
	};
</script>