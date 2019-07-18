<template>
	<main class="park">
		<link v-if="park.image" :href="park.image['3x2'].sizes.medium.url">
		<header class="park__header">
			<div class="park__image">
				<lazy-image v-if="park.image" :image="park.image" ratio="3x1"></lazy-image>
			</div>
			<div class="park__heading">
				<span class="park__float-title">{{park.title}}</span>
				<button
					:class="'park__love '+(isLoved ? 'park__love--loved': '')"
					@click="lovePark(isLoved)"
				>
					<hello-icon icon="heart"></hello-icon>
					<hello-icon icon="heart-empty"></hello-icon>
				</button>
			</div>
		</header>
		<h1 class="park__title">{{park.title}}</h1>
		<div class="park__loader" v-if="park.loading"></div>
		<div class="park__body" v-else>
			<park-video class="park__video" v-if="park.video" :link="park.video"></park-video>
			<park-gallery class="park__gallery" v-if="park.gallery" :images="park.gallery"></park-gallery>
			<div class="park__content post-content" v-html="park.content"></div>
			<div class="park__contact">
				<a
					class="park__contact-link"
					target="_blank"
					v-if="park.homepage"
					:href="park.homepage"
				>
					<hello-icon icon="link" class="hello-icon--button hello-icon--round"></hello-icon>
					<span v-html="displayUrl(park.homepage)"></span>
				</a>
				<a class="park__contact-link" v-if="park.email" :href="'mailto:'+park.email">
					<hello-icon icon="at" class="hello-icon--button hello-icon--round"></hello-icon>
					{{park.email}}
				</a>
				<a class="park__contact-link" v-if="park.phone" :href="park.phone">
					<hello-icon icon="phone" class="hello-icon--button hello-icon--round"></hello-icon>
					{{park.phone}}
				</a>
				<a
					class="park__contact-link"
					v-if="park.address"
					:href="'https://www.google.com/maps?q='+park.address"
					target="_blank"
				>
					<hello-icon icon="home" class="hello-icon--button hello-icon--round"></hello-icon>
					<span v-html="nl2br(park.address)"></span>
				</a>
				<a
					class="park__contact-link"
					v-if="park.facebook"
					:href="park.facebook"
					target="_blank"
				>
					<hello-icon icon="facebook" class="hello-icon--button hello-icon--round"></hello-icon>
					<span v-html="displayUrl(park.facebook)"></span>
				</a>
			</div>
			<park-weather class="park__weather" :slug="park.slug"></park-weather>
			<share
				class="park__share"
				:title="$t('share_park_title')"
				:text="$t('share_park_text', {'parkTitle': park.title})"
			></share>
		</div>
	</main>
</template>

<script>
	import {storeDB} from '../store/storeDB';
	import {mapState} from 'vuex';
	import content from './../vendor/content';

	const ParkGallery = () => import(/* webpackChunkName: "park" */'./ParkGallery.vue');
	const ParkVideo = () => import(/* webpackChunkName: "park" */'./ParkVideo.vue');
	const ParkWeather = () => import(/* webpackChunkName: "park" */'./ParkWeather.vue');

	let offset = false;

	function setHeadingPosition() {
		const $heading = document.querySelector('.park__heading');
		const $header = document.querySelector('.park__header');
		if ($heading && $header) {
			offset = $header.offsetHeight - $heading.offsetHeight;
			$header.style.top = `-${offset}px`;
		}
	}

	window.addEventListener('resize', () => {
		setHeadingPosition();
	});

	export default {
		data() {
			return {
				isLoved: false
			};
		},
		metaInfo: function () {
			return {
				title: this.park.title
			};
		},
		mounted() {
			storeDB.loved.get(this.$route.params.slug).then(result => {
				if (result) {
					this.isLoved = true;
				}
			});

			this.$store.dispatch('parks/loadSingle', this.$route.params.slug);

			setHeadingPosition();
			const $image = this.$el.querySelector('.park__image');
			const $title = this.$el.querySelector('.park__float-title');

			document.querySelector('#content').addEventListener('scroll', () => {
				if (!offset) {
					return;
				}

				let scroll = document.querySelector('#content').scrollTop;
				if (scroll >= offset) {
					scroll = offset;
				}

				$image.style.opacity = 1 - (1 / offset) * scroll;
				$title.style.opacity = (1 / offset) * scroll;
			});
			content.show();
		},
		beforeDestroy() {
			this.$store.dispatch('parks/loadSingle', false);
			content.hide();
		},
		updated() {
			setHeadingPosition();
		},
		components: {
			ParkGallery,
			ParkVideo,
			ParkWeather
		},
		computed: mapState({
			park: state => state.parks.single
		}),
		methods: {
			nl2br: function (str = '') {
				return str === ''
					? ''
					: (str + '').replace(/(\r\n|\n\r|\r|\n)/g, "<br>$1");
			},
			displayUrl: function (url = '') {
				return url
					.replace(/http:\/\//g, "")
					.replace(/https:\/\//g, "")
					.replace(/www./g, "")
					.replace(/facebook.com/g, "");
			},
			lovePark: function (isLoved) {
				if (isLoved) {
					this.isLoved = false;
					storeDB.loved.delete(this.$route.params.slug);
				} else {
					this.isLoved = true;
					storeDB.loved.set(this.$route.params.slug, this.park);
				}
				this.$snack.success({
					text: this.isLoved
						? this.$t('park_loved')
						: this.$t('park_unloved'),
					button: 'OK'
				});
			}
		}
	};
</script>