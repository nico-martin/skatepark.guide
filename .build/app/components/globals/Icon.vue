<template>
	<i class="hello-icon" v-bind:class="addClass" v-html="i"></i>
</template>

<script>
	import account from '../../../icons/mdi/account.svg';
	import information from '../../../icons/mdi/information.svg';
	import markerplus from '../../../icons/mdi/markerplus.svg';
	import plus from '../../../icons/mdi/plus.svg';
	import settings from '../../../icons/mdi/settings.svg';
	import heart from '../../../icons/mdi/heart.svg';
	import heartEmpty from '../../../icons/mdi/heart-empty.svg';

	const icons = {account, information, markerplus, plus, settings, heart, heartEmpty};

	export default {
		props: ['icon', 'addClass'],
		data() {
			return {
				i: (icons.hasOwnProperty(this.icon) ? icons[this.icon] : ''),
				cls: this.addClass
			}
		}
	}
</script>