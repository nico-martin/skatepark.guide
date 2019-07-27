<template>
	<div class="content">
		<nav class="content__navigation">
			<localized-link v-for="(path, key) in navigation" :key="key" active-class="content__link--active" :to="path" class="content__link">
				{{$t(`account_${key}`)}}
			</localized-link>
		</nav>
		<auth class="content__form" v-if="!user"></auth>
		<template v-else>
			<account-parks v-if="('accountPage'in $route.params) && $route.params.accountPage === 'parks'"/>
			<account-profile v-else/>
		</template>
	</div>
</template>

<script>
	import Auth from './Auth.vue';
	import {mapState} from 'vuex';
	import content from './../vendor/content';

	import AccountProfile from './AccountProfile.vue'
	import AccountParks from './AccountParks.vue'

	export default {
		data() {
			return {
				navigation: {
					profile: '/account/profile/',
					parks: '/account/parks/',
				},
				parks: false,
			}
		},
		mounted() {
			content.show();
		},
		beforeDestroy() {
			content.hide();
		},
		computed: mapState({
			user: state => state.user.login
		}),
		components: {
			Auth,
			AccountParks,
			AccountProfile
		}
	};
</script>