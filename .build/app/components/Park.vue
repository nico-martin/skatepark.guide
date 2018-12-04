<template>
	<main class="park">
		<header class="park__header">
			<div class="park__image" v-html="park.image"></div>
			<div class="park__heading">
				<span class="park__float-title">{{park.title}}</span>
				<button class="park__love" v-html="icon('heartEmpty')"></button>
			</div>
		</header>
		<h1 class="park__title">{{park.title}}</h1>
		<div class="park__loader" v-if="park.loading"></div>
		<div class="park__body" v-else>
			<div class="park__video" v-if="park.video" v-html="getYoutubeIFrame(park.video)"></div>
			<div class="park__gallery js-fallback" v-if="park.gallery" v-html="getParkGallery(park.gallery)"></div>
			<div class="park__content post-content" v-html="park.content"></div>
		</div>
		<div style="height: 3000px"></div>
	</main>
</template>

<script>
	import {mapState} from 'vuex';
	import {icon} from '../modules/icons.js';
	import lazyimage from '../modules/lazyimage';
	import Flickity from 'flickity';
	import PhotoSwipe from 'photoswipe';
	import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

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

	function getParkGallery(images) {
		let template = '';
		images.forEach(function (image) {
			template += `<a class="park__gallery-element" href="${image.org.sizes.window.url}" data-width="${image.org.sizes.window.width}" data-height="${image.org.sizes.window.height}"  target="_blank">${lazyimage(image, '3x2')}</a>`;
			//template += `<a class="park__gallery-element" href="${image.org.sizes.window.url}" target="_blank"><img src="${image.org.sizes.medium.url}" /></a>`;
			//template += `${lazyimage(image, '4x3')}`;
		});
		return template;
	}

	function doGallery() {
		const $gallery = document.querySelector('.park__gallery');
		if ($gallery === null) {
			return;
		}
		if (!$gallery.classList.contains('js-fallback')) {
			return;
		}
		$gallery.classList.remove('js-fallback');
		const flkty = new Flickity('.park__gallery', {
			cellAlign: 'left',
			imagesLoaded: true,
			pageDots: false,
			percentPosition: false
		});

		const pswpElement = document.querySelectorAll('.pswp')[0];
		const items = [];
		const $links = $gallery.querySelectorAll('.park__gallery-element');
		$links.forEach(($el) => {
			items.push({
				'src': $el.getAttribute('href'),
				'w': $el.getAttribute('data-width'),
				'h': $el.getAttribute('data-height')
			});
		});

		let options = {
			history: false,
			fullscreenEl: false,
			zoomEl: false,
			shareEl: false,
			bgOpacity: .9,
			showHideOpacity: true
		};

		let i = 0;
		$links.forEach(($el) => {
			$el.setAttribute('data-index', i);
			i++;
			$el.onclick = function (event) {
				event.preventDefault();
				options['index'] = parseInt($el.getAttribute('data-index'));
				options['getThumbBoundsFn'] = function (index) {
					const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
					const rect = $el.getBoundingClientRect();
					return {
						x: rect.left,
						y: rect.top + pageYScroll,
						w: rect.width
					};
				};
				const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
				gallery.listen('afterChange', function () {
					flkty.select(gallery.getCurrentIndex());
				});
			}
		});
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

	const PsTemplate = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';

	export default {
		data() {
			return {
				icon,
				getYoutubeIFrame,
				getParkGallery
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
			doGallery();
			if (document.getElementById('PhotoSwipeTemplate') === null) {
				const e = document.createElement('div');
				e.setAttribute('id', 'PhotoSwipeTemplate');
				e.innerHTML = PsTemplate;
				document.body.appendChild(e);
			}
		},
		computed: mapState([
			'park'
		])
	}


</script>