import {settings} from './settings';

const show = function () {
	const $overlay = document.querySelector('.app__overlay');
	window.setTimeout(() => {
		$overlay.style.opacity = '1';
	}, 10);
	$overlay.style.display = 'block';
};

const hide = function () {
	const $overlay = document.querySelector('.app__overlay');
	$overlay.style.opacity = '0';
	window.setTimeout(() => {
		$overlay.style.display = 'none';
	}, settings.easing_speed);
};

export default {
	show,
	hide
};