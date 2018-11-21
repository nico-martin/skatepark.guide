import * as s from '../../settings.json';

export const color = (mycolor, tone = 'base') => {
	return s.theme_colors[mycolor][tone];
};

export const c = (mycolor, tone = 'base') => {
	return color(mycolor, tone);
};

export const settings = s;

/**
 * Maps
 */

export const maps = {
	key: 'AIzaSyCffN1AXfQ9O5QSA2cvl7vFklWsOomAQpU',
	styles: [
		{
			featureType: "administrative",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#444444"
				}
			]
		},
		{
			featureType: "landscape",
			elementType: "all",
			stylers: [
				{
					color: "#f2f2f2"
				}
			]
		},
		{
			featureType: "poi",
			elementType: "all",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "road",
			elementType: "all",
			stylers: [
				{
					saturation: -100
				},
				{
					lightness: 45
				}
			]
		},
		{
			featureType: "road.highway",
			elementType: "all",
			stylers: [
				{
					visibility: "simplified"
				}
			]
		},
		{
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "transit",
			elementType: "all",
			stylers: [
				{
					visibility: "off"
				}
			]
		},
		{
			featureType: "water",
			elementType: "all",
			stylers: [
				{
					color: "#96d4c8"
				},
				{
					visibility: "on"
				}
			]
		}
	],
	clusterSryles: [
		{
			textColor: 'white',
			url: '/assets/img/cluster_small.svg',
			height: 40,
			width: 40,
			textSize: 15
		}, {
			textColor: 'white',
			url: '/assets/img/cluster_medium.svg',
			height: 50,
			width: 50,
			textSize: 15
		}, {
			textColor: 'white',
			url: '/assets/img/cluster_big.svg',
			height: 80,
			width: 80,
			textSize: 15
		}
	],
	marker: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIyOCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDgwIDExNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7Ij48cGF0aCBkPSJNNzYuMzI0LDQwLjEwNmMwLDIwLjIzNyAtMzYuNjM4LDczLjI4IC0zNi42MzgsNzMuMjhjMCwwIC0zNi42NCwtNTMuMDQzIC0zNi42NCwtNzMuMjhjMCwtMjAuMjM2IDE2LjQwNSwtMzYuNjM4IDM2LjY0LC0zNi42MzhjMjAuMjM1LDAgMzYuNjM4LDE2LjQwMiAzNi42MzgsMzYuNjM4IiBzdHlsZT0iZmlsbDojZmY1NzIyO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0yOS45MDIsNTYuODI4bC05Ljc4MiwtMTYuOTQ0bDkuNzgyLC0xNi45NDNsMTkuNTY2LDBsOS43ODIsMTYuOTQzbC05Ljc4MiwxNi45NDRsLTE5LjU2NiwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48L3N2Zz4='
};

/**
 * Weather
 */

export const weather = {
	key: 'a985f71f62437705d3ec7de4f25182ca',
	baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily',
};