<template>
	<div>
		<h2 class="settings__heading">{{$t('filter')}}</h2>
		<div class="settings-filter">
			<div v-for="facility in facilities" class="settings-filter__element">
				<input @change="updateCheckedFacilities" :id="'facility-'+facility" :value="facility" type="checkbox" class="settings-filter__checkbox js-park-facilities input-checkbox" checked>
				<label :for="'facility-'+facility" class="settings-filter__label">{{$t('facilities.'+facility)}}</label>
			</div>
		</div>
		<h2 class="settings__heading">{{$t('location')}}</h2>
		<div class="settings-location">
			<button>
				<Icon icon="location"></Icon>
				<input :title="$t('location')" type="text" class="input-text">
			</button>
		</div>
		<h2 class="settings__heading">{{$t('languages.title')}}</h2>
		<div class="settings-lang">
			<button v-for="lang in languages" :class="'settings-lang '+($i18n.locale === lang?'settings-lang--active':'')" v-on:click="setI18nLanguage(lang)">{{$t('languages.'+lang)}}</button>
		</div>
	</div>
</template>

<script>
	import {setI18nLanguage, i18n} from '../i18n';
	import {store} from '../store/store';
	import Icon from '../components/globals/Icon.vue';

	export default {
		data: () => {
			return {
				facilities: ['bowl', 'mini', 'pumptrack', 'street'],
				languages: Object.keys(i18n.messages)
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
		},
		components: {
			Icon
		}
	}
</script>