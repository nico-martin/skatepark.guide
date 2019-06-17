<template>
	<HelloForm
		formKey="PwReset"
		:formSubmit="onSubmit"
		:formError="form.error"
		:formLoading="form.loading"
		:formSuccess="form.success"
	>
		<HelloInput :title="$t('pwreset_email')" name="email" type="email" :required="true"></HelloInput>
	</HelloForm>
</template>
<script>
	import HelloForm from './globals/HelloForm.vue';
	import HelloInput from './globals/HelloInput.vue';
	import {api} from '../vendor/settings';
	import axios from 'axios';

	export default {
		data() {
			return {
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
					.post(`${api.base}skateparkguide/v1/password/reset/`, data)
					.catch(error => {
						this.form.loading = false;
						this.form.error = error.response.data.message;
					})
					.then(r => {
						this.form.loading = false;
						this.form.success = r.data.message;
					});
			}
		}
	};
</script>