<template>
	<select class="input-select" name="language" id="language" @change="setLanguage">
		<option
			v-for="lang in languages"
			:value="lang"
			:selected="$i18n.locale === lang"
			:key="lang"
		>{{$t('languages_'+lang)}}
		</option>
	</select>
</template>
<script>
	import {i18nSetLang, i18n} from '../i18n';
	import {api} from "./../vendor/settings";
	import {storeDB} from "./../store/storeDB";
	import axios from 'axios';

	export default {
		data() {
			return {
				languages: Object.keys(i18n.messages),
			}
		},
		created() {
			storeDB.translations.keys().then(dbKeys => {
				this.languages = dbKeys;
				axios
					.get(`${api.lang}/`)
					.then(response => {
						storeDB.translations.keys().then(dbKeys => {
							Object.keys(response.data).forEach(key => {
								if (!dbKeys.includes(key)) {
									storeDB.translations.set(key, {});
									dbKeys.push(key);
								}
							});
							this.languages = dbKeys;
						});
					});
			});
		},
		methods: {
			setLanguage: function (event) {
				i18nSetLang(event.target.value);
			},
		}
	}

</script>