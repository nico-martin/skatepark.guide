import {settings} from './settings';

export const getColor = (mycolor, tone = 'base') => {
	console.log(settings.theme_colors);
	if (!mycolor in settings.theme_colors) {
		return false;
	}
	if (!tone in settings.theme_colors[mycolor]) {
		tone = 'base';
	}
	return settings.theme_colors[mycolor][tone];
};