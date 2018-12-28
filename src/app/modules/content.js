import fade from './fade';

export default {
	show: function () {
		fade.in('.app__overlay');
		document.getElementById('content').setAttribute('aria-hidden', 'false');
		document.getElementById('menu').setAttribute('data-state', 'back');
	},
	hide: function () {
		fade.out('.app__overlay');
		document.getElementById('content').setAttribute('aria-hidden', 'true');
		document.getElementById('menu').setAttribute('data-state', 'closed');
	}
}