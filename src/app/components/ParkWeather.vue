<template>
	<div class="park-weather">
		<h3 class="park-weather__heading">{{$t('weather')}}</h3>
		<div class="park-weather__loading" v-if="loading"></div>
		<ul class="park-weather__list" v-else-if="weather">
			<li
				class="park-weather__element weather"
				v-for="data in weather"
				:key="data.title"
			>
				<h4 class="weather__heading">{{data.title}}</h4>
				<hello-icon class="weather__icon" :icon="data.icon"></hello-icon>
				<span class="weather__description">{{data.description}}</span>
				<span class="weather__temp">{{data.temp}} °C</span>
			</li>
		</ul>
		<span class="park-weather__error" v-else>{{$t('weather_error')}}</span>
	</div>
</template>

<script>
	import {api} from '../vendor/settings';
	import axios from 'axios';
	import moment from 'moment';
	import 'moment/locale/de';

	export default {
		props: ['slug'],
		data() {
			return {
				loading: true,
				weather: false
			};
		},
		mounted() {
			if (this.slug) {
				moment.locale(this.$i18n.locale);
				const link = `${api.weather}/${this.slug}/?lang=${this.$i18n.locale}`;
				axios
					.get(link)
					.then(r => r.data)
					.then(resp => {
						if (!'cod' in resp || resp['cod'] !== '200') {
							return;
						}

						const weather = {};
						resp.list.forEach(data => {
							const date = moment(data.dt * 1000);
							const day = date.format('YYYY-MM-DD');
							const hour = date.format('HH');

							if (hour <= '14') {
								weather[day] = {
									title: date.format('ddd'),
									icon: `weather/${data.weather[0].icon}`,
									description: data.weather[0].description,
									temp: parseInt(data.main.temp)
								};
							}
						});

						this.loading = false;
						this.weather = Object.values(weather);
					})
					.catch(() => {
						this.loading = false;
					});
			}
		}
	};
</script>