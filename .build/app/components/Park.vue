<template>
	<main class="park">
		<header class="park__header">
			<div class="park__image">
				<LazyImage v-if="park.image" :image="park.image" ratio="3x1"></LazyImage>
			</div>
			<div class="park__heading">
				<span class="park__float-title">{{park.title}}</span>
				<button class="park__love">
					<Icon icon="heartEmpty"></Icon>
				</button>
			</div>
		</header>
		<h1 class="park__title">{{park.title}}</h1>
		<div class="park__loader" v-if="park.loading"></div>
		<div class="park__body" v-else>
			<div class="park__video" v-if="park.video" v-html="getYoutubeIFrame(park.video)"></div>
			<ParkGallery v-if="park.gallery" :images="park.gallery"></ParkGallery>
			<div class="park__content post-content" v-html="park.content"></div>
		</div>
	</main>
</template>

<script>
	import Icon from './globals/Icon.vue';
	import LazyImage from './globals/LazyImage.vue';
	import ParkGallery from './ParkGallery.vue';
	import {mapState} from 'vuex';

	let offset = false;

	function getYoutubeIFrame(link) {
		const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
		let m;

		const r = regex.exec(link);
		if (r === null) {
			return '';
		}

		return `<div class="responsive-iframe"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${r[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
	}

	function setHeadingPosition() {
		const $heading = document.querySelector('.park__heading');
		const $header = document.querySelector('.park__header');
		offset = $header.offsetHeight - $heading.offsetHeight;
		$header.style.top = `-${offset}px`;
	}

	function scrollContent() {
		if (!offset) {
			return;
		}

		let scroll = document.querySelector('#content').scrollTop;
		if (scroll >= offset) {
			scroll = offset;
		}
		document.querySelector('.park__image').style.opacity = 1 - (1 / offset * scroll);
		document.querySelector('.park__float-title').style.opacity = (1 / offset * scroll);
		//$image.style.transform = `translateY(${($image.offsetHeight - ($image.offsetHeight * opacity / 2) - $image.offsetHeight / 2) / 2}px)`;
	}

	window.addEventListener('resize', () => {
		setHeadingPosition();
	});

	export default {
		data() {
			return {
				getYoutubeIFrame
			}
		},
		metaInfo: function () {
			return {
				title: this.park.title
			};
		},
		mounted: function () {
			this.$store.dispatch('loadPark', this.$route.params.slug);

			setHeadingPosition();
			document.querySelector('#content').addEventListener('scroll', scrollContent);
		},
		updated: function () {
			setHeadingPosition();
		},
		components: {
			Icon,
			LazyImage,
			ParkGallery
		},
		computed: mapState([
			'park'
		])
	}
</script>