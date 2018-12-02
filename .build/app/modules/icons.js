import account from '../../icons/mdi/account.svg';
import information from '../../icons/mdi/information.svg';
import markerplus from '../../icons/mdi/markerplus.svg';
import plus from '../../icons/mdi/plus.svg';
import settings from '../../icons/mdi/settings.svg';
import heart from '../../icons/mdi/heart.svg';
import heartEmpty from '../../icons/mdi/heart-empty.svg';

const icons = {account, information, markerplus, plus, settings, heart, heartEmpty};

export const icon = function (icon, elementClass = '') {
	return `<i class="hello-icon ${elementClass}">${icons[icon]}</i>`;
};
/*
export default {
	account,
	information,
	markerplus,
	plus,
	settings,
	heart,
	heartEmpty
};*/