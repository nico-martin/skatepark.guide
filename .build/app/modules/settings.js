import * as s from '../../settings.json';

export const color = (mycolor, tone = 'base') => {
	return s.theme_colors[mycolor][tone];
};

export const c = (mycolor, tone = 'base') => {
	return color(mycolor, tone);
};

export const settings = s;