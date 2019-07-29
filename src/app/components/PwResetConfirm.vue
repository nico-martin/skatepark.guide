<template>
	<hello-form
		formKey="PwConfirm"
		:formSubmit="onSubmit"
		:formError="form.error"
		:formLoading="form.loading"
		:formSuccess="form.success"
	>
		<hello-input :title="$t('pwreset_password')" name="password" type="password" :required="true"/>
		<hello-input :title="$t('pwreset_password2')" name="password2" type="password" :required="true"/>
		<hello-input name="pwkey" type="hidden" :value="key"></hello-input>
	</hello-form>
</template>
<script>
	import HelloForm from "./globals/HelloForm.vue";
	import HelloInput from "./globals/HelloInput.vue";
	import {api} from "../vendor/settings";
	import axios from "axios";

	export default {
		data() {
			return {
				key: this.$route.params.pwresetkey,
				form: {
					loading: false,
					error: false,
					success: false
				}
			};
		},
		mounted() {
		},
		components: {
			HelloForm,
			HelloInput
		},
		methods: {
			onSubmit: function (data) {
				this.form.loading = true;
				axios
					.post(`${api.password}/confirm/`, data)
					.catch(error => {
						this.form.loading = false;
						this.form.error = error.response.data.message;
					})
					.then(r => {
						this.form.loading = false;
						this.form.success = this.$t('auth_password_changed');
					});
			}
		}
	};
</script>