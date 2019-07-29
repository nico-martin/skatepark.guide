<template>
	<div class="o-helloform__feedback o-helloform__feedback--success" v-if="formSuccess">
		<p>{{formSuccess}}</p>
	</div>
	<form v-else :id="formKey" :class="`o-helloform o-helloform--${formLayout}`" @submit.prevent="onSubmit">
		<div class="o-helloform__feedback o-helloform__feedback--error" v-if="formError">
			<p>{{formError}}</p>
		</div>
		<slot></slot>
		<div class="o-helloform__element o-helloform__element--controls">
			<button
				class="button o-helloform__control"
				type="submit"
				:disabled="formLoading"
			>{{submitButton}}
			</button>
		</div>
	</form>
</template>
<script>
	export default {
		props: {
			formKey: {
				type: String,
				required: true
			},
			formLayout: {
				type: String,
				default: 'block'
			},
			formLoading: {
				type: Boolean,
				required: true
			},
			formError: {
				type: Boolean | String,
				required: true
			},
			formSuccess: {
				type: Boolean | String,
				required: false
			},
			formSubmit: {
				type: Function,
				required: true
			},
			submit: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				submitButton: this.submit !== '' ? this.submit : this.$t('form_send')
			};
		},
		methods: {
			onSubmit: function ($form) {
				const $fields = $form.target.querySelectorAll('input, select, textarea');
				const data = {};
				$fields.forEach(function ($field) {
					if ($field.getAttribute('type') === 'checkbox') {
						data[$field.getAttribute('name')] = $field.checked;
					} else {
						data[$field.getAttribute('name')] = $field.value;
					}
				});
				this.formSubmit(data);
			}
		}
	};
</script>
