<template>
	<div v-if="user">
		<h1 class="content__title">{{$t('account_your_parks')}}</h1>
		<div class="content__content">
			<p>Hello {{user.user_display_name}}</p>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		computed: mapState({
			user: state => state.user.login
		}),
	};
</script>