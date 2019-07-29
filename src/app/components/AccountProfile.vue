<template>
	<div v-if="loggedin">
		<h1 class="content__title">{{$t('account_your_profile')}}</h1>
		<div class="content__content">
			<p><i>{{$t('account_profile_about')}}</i></p>
			<hello-form formKey="signup"
			            :formSubmit="updateUser"
			            :formError="error"
			            :formLoading="loading"
			            :formSuccess="success"
			            formLayout="table"
			>
				<hello-input v-for="field in fields" :key="field.field" :title="$t(`account_profile_${field.field}`)" :choices="field.choices" :name="field.field" :value="user[field.field]" :type="field.type"/>
			</hello-form>
			<h2>{{$t('account_profile_resetpw')}}</h2>
			<pw-reset/>
		</div>
	</div>
</template>

<script>

	import HelloForm from './globals/HelloForm.vue';
	import HelloInput from './globals/HelloInput.vue';
	import {mapState} from 'vuex';
	import {api} from './../vendor/settings'
	import axios from 'axios';

	import PwReset from './PwResetConfirm.vue';

	export default {
		data() {
			return {
				error: false,
				loading: false,
				success: false,
				fields: {
					firstname: {
						field: 'user_firstname',
						type: 'text',
					},
					lastname: {
						field: 'user_lastname',
						type: 'text',
					},
					url: {
						field: 'user_url',
						type: 'text',
					},
					sportart: {
						field: 'sportart',
						type: 'select',
						choices: {
							all: this.$t('account_profile_sportart_all'),
							skateboard: this.$t('account_profile_sportart_skateboard'),
							inline: this.$t('account_profile_sportart_inline'),
							scooter: this.$t('account_profile_sportart_scooter'),
						}
					},
					description: {
						field: 'description',
						type: 'textarea'
					}
				},
			};
		},
		methods: {
			updateUser(data) {
				this.loading = true;
				this.success = false;
				this.error = false;
				axios.post(api.updateUser, data)
					.then(resp => {
						this.$store.commit('user/setUser', resp.data);
						this.loading = false;
						this.success = this.$t('account_profile_update_success');
					})
					.catch(error => {
						this.loading = false;
						this.error = error.response.data.message;
					});
			}
		},
		mounted() {
			if (!'accountPage' in this.$route.params || this.$route.params.accountPage !== 'profile') {
				this.$router.push(`/${this.$route.params.locale}/account/profile/`);
			}
			this.$store.dispatch('user/loadUserData');
		},
		computed: mapState({
			loggedin: state => state.user.auth,
			user: state => state.user.data
		}),
		components: {
			HelloInput,
			HelloForm,
			PwReset
		}
	};
</script>