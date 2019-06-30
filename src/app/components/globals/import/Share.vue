<template>
	<button v-if="show" class="button button--has-icon button--transparent" @click="share()">
		<hello-icon icon="share"></hello-icon>
		{{title}}
	</button>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: 'Share this content'
			},
			text: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show: 'share' in navigator
			};
		},
		methods: {
			share: function () {
				let url = this.url;
				if ('' === url) {
					url = location.origin + this.$router.currentRoute.fullPath;
				}
				navigator
					.share({
						title: this.title,
						text: this.text,
						url
					})
					.then(() => console.log('Successful share'))
					.catch(error => console.log('Error sharing', error));
			}
		}
	};
</script>