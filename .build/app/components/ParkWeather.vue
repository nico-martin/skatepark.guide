<template>
	<div class="park-weather">
		<h3 class="park-weather__heading">Weather</h3>
		<div class="park-weather__loading" v-if="loading"></div>
		<ul class="park-weather__list" v-else-if="weather">
			<li class="park-weather__element weather" v-for="data in weather">
				<h4 class="weather__heading">{{data.title}}</h4>
				<Icon class="weather__icon" :icon="data.icon"></Icon>
				<span class="weather__description">{{data.description}}</span>
				<span class="weather__temp">{{data.temp}} °C</span>
			</li>
		</ul>
		<span class="park-weather__error" v-else>API Error</span>
	</div>
</template>

<script>
	import {api} from '../modules/settings';
	import axios from 'axios';
	import dateFormat from 'dateformat';
	import Icon from './globals/Icon.vue';
	import moment from 'moment';
	import 'moment/locale/de';

	moment.locale('en');

	export default {
		props: ['slug'],
		data() {
			return {
				loading: true,
				weather: false
			}
		},
		mounted() {
			if (this.slug) {
				const link = `${api.base}park-weather/${this.slug}/`;
				axios.get(link)
					.then(r => r.data)
					.then(resp => {
						if (!'cod' in resp || resp['cod'] !== '200') {
							return;
						}

						const weather = [];
						resp.list.forEach((data) => {

							const date = moment(data.dt * 1000);
							const day = date.format('YYYY-MM-DD');
							const hour = date.format('HH');

							let title = date.format('ddd D.M.');
							if (title === moment().format('ddd D.M.')) {
								title = 'Today';
							} else if (title === moment().add(1, 'day').format('ddd D.M.')) {
								title = 'Tomorrow';
							}

							if (hour <= '14') {
								weather[day] = {
									title,
									icon: `weather/${data.weather[0].icon}`,
									description: data.weather[0].description,
									temp: parseInt(data.main.temp)
								};
							}
						});

						// ToDo: component not updated :(
						this.loading = false;
						this.weather = Object.values(weather);
						this.$forceUpdate();
					});
			}
		},
		methods: {
			dateFormat
		},
		components: {
			Icon
		}
	};
</script>