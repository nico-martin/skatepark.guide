<template>
	<HelloForm
		formKey="login"
		:formSubmit="login"
		:formError="error"
		:formLoading="loading"
		:submit="$t('auth_login')"
	>
		<HelloInput :title="$t('auth_email')" name="email" type="email"></HelloInput>
		<HelloInput :title="$t('auth_password')" name="password" type="password"></HelloInput>
		<router-link
			:to="'/'+this.$i18n.locale+'/account/password-reset/'"
			class="form__control form__control--pwreset"
		>{{$t('auth_pwreset')}}
		</router-link>
	</HelloForm>
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
			login: function (data) {
				if (data.email === '' || data.password === '') {
					this.error = this.$t('auth_form_empty');
					return;
				}
				this.loading = true;
				this.$store
					.dispatch('user/validate', {
						email: data.email,
						password: data.password
					})
					.catch(respData => {
						this.error = this.$t('auth_form_error');
						this.loading = false;
					})
					.then(respData => {
						this.loading = false;
					});
			}
		},
		components: {
			HelloForm,
			HelloInput
		}
	};
</script>