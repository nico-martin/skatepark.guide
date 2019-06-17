import {settings} from './settings';

export default {
	in: function (selector) {
		const $overlay = document.querySelector(selector);
		window.setTimeout(() => {
			$overlay.style.opacity = '1';
		}, 10);
		$overlay.style.display = 'block';
	},
	out: function (selector) {
		const $overlay = document.querySelector(selector);
		$overlay.style.opacity = '0';
		window.setTimeout(() => {
			$overlay.style.display = 'none';
		}, settings.easing_speed);
	}
};