<template>
	<div>
		<h2>{{$t('languages')}}</h2>
		<button v-on:click="setI18nLanguage('de')">Deutsch</button>
		<button v-on:click="setI18nLanguage('en')">English</button>
	</div>
</template>

<script>
	import {setI18nLanguage} from '../i18n';
	import {mapState} from 'vuex';

	export default {
		methods: {setI18nLanguage}
	}
</script>