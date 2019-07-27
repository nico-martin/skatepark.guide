<template>
	<div v-if="user">
		<h1 class="content__title">{{$t('account_your_profile')}}</h1>
		<div class="content__content">
			<p><i>{{$t('account_profile_about')}}</i></p>
			<hello-form formKey="signup"
			            :formSubmit="updateUser"
			            :formError="error"
			            :formLoading="loading">
				<hello-input :title="$t('auth_email')" name="name"></hello-input>
			</hello-form>
		</div>
	</div>
</template>

<script>

	import HelloForm from './globals/HelloForm.vue';
	import HelloInput from './globals/HelloInput.vue';
	import {mapState} from 'vuex';

	export default {
		data() {
			return {
				error: false,
				loading: false
			};
		},
		methods: {
			updateUser(data) {
				this.loading = true;
				/*
				this.$store
					.dispatch('user/signup', {
						email: data.email,
						password: data.password,
						password2: data.password2
					})
					.catch(error => {
						this.loading = false;
						this.error = error;
					});
					*/
			}
		},
		mounted() {
			if (!'accountPage' in this.$route.params || this.$route.params.accountPage !== 'profile') {
				this.$router.push(`/${this.$route.params.locale}/account/profile/`);
			}
		},
		computed: mapState({
			user: state => state.user.login
		}),
		components: {
			HelloInput,
			HelloForm
		}
	};
</script>