<template>
	<div v-if="videoLink">
		<div class="responsive-iframe">
			<iframe width="560" height="315" v-bind:src="videoLink" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['link'],
		data() {
			let videoLink = false;

			const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
			let m;

			const r = regex.exec(this.link);
			if (r === null) {
				return {
					videoLink
				}
			}

			return {
				videoLink: `https://www.youtube-nocookie.com/embed/${r[1]}`
			}
		}
	};
</script>