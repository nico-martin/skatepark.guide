<template>
	<div v-if="loggedin">
		<h1 class="content__title">{{$t('account_your_parks')}}</h1>
		<div class="content__content">
			<p>Hello User</p>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		computed: mapState({
			loggedin: state => state.user.auth
		}),
	};
</script>