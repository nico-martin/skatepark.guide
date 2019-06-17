<template>
	<div class="content">
		<h1 class="content__title">Account</h1>
		<Auth class="content__form" v-if="!user"></Auth>
		<template v-else>
			<p>Hello {{user.user_display_name}}</p>
		</template>
	</div>
</template>

<script>
	import Auth from './Auth.vue';
	import {mapState} from 'vuex';

	export default {
		mounted() {
		},
		computed: mapState(['user']),
		components: {
			Auth
		}
	};
</script>