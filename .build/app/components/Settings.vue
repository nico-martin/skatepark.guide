<template>
	<div>
		<h2>{{$t('filter')}}</h2>
		<div v-for="facility in facilities" class="settings-filter">
			<input @change="updateCheckedFacilities" :id="'facility-'+facility" :value="facility" type="checkbox" class="settings-filter__checkbox js-park-facilities" checked>
			<label :for="'facility-'+facility" class="settings-filter__label">{{$t('facilities.'+facility)}}</label>
		</div>
		<h2>{{$t('languages')}}</h2>
		<button v-on:click="setI18nLanguage('de')">Deutsch</button>
		<button v-on:click="setI18nLanguage('en')">English</button>
	</div>
</template>

<script>
	import {setI18nLanguage} from '../i18n';
	import {store} from '../store/store';

	export default {
		data: () => {
			return {
				facilities: ['bowl', 'mini', 'pumptrack', 'street']
			}
		},
		methods: {
			setI18nLanguage,
			updateCheckedFacilities: function (e) {
				const facilities = {};
				this.$el.querySelectorAll('.js-park-facilities').forEach(($el) => {
					facilities[$el.getAttribute('value')] = $el.checked;
				});

				store.dispatch('changeMapFilter', facilities);
			}
		}
	}
</script>