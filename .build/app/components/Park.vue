<template>
	<main class="park">
		<header class="park__header">
			<div class="park__image" v-html="park.image"></div>
			<div class="park__heading">
				<h1 class="park__title">{{park.title}}</h1>
				<button class="park__love" v-html="icon('heartEmpty')"></button>
			</div>
		</header>
		<div class="park__loader" v-if="park.loading"></div>
		<div class="park__body" v-else>
			<div class="park__content" v-html="park.content"></div>
		</div>
		<div style="height: 3000px"></div>
	</main>
</template>

<script>
	import {mapState} from 'vuex';
	import {icon} from '../modules/icons.js';

	export default {
		data() {
			return {
				icon
			}
		},
		metaInfo: function () {
			return {
				title: this.park.title
			};
		},
		mounted: function () {

			this.$store.dispatch('loadPark', this.$route.params.slug);
			let offset = false;

			setHeadingPosition();

			function setHeadingPosition() {
				const $heading = document.querySelector('.park__heading');
				const $header = document.querySelector('.park__header');
				offset = $header.offsetHeight - $heading.offsetHeight;
				$header.style.top = `-${offset}px`;
			}

			window.addEventListener('resize', () => {
				setHeadingPosition();
			});

			const $content = document.querySelector('#content');
			const $image = document.querySelector('.park__image');

			$content.addEventListener('scroll', () => {
				if (!offset) {
					return;
				}

				let scroll = $content.scrollTop;
				if (scroll >= offset) {
					scroll = offset;
				}
				const opacity = 1 - (1 / offset * scroll);
				$image.style.opacity = opacity;
				$image.style.transform = `translateY(${($image.offsetHeight - ($image.offsetHeight * opacity / 2) - $image.offsetHeight / 2) / 2}px)`;
			});
		},
		computed: mapState([
			'park'
		])
	}
</script>