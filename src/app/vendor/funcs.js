import {settings} from './settings.js';

export const getColor = function (mycolor, tone = 'base') {
	if (!mycolor in settings.theme_colors) {
		return false;
	}
	if (!tone in settings.theme_colors[mycolor]) {
		tone = 'base';
	}
	return settings.theme_colors[mycolor][tone];
};