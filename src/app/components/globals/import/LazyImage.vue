<template>
	<figure :class="bemBlock">
		<img :class="bemBlock+'__preview'" :src="img.placeholder"/>
		<img :width="biggestWidth" :height="biggestHeight" :class="bemBlock+'__image '+bemBlock+'__image--lazyload'" data-sizes="auto" :src="image.placeholder" :data-srcset="srcSet"/>
	</figure>
</template>

<script>
	export default {
		props: {
			image: {
				type: Object,
				required: true
			},
			ratio: {
				type: String,
				default: 'org'
			},
			biggestSize: {
				type: [Boolean, String],
				default: false
			},
			bemBlock: {
				type: String,
				default: 'lazyimage'
			}
		},
		data() {

			if (typeof this.image[this.ratio] === 'undefined') {
				console.warn('Invalid Image ratio');
				return {};
			}

			const img = this.image[this.ratio];
			let biggestSize = this.biggestSize;
			let biggestWidth = 0;
			let biggestHeight = 0;
			if (biggestSize && biggestSize in img['sizes']) {
				biggestWidth = img['sizes'][biggestSize]['width'];
				biggestHeight = img['sizes'][biggestSize]['height'];
			} else {
				biggestSize = false;
			}

			const sizes = {};
			Object.keys(img['sizes']).forEach((size) => {
				if (!biggestSize && img['sizes'][size]['width'] >= biggestWidth) {
					biggestWidth = img['sizes'][size]['width'];
					biggestHeight = img['sizes'][size]['height'];
				}
				sizes[img['sizes'][size]['width']] = img['sizes'][size]['url'];
			});

			const sizesArray = [];
			Object.keys(sizes).forEach((size) => {
				sizesArray.push(`${sizes[size]} ${size}w`);
			});

			return {
				img,
				biggestWidth: biggestWidth + 'px',
				biggestHeight: biggestHeight + 'px',
				srcSet: sizesArray.join(', ')
			}
		}
	}
</script>