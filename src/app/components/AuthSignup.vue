<template>
	<hello-form
		formKey="signup"
		:formSubmit="signup"
		:formError="error"
		:formLoading="loading"
		:submit="$t('auth_signup')"
	>
		<hello-input :title="$t('auth_email')" name="email" type="email"></hello-input>
		<hello-input :title="$t('auth_password')" name="password" type="password"></hello-input>
		<hello-input :title="$t('auth_password2')" name="password2" type="password"></hello-input>
		<div class="form__element">
			<p class="form__privacy-info">{{$t('auth_privacyinfo')}}</p>
		</div>
	</hello-form>
</template>

<script>
	import HelloForm from './globals/HelloForm.vue';
	import HelloInput from './globals/HelloInput.vue';

	export default {
		data() {
			return {
				error: false,
				loading: false
			};
		},
		methods: {
			signup: function (data) {
				this.form.loading = true;
				this.$store
					.dispatch('userSignup', {
						email: data.email,
						password: data.password,
						password2: data.password2
					})
					.catch(error => {
						this.form.loading = false;
						this.form.error = error;
					});
			}
		},
		components: {
			HelloForm,
			HelloInput
		}
	};
</script>